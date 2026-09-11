# Scraper bg3.wiki -> data/items.js
# Aucune IA requise : telecharge chaque page d'objet et extrait les donnees structurees.
# Les pages sont mises en cache sur disque (cache/), donc une 2e execution est instantanee.
#
# Usage:  pwsh -File scripts/scrape.ps1
#         pwsh -File scripts/scrape.ps1 -Limit 20        (test sur 20 objets)
#         pwsh -File scripts/scrape.ps1 -Refresh         (ignore le cache)
param(
    [int]$Limit = 0,
    [switch]$Refresh
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$cacheDir = Join-Path $root "cache"
$indexPath = Join-Path $root "data\item-index.json"
if (-not (Test-Path $cacheDir)) { New-Item -ItemType Directory -Path $cacheDir | Out-Null }

$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

# ---------------------------------------------------------------- helpers

function Get-Page([string]$url, [string]$cacheKey) {
    $file = Join-Path $cacheDir "$cacheKey.html"
    if ((-not $Refresh) -and (Test-Path $file)) {
        return Get-Content $file -Raw -Encoding utf8
    }
    try {
        $html = Invoke-WebRequest -Uri $url -UserAgent $UA -MaximumRedirection 5 -TimeoutSec 30
        $content = $html.Content
        Set-Content -Path $file -Value $content -Encoding utf8
        Start-Sleep -Milliseconds 250
        return $content
    } catch {
        return $null
    }
}

function Strip-Html([string]$s) {
    if (-not $s) { return "" }
    $s = [regex]::Replace($s, '(?s)<!--.*?-->', '')
    $s = [regex]::Replace($s, '(?s)<style.*?</style>', '')
    $s = [regex]::Replace($s, '(?s)<script.*?</script>', '')
    $s = [regex]::Replace($s, '(?s)<sup[^>]*class="reference".*?</sup>', '')
    $s = [regex]::Replace($s, '<[^>]+>', '')
    $s = [System.Net.WebUtility]::HtmlDecode($s)
    $s = $s -replace '\u00a0', ' '          # espace insecable
    $s = $s -replace '[\u200b\u2060\ufeff]', ''  # jointeurs invisibles du wiki
    $s = [regex]::Replace($s, '\[\s*See:[^\]]*\]', '')
    $s = [regex]::Replace($s, '\[\d+\]', '')
    $s = [regex]::Replace($s, '\s+', ' ')
    # les icones retirees laissent des espaces parasites autour de la ponctuation
    $s = $s -replace '\(\s+', '(' -replace '\s+\)', ')' -replace '\s+([,.;:])', '$1'
    return $s.Trim()
}

# <dl><dt>Label</dt><dd>valeur</dd><dd>valeur</dd>...  ->  liste de groupes {Label, Values}
function Parse-DefinitionList([string]$section) {
    $groups = @()
    if (-not $section) { return $groups }
    $dl = [regex]::Match($section, '(?s)<dl>(?<body>.*?)</dl>')
    if (-not $dl.Success) { return $groups }
    $current = $null
    foreach ($m in [regex]::Matches($dl.Groups['body'].Value, '(?s)<(?<tag>dt|dd)>(?<t>.*?)</\k<tag>>')) {
        $txt = Strip-Html $m.Groups['t'].Value
        if ($m.Groups['tag'].Value -eq 'dt') {
            if ($current) { $groups += $current }
            $current = [PSCustomObject]@{ Label = $txt; Values = @() }
        } elseif ($current) {
            if ($txt) { $current.Values += $txt }
        }
    }
    if ($current) { $groups += $current }
    return $groups
}

function Get-Section([string]$html, [string]$id) {
    $m = [regex]::Match($html, '(?s)id="' + [regex]::Escape($id) + '".*?</h[23]>(?<body>.*?)(?=<h2|<div class="printfooter")')
    if ($m.Success) { return $m.Groups['body'].Value }
    return ""
}

# Carte lieu -> acte (couverture partielle, le reste reste null)
$actMap = @{
    1 = @("Nautiloid","Ravaged Beach","Emerald Grove","Druid Grove","The Hollow","Blighted Village","Goblin Camp",
          "Shattered Sanctum","Worg Pens","Risen Road","Waukeen's Rest","Underdark","Ebonlake","Grymforge",
          "Adamantine Forge","Whispering Depths","Sunlit Wetlands","Putrid Bog","Dank Crypt",
          "Riverside Teahouse","Selunite Outpost","Arcane Tower","Festering Cove","Defiled Temple","Rosymorn",
          "Githyanki Creche","Creche Y","Mountain Pass","Overgrown Tunnel","Astral Plane",
          "Astral Prism","Grymforge")
    2 = @("Shadow-Cursed","Last Light Inn","Moonrise","Gauntlet of Shar","Grand Mausoleum","House of Healing","Reithwin",
          "Mason's Guild","Shadowfell","Ruined Battlefield","Tollhouse","Oubliette",
          "Cloister of Sombre Embrace","Shadowlands","Toll House","Waning Moon")
    3 = @("Rivington","Lower City","Wyrm's Crossing","Wyrm's Rock","House of Hope","Sorcerous Sundries","Steel Watch",
          "Iron Throne","Baldur's Gate","Szarr Palace","Elfsong","Danthelon","Circus of the Last Days",
          "Sewers","Undercity","Temple of Bhaal","Ramazith","Counting House","Forge of the Nine","Devil's Fee",
          "Facemaker","Stormshore","Water Queen","Dragon's Sanctum","Murder Tribunal","Philgrave","Mind Flayer Colony",
          "Chromatic Scale","Knights of the Shield","Sorcerous Vault",
          "Felogyr","Open Hand Temple","Angleiron","Lady Jannath","Lora's House","Jungle",
          "Rosymorn Monastery Trail","Upper City")
}

# "Crèche Y'llek" -> "Creche Y'llek" : compare sans accents pour eviter les faux negatifs
function Remove-Diacritics([string]$s) {
    if (-not $s) { return "" }
    $norm = $s.Normalize([Text.NormalizationForm]::FormD)
    $sb = New-Object System.Text.StringBuilder
    foreach ($c in $norm.ToCharArray()) {
        if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($c) -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
            [void]$sb.Append($c)
        }
    }
    return $sb.ToString()
}

# Le wiki d'abord : il classe chaque lieu lui-meme, par Category:Act One/Two/Three
# Locations (scripts/scrape-locations.ps1). La liste ecrite a la main ci-dessus ne
# vient qu'apres, pour ce que le wiki ne classe pas — une formulation qui nomme un
# personnage plutot qu'un lieu, par exemple.
#
# Cet ordre compte : la liste a la main se trompe. Elle rangeait "Rosymorn
# Monastery Trail" en acte 3, ou le wiki le classe acte 1 — et c'est le wiki qui a
# raison, Lady Esther y vend des sa premiere visite.
$actMapFlat = @{}
$locFile = Join-Path $root "data\locations.json"
if (Test-Path $locFile) {
    $locs = Get-Content $locFile -Raw -Encoding utf8 | ConvertFrom-Json
    foreach ($prop in $locs.PSObject.Properties) {
        $k = (Remove-Diacritics $prop.Name).ToLower()
        if (-not $actMapFlat.ContainsKey($k)) { $actMapFlat[$k] = [int]$prop.Value }
    }
}
foreach ($act in 1..3) {
    foreach ($kw in $actMap[$act]) {
        $k = (Remove-Diacritics $kw).ToLower()
        if (-not $actMapFlat.ContainsKey($k)) { $actMapFlat[$k] = $act }
    }
}

# Le plus petit acte cite gagne. La question qu'on pose a cette donnee est "a
# partir de quand puis-je l'avoir", et la reponse est le premier acte ou l'objet
# existe, pas le premier lieu nomme sur la page. Le Shield +1 est vendu a Moonrise
# Towers (acte 2) et se trouve aussi dans trois endroits de l'acte 3 : le wiki
# ouvre par l'acte 3, et prendre le premier nomme le classait acte 3 alors qu'on
# peut l'avoir un acte plus tot.
# Sur les limites de mots. "Hag" se trouvait dans "sarcop-hag-us", ce qui envoyait
# le Shield +1 a l'acte 1 pour un sarcophage de l'acte 3. Un lieu est un mot, pas
# une suite de lettres.
$actMapRx = @{}
foreach ($kw in $actMapFlat.Keys) {
    $actMapRx[$kw] = [regex]::new('\b' + [regex]::Escape($kw) + '\b',
        [Text.RegularExpressions.RegexOptions]::Compiled)
}

function Guess-Act([string]$text) {
    if (-not $text) { return $null }
    $t = (Remove-Diacritics $text).ToLower()
    $best = $null
    foreach ($kw in $actMapFlat.Keys) {
        if (-not $actMapRx[$kw].IsMatch($t)) { continue }
        $act = $actMapFlat[$kw]
        if ($null -eq $best -or $act -lt $best) { $best = $act }
    }
    return $best
}

$rarityMap = @{
    "Common" = "common"; "Uncommon" = "uncommon"; "Rare" = "rare";
    "Very Rare" = "veryrare"; "Legendary" = "legendary"; "Story Item" = "artifact"; "Artifact" = "artifact"
}

# ---------------------------------------------------------------- main

$index = Get-Content $indexPath -Raw -Encoding utf8 | ConvertFrom-Json
if ($Limit -gt 0) { $index = $index[0..([Math]::Min($Limit, $index.Count) - 1)] }

Write-Host "Scraping $($index.Count) item pages..."
$results = New-Object System.Collections.Generic.List[object]
$i = 0
$failed = 0

foreach ($item in $index) {
    $i++
    if ($i % 25 -eq 0) { Write-Host "  $i / $($index.Count)" }

    $html = Get-Page $item.wiki $item.id
    if (-not $html) {
        $failed++
        $results.Add([PSCustomObject]@{
            id = $item.id; name = $item.name; type = $item.type; subtype = ""; rarity = "unknown"
            act = $null; attunement = $false; summary = $null; location = $null; wiki = $item.wiki
        })
        continue
    }

    # --- rarity
    $rarity = "unknown"
    $m = [regex]::Match($html, 'alt="Rarity:\s*([^"]+)"')
    if ($m.Success) {
        $raw = $m.Groups[1].Value.Trim()
        if ($rarityMap.ContainsKey($raw)) { $rarity = $rarityMap[$raw] }
    }

    # --- summary : premier <p> non vide, en ignorant les bandeaux/hatnotes
    $summary = $null
    $cut = $false
    $noise = @("This article is about", "third party tools", "For other uses", "disambiguation",
               "may refer to", "This page is a", "does not appear in normal gameplay", "Spoiler warning")
    $bodyStart = [regex]::Match($html, '(?s)<div class="mw-content-ltr mw-parser-output".*')
    if ($bodyStart.Success) {
        $pm = [regex]::Matches($bodyStart.Value, '(?s)<p(?![^>]*mw-empty-elt)[^>]*>(?<t>.*?)</p>')
        foreach ($p in $pm) {
            $txt = Strip-Html $p.Groups['t'].Value
            $isNoise = $false
            foreach ($n in $noise) { if ($txt -like "*$n*") { $isNoise = $true; break } }
            if ($isNoise) {
                if ($txt -like "*does not appear in normal gameplay*" -or $txt -like "*third party tools*") { $cut = $true }
                continue
            }
            if ($txt.Length -gt 40) { $summary = $txt; break }
        }
    }
    if ($summary) {
        $summary = [regex]::Replace($summary, '\[\s*See:[^\]]*\]', '')
        $summary = [regex]::Replace($summary, '\[\d+\]', '')
        $summary = [regex]::Replace($summary, '\s+', ' ').Trim()
        if ($summary.Length -gt 320) { $summary = $summary.Substring(0, 317).TrimEnd() + "..." }
    }

    # --- bloc de stats : degats / CA / details / capacites speciales
    $propsSection = Get-Section $html "Properties"
    $damage = $null
    $acValue = $null
    $details = @()
    if ($propsSection) {
        # armes : <dl><dt>Damage</dt><dd>..</dd><dt>Details</dt><dd>..</dd>...
        # les armes polyvalentes ont "One-handed damage" / "Two-handed damage"
        $ddDetails = @()
        $damageParts = @()
        foreach ($g in (Parse-DefinitionList $propsSection)) {
            if ($g.Label -match 'damage' -and $g.Values.Count -gt 0) {
                if ($g.Label -match '^Damage$') {
                    $damageParts += $g.Values[0]
                } else {
                    $short = $g.Label -replace '(?i)\s*damage\s*$', '' -replace '(?i)^one-handed$', '1H' -replace '(?i)^two-handed$', '2H'
                    $damageParts += "$short $($g.Values[0])"
                }
            }
            elseif ($g.Label -match '^Details') { $ddDetails += $g.Values }
        }
        if ($damageParts.Count -gt 0) { $damage = $damageParts -join "  ·  " }
        # armures et accessoires : proprietes dans une <ul><li>
        $liDetails = @()
        foreach ($li in [regex]::Matches($propsSection, '(?s)<li>(?<t>.*?)</li>')) {
            $liDetails += (Strip-Html $li.Groups['t'].Value)
        }
        foreach ($v in ($ddDetails + $liDetails)) {
            if (-not $v) { continue }
            # champs internes du wiki, sans interet pour le joueur
            if ($v -match '^(UID|UUID|Stats)$' -or $v -match '\bUUID\b' -or $v -match '^UID\b') { continue }
            if ($v -match '^(UNI_|MAG_|WPN_|ARM_|PLA_|OBJ_)' -or $v -match '^[0-9a-f]{8}-[0-9a-f]{4}-') { continue }
            # references d'images cassees du wiki ("File ARM_Monk_A_Pants")
            if ($v -match '^File[: ]' -or $v -match '\.(png|jpg|webp)$') { continue }
            if ($v.Length -gt 120) { continue }
            if ($details -notcontains $v) { $details += $v }
        }
        $acm = [regex]::Match((Strip-Html $propsSection), '(\d+)\s*Armou?r Class')
        if ($acm.Success) { $acValue = [int]$acm.Groups[1].Value }
    }

    # --- subtype : premiere ligne de details (= le type d'objet), singularisee
    $subtype = ""
    if ($details.Count -gt 0) {
        $subtype = $details[0]
        # "Rings" -> "Ring", "Greatswords" -> "Greatsword" ; garde "Heavy Armour", "Medium Armour"
        $irregular = @{ "Quarterstaves" = "Quarterstaff"; "Staves" = "Staff" }
        if ($irregular.ContainsKey($subtype)) {
            $subtype = $irregular[$subtype]
        } elseif ($subtype -notmatch 'Armour|Clothing|Miscellaneous' -and $subtype.EndsWith("s")) {
            $subtype = $subtype.Substring(0, $subtype.Length - 1)
        }
        if ($subtype.Length -gt 40) { $subtype = "" }
    }

    $special = @()
    $specialSection = Get-Section $html "Special"
    foreach ($g in (Parse-DefinitionList $specialSection)) {
        $nm = ($g.Label -replace '\(\s*\)', '').Trim()
        if (-not $nm) { continue }
        $special += [PSCustomObject]@{ n = $nm; d = ($g.Values -join " ") }
    }
    # --- icone : la plus grande miniature que le wiki propose vraiment.
    # Deux pieges ici. Le segment de taille (/40px-) est obligatoire dans le motif :
    # sans lui, un match paresseux jusqu'au premier ".webp" s'arrete sur le nom du
    # fichier source et rend un chemin de repertoire, refuse en 400. Et on ne peut pas
    # reecrire la taille en dur : le wiki ne genere que les tailles demandees, donc
    # forcer /96px- rend 404. Et la miniature d'un .png est servie en ".png.webp" :
    # il faut donc capturer le nom de fichier jusqu'au bout du jeton, pas jusqu'a la
    # premiere extension reconnue. On prend la taille offerte par le srcset.
    $icon = $null
    $pm = [regex]::Match($html, 'class="mw-file-description"><picture><source srcset="(?<s>[^"]+)"')
    if ($pm.Success) {
        $best = $null; $bestPx = 0
        foreach ($c in [regex]::Matches($pm.Groups['s'].Value, '(?<u>/w/images/thumb/[^",\s]+?/(?<px>\d+)px-[^",\s]+)')) {
            $px = [int]$c.Groups['px'].Value
            if ($px -gt $bestPx) { $bestPx = $px; $best = $c.Groups['u'].Value }
        }
        if ($best) { $icon = "https://bg3.wiki" + $best }
    }
    if (-not $icon) {
        $om = [regex]::Match($html, '<meta property="og:image" content="(?<u>[^"]+)"')
        if ($om.Success) { $icon = $om.Groups['u'].Value }
    }

    # --- attunement
    $attunement = $html -match 'Requires\s*Attunement'

    # --- where to find
    $location = $null
    $sec = Get-Section $html "Where_to_find"
    if (-not $sec) { $sec = Get-Section $html "Where_to_Find" }
    if ($sec) {
        $items = [regex]::Matches($sec, '(?s)<li>(?<t>.*?)</li>')
        $parts = @()
        foreach ($li in $items) {
            $txt = Strip-Html $li.Groups['t'].Value
            $txt = [regex]::Replace($txt, '\s*X:\s*-?\d+\s*Y:\s*-?\d+\s*', ' ')
            if ($txt) { $parts += $txt }
            if ($parts.Count -ge 3) { break }
        }
        if ($parts.Count -gt 0) {
            $location = ($parts -join " • ")
            if ($location.Length -gt 260) { $location = $location.Substring(0, 257) + "..." }
        }
    }

    $act = Guess-Act ("$location $summary")

    # Certains objets n'appartiennent a AUCUN acte, et le wiki le dit lui-meme :
    # "In chests and carried by characters throughout the game", "Sold by any
    # trader using the magic melee table", "Random loot". Les laisser vides les
    # faisait lire "Act ?" — un aveu d'ignorance la ou le wiki donne une reponse.
    $anyAct = $false
    if (-not $act -and $location -match '(?i)(throughout the game|random loot|any trader|levelled magic|magic (melee|armour|ranged) table|traders? using|in chests and carried)') {
        $anyAct = $true
    }

    # Le nom interne de l'objet, celui que le jeu porte dans ses fichiers et dans
    # une sauvegarde : "MAG_ElementalGish_ArcaneAcuity_Helmet" pour le Helmet of
    # Arcane Acuity. Une sauvegarde .lsv ne contient QUE ce nom-la, jamais le nom
    # affiche, donc sans lui aucun objet d'une partie ne peut etre relie a sa fiche.
    #
    # L'UUID est garde a cote mais ne sert pas au meme usage : celui que porte une
    # sauvegarde est local a la partie et ne correspond pas au modele statique.
    $flat = Strip-Html $html
    $stats = $null
    $sm = [regex]::Match($flat, '\bStats\s+([A-Za-z0-9_]{4,})')
    if ($sm.Success) { $stats = $sm.Groups[1].Value }
    $uuid = $null
    $um = [regex]::Match($flat, '\bUUID\s+([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})')
    if ($um.Success) { $uuid = $um.Groups[1].Value }

    $results.Add([PSCustomObject]@{
        id = $item.id; name = $item.name; type = $item.type; subtype = $subtype; rarity = $rarity
        act = $act; attunement = [bool]$attunement; summary = $summary; location = $location
        damage = $damage; ac = $acValue; details = $details; special = $special
        cut = $cut; icon = $icon; wiki = $item.wiki; stats = $stats; uuid = $uuid; anyAct = $anyAct
    })
}

$outPath = Join-Path $root "data\scraped.json"
$results | ConvertTo-Json -Depth 4 | Set-Content $outPath -Encoding utf8

$withSummary = ($results | Where-Object { $_.summary }).Count
$withRarity  = ($results | Where-Object { $_.rarity -ne "unknown" }).Count
$withLoc     = ($results | Where-Object { $_.location }).Count
$withAct     = ($results | Where-Object { $_.act }).Count
$withIcon    = ($results | Where-Object { $_.icon }).Count
$withStats   = ($results | Where-Object { $_.damage -or $_.ac -or $_.details.Count -gt 0 }).Count
$withSpecial = ($results | Where-Object { $_.special.Count -gt 0 }).Count
Write-Host ""
Write-Host "Done. $($results.Count) items -> $outPath"
Write-Host "  summary: $withSummary   rarity: $withRarity   location: $withLoc   act: $withAct   icon: $withIcon   fetch-failed: $failed"
Write-Host "  statblock: $withStats   special abilities: $withSpecial"
