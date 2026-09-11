# Recupere les sorts et cantrips depuis bg3.wiki.
# Meme principe que scrape.ps1 : telechargement poli + cache disque, aucune IA.
#
# Usage: pwsh -File scripts/scrape-spells.ps1 [-Limit 20] [-Refresh]
param(
    [int]$Limit = 0,
    [switch]$Refresh
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$cacheDir = Join-Path $root "cache\spells"
if (-not (Test-Path $cacheDir)) { New-Item -ItemType Directory -Path $cacheDir -Force | Out-Null }
$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

function Strip-Html([string]$s) {
    if (-not $s) { return "" }
    $s = [regex]::Replace($s, '(?s)<!--.*?-->', '')
    $s = [regex]::Replace($s, '(?s)<style.*?</style>', '')
    $s = [regex]::Replace($s, '(?s)<script.*?</script>', '')
    $s = [regex]::Replace($s, '<[^>]+>', ' ')
    $s = [System.Net.WebUtility]::HtmlDecode($s)
    $s = $s -replace ' ', ' ' -replace '[​⁠﻿]', ''
    $s = [regex]::Replace($s, '\[\s*See:[^\]]*\]', '')
    $s = [regex]::Replace($s, '\[\d+\]', '')
    $s = [regex]::Replace($s, '\s+', ' ')
    $s = $s -replace '\(\s+', '(' -replace '\s+\)', ')' -replace '\s+([,.;:])', '$1'
    return $s.Trim()
}

function Get-Section([string]$html, [string]$id) {
    $m = [regex]::Match($html, '(?s)id="' + [regex]::Escape($id) + '".*?</h[23]>(?<body>.*?)(?=<h2|<div class="printfooter")')
    if ($m.Success) { return $m.Groups['body'].Value }
    return ""
}

$CLASS_NAMES = @("Barbarian","Bard","Cleric","Druid","Fighter","Monk",
                 "Paladin","Ranger","Rogue","Sorcerer","Warlock","Wizard")

# noms de sous-classes et de races, tires des jeux de donnees deja scrapes
$SUBCLASS_NAMES = @()
$subPath = Join-Path $root "data\subclasses.json"
if (Test-Path $subPath) {
    $SUBCLASS_NAMES = (Get-Content $subPath -Raw -Encoding utf8 | ConvertFrom-Json) |
                      ForEach-Object { $_.name } | Sort-Object -Unique
}
$RACE_NAMES = @()
$racePath = Join-Path $root "data\races.json"
if (Test-Path $racePath) {
    $RACE_NAMES = (Get-Content $racePath -Raw -Encoding utf8 | ConvertFrom-Json) |
                  ForEach-Object { $_.name } | Sort-Object -Unique
}

$names = Get-Content (Join-Path $PSScriptRoot "spell-list.txt") | Where-Object { $_.Trim() }
if ($Limit -gt 0) { $names = $names[0..([Math]::Min($Limit, $names.Count) - 1)] }

Write-Host "Scraping $($names.Count) spell pages..."
$results = @()
$i = 0
$failed = 0

foreach ($name in $names) {
    $i++
    if ($i % 50 -eq 0) { Write-Host "  $i / $($names.Count)" }

    $slug = ($name -replace "'", "%27" -replace " ", "_")
    $key = ($name.ToLower() -replace "[^a-z0-9]+", "-").Trim("-")
    $file = Join-Path $cacheDir "$key.html"
    if ((-not $Refresh) -and (Test-Path $file)) {
        $html = Get-Content $file -Raw -Encoding utf8
    } else {
        try {
            $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/$slug" -UserAgent $UA -TimeoutSec 30).Content
            Set-Content $file -Value $html -Encoding utf8
            Start-Sleep -Milliseconds 250
        } catch { $failed++; continue }
    }

    $text = Strip-Html $html
    if ($text -match 'does not appear in normal gameplay') { continue }
    # pages de redirection / homonymie ("Firebolt?")
    if ($name -match '\?' -or $name -match '\(disambiguation\)') { continue }

    # le wiki embarque ses categories dans la page : bien plus fiable que la prose
    $categories = @()
    $cm = [regex]::Match($html, '"wgCategories"\s*:\s*\[(?<c>[^\]]*)\]')
    if ($cm.Success) {
        $categories = [regex]::Matches($cm.Groups['c'].Value, '"([^"]+)"') |
                      ForEach-Object { $_.Groups[1].Value }
    }

    $level = $null; $school = $null
    if ($categories -contains "Cantrips") { $level = 0 }
    foreach ($c in $categories) {
        if ($c -match '^Level (?<l>\d) Spells$') { $level = [int]$Matches['l'] }
        if ($c -match '^(?<s>Abjuration|Conjuration|Divination|Enchantment|Evocation|Illusion|Necromancy|Transmutation) spells$') {
            $school = $Matches['s']
        }
    }
    if ($null -eq $level) {
        $am = [regex]::Match($text, 'Level (?<l>\d) Spell Slot')
        if ($am.Success) { $level = [int]$am.Groups['l'].Value }
    }

    $damageTypes = @()
    foreach ($c in $categories) {
        if ($c -match '^Sources of (?<d>[A-Za-z]+) damage$') { $damageTypes += $Matches['d'] }
    }

    # description : bloc "Description"
    $desc = $null
    $dm = [regex]::Match($html, '(?s)id="Description".*?</h[23]>(?<b>.*?)(?=<h2|<div class="printfooter")')
    if ($dm.Success) { $desc = Strip-Html $dm.Groups['b'].Value }
    if (-not $desc) {
        $bodyStart = [regex]::Match($html, '(?s)<div class="mw-content-ltr mw-parser-output".*')
        if ($bodyStart.Success) {
            foreach ($p in [regex]::Matches($bodyStart.Value, '(?s)<p(?![^>]*mw-empty-elt)[^>]*>(?<t>.*?)</p>')) {
                $t = Strip-Html $p.Groups['t'].Value
                if ($t.Length -gt 40 -and $t -notmatch 'For the equivalent') { $desc = $t; break }
            }
        }
    }
    if ($desc -and $desc.Length -gt 300) { $desc = $desc.Substring(0, 297).TrimEnd() + "..." }

    $props = Strip-Html (Get-Section $html "Properties")

    # Les cantrips montent en des avec le niveau de PERSONNAGE (5 puis 10) :
    # "At character level 5, the damage increases to 2d10 Fire". Sans ca, un
    # magicien niveau 12 verrait le degat de niveau 1, trois fois trop bas.
    $scaling = @()
    $flat = Strip-Html $html
    foreach ($sm in [regex]::Matches($flat, 'At character level (?<lv>\d+), the damage[^.]{0,60}?increases to (?<n>\d+)d(?<s>\d+)')) {
        $scaling += [PSCustomObject]@{
            level = [int]$sm.Groups['lv'].Value
            count = [int]$sm.Groups['n'].Value
            size  = [int]$sm.Groups['s'].Value
        }
    }

    # Les sorts de niveau 1+ montent avec l'emplacement utilise. Le wiki formule ca
    # de plusieurs facons : "damage increases by 1d6 Fire for each spell slot level
    # above 3rd", "an additional 1d10 Necrotic damage per level", "an extra 1d8 ...".
    # Toutes reviennent a un de par niveau au-dessus du niveau de base : on le capte.
    # Magic Missile et Scorching Ray ajoutent un projectile plutot que des des sur le
    # meme jet : ce n'est pas la meme mecanique, on garde le texte sans le calculer.
    $upcastDice = $null
    $upcast = $null
    # Un cantrip a lui aussi une section "At higher levels", mais elle decrit la montee
    # par niveau de PERSONNAGE, deja captee dans $scaling. L'upcasting par emplacement
    # ne concerne que les sorts de niveau 1 et plus.
    $hi = if ($level -and $level -ge 1) { [regex]::Match($flat, 'At higher levels(?<b>.{0,300}?)(?:Technical details|How to learn|$)') } else { $null }
    if ($hi -and $hi.Success) {
        $body = $hi.Groups['b'].Value.Trim()
        $upcast = ($body -replace '^Upcasting\s*:\s*', '').Trim()
        $dm = [regex]::Match($body, '(?:increases by|additional|extra)\s+(?<n>\d+)d(?<s>\d+)[^.]{0,60}?(?:per level|for each spell slot level above)')
        if ($dm.Success) {
            $upcastDice = [PSCustomObject]@{ count = [int]$dm.Groups['n'].Value; size = [int]$dm.Groups['s'].Value }
        }
    }
    $damage = $null
    $dmgM = [regex]::Match($props, '(?<d>\d+d\d+(?:\s*\+\s*\d+)?)\s*(?<t>[A-Z][a-z]+)?')
    if ($dmgM.Success) {
        $damage = ($dmgM.Groups['d'].Value + " " + $dmgM.Groups['t'].Value).Trim()
    }

    # "Damage: 8~48" donne la fourchette, donc la moyenne, sans relire les des
    $damageMin = $null; $damageMax = $null
    $rangeM = [regex]::Match($props, 'Damage:\s*(?<lo>\d+)\s*~\s*(?<hi>\d+)')
    if ($rangeM.Success) {
        $damageMin = [int]$rangeM.Groups['lo'].Value
        $damageMax = [int]$rangeM.Groups['hi'].Value
    }

    # comment le sort se resout : jet d'attaque, jet de sauvegarde, ou touche auto
    # Le wiki ecrit la sauvegarde de deux facons : "DEX Save", et la forme longue
    # dans la parenthese de la ligne de degats — "2d10 Fire ( Dexterity Saving
    # Throw to halve)". Seule la premiere etait lue, et Hellish Rebuke comme
    # Cloudkill passaient pour des sorts qui touchent automatiquement.
    #
    # La forme longue n'est retenue que DANS cette parenthese. Ailleurs sur la page
    # elle appartient a autre chose : Ray of Frost et Chromatic Orb sont des jets
    # d'attaque dont la page cite une sauvegarde pour la surface qu'ils creent, et
    # les Spiritual Weapon pour l'action de leur arme.
    $save = $null
    $saveM = [regex]::Match($props, '(?<ab>STR|DEX|CON|INT|WIS|CHA) Save')
    if ($saveM.Success) { $save = $saveM.Groups['ab'].Value }
    if (-not $save) {
        $longM = [regex]::Match($props,
            'Damage:[^()]{0,120}\(\s*(?<ab>Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\s+Saving Throw')
        if ($longM.Success) {
            $save = @{ Strength = "STR"; Dexterity = "DEX"; Constitution = "CON"
                       Intelligence = "INT"; Wisdom = "WIS"; Charisma = "CHA" }[$longM.Groups['ab'].Value]
        }
    }
    $attackRoll = $props -match '\bAttack Roll\b'
    # "to halve" dans cette parenthese dit la meme chose que "On Save: half damage"
    $halfOnSave = ($props -match '(?i)On Save:.{0,60}half damage') -or
                  ($props -match '(?i)Saving Throw[^)]{0,40}to halve')
    # "Range: Self" et "Range: Touch" sont des portees a part entiere : ne capter que
    # les distances chiffrees laissait 224 sorts sans portee, ce qui se lisait comme
    # une donnee manquante alors que c'est une information.
    $rangeM = [regex]::Match($props, 'Range:\s*(?<r>Self|Touch|\d+\s*m(?:\s*\(\d+\s*ft\))?)')
    # L'AoE est juste a cote et n'etait jamais lue, alors que pour un sort de zone
    # c'est l'information centrale.
    $aoe = $null
    $aoeM = [regex]::Match($props, 'AoE:\s*(?<a>[^A-Z]{0,40}?(?:Radius|Cone|Cube|Line|Sphere))')
    if ($aoeM.Success) { $aoe = ($aoeM.Groups['a'].Value -replace '\s+', ' ').Trim() }
    if ($rangeM.Success) { $range = $rangeM.Groups['r'].Value.Trim() }
    $cost = $null
    $costM = [regex]::Match($props, 'Cost\s+(?<c>.{0,50}?)(?=\s*(?:Damage|Details|Range|AoE|$))')
    if ($costM.Success) { $cost = $costM.Groups['c'].Value.Trim() }

    $concentration = ($categories -contains "Concentration spells") -or ($props -match 'Concentration')
    $ritual = ($categories -contains "Ritual spells")

    # Qui peut l'apprendre, et A QUEL NIVEAU, et A QUELLE CONDITION.
    #
    # La section "How to learn" du wiki est structuree ainsi :
    #
    #   Classes:
    #     Class level 1: Cleric and Ranger (via Sanctified Stalker)
    #     Class level 6: College of Lore (via Magical Secrets)
    #     Class level 10: Bard (via Magical Secrets)
    #   Granted by features: Magic Initiate: Cleric
    #   Granted by items: Grymskull Helm (Recharge: Long rest)
    #   Used by creatures: Gandrel, Ellyka, ...
    #
    # L'ancienne version cherchait chaque nom de classe dans TOUTE la section. Elle
    # perdait le niveau et le "(via ...)", et surtout elle capturait les noms de
    # classes apparaissant dans "Granted by features", "Granted by items" et
    # "Used by creatures" : un sort devenait accessible a une classe parce qu'un
    # objet ou un PNJ la mentionnait. Sacred Flame se retrouvait ainsi sur la liste
    # de tout Ranger, alors que le wiki dit "Ranger (via Sanctified Stalker)".
    $learn = Strip-Html (Get-Section $html "How_to_learn")

    # Note de bas de page fixe du wiki, glissee entre parentheses juste apres les
    # spells raciaux. Sans ce retrait elle se fait capturer comme un qualificatif :
    # "Mephistopheles Tiefling (via Character level is the sum of all class...)".
    $learn = [regex]::Replace($learn, '\(\s*Character level is the sum of all class levels[^)]*\)', ' ')

    # On garde "Classes:" ET "Races:", coupes des le premier en-tete non pertinent.
    # "Granted by features / items" et "Used by creatures" sont exclus : c'est en les
    # balayant que l'ancienne version attribuait un sort a une classe parce qu'un
    # objet ou un PNJ la mentionnait.
    $classBlock = ""
    $cbM = [regex]::Match($learn, '(?:Classes:|Races:)(?<b>.*?)(?=Granted by|Used by|Other ways|Notes|$)')
    if ($cbM.Success) { $classBlock = $learn.Substring($cbM.Index, ($cbM.Index + $cbM.Length) - $cbM.Index) }

    # Le wiki ecrit "Class level N:" pour les classes et sous-classes, mais
    # "Character level N:" pour les races. Ne matcher que le premier faisait avaler
    # le bloc "Races:" par le dernier "Class level", donc une race heritait du niveau
    # de la classe precedente au lieu du sien.
    $availability = @()
    $seen = @{}
    $lvlMatches = [regex]::Matches($classBlock,
        '(?:Class|Character) level (?<lvl>\d+):(?<names>.*?)(?=(?:Class|Character) level \d+:|$)')
    foreach ($lm in $lvlMatches) {
        $lvl = [int]$lm.Groups['lvl'].Value
        $chunk = $lm.Groups['names'].Value

        # "(via X)" et "(Domain Spell)" qualifient ce qui les precede. On decoupe sur
        # ces parentheses pour rattacher chaque qualificatif a son propre segment.
        $segments = [regex]::Matches($chunk, '(?<names>[^()]+)(?:\((?<via>[^)]*)\))?')
        foreach ($seg in $segments) {
            $namePart = $seg.Groups['names'].Value
            if (-not $namePart.Trim()) { continue }
            $via = $null
            if ($seg.Groups['via'].Success) {
                $via = $seg.Groups['via'].Value.Trim()
                $via = [regex]::Replace($via, '^via\s+', '')
                if (-not $via) { $via = $null }
            }
            # noms les plus longs d'abord : "College of Lore" avant "Lore", et surtout
            # avant que "Bard" ne matche a l'interieur de "College of Bards"
            $candidates = @()
            foreach ($s in $SUBCLASS_NAMES) { $candidates += ,@($s, "subclass") }
            foreach ($r in $RACE_NAMES)     { $candidates += ,@($r, "race") }
            foreach ($c in $CLASS_NAMES)    { $candidates += ,@($c, "class") }
            $candidates = $candidates | Sort-Object { -($_[0].Length) }

            # On releve chaque nom present ET sa position, parce que le "(via ...)"
            # ne qualifie que le DERNIER nom qui le precede :
            #   "Wizard and Ranger (via Beast Tamer)"  -> seul Ranger est conditionne
            #   "Eldritch Knight, Arcane Trickster, and Warlock (via Pact of the Chain)"
            #                                          -> seul Warlock est conditionne
            # Attacher le qualificatif a tous les noms du segment rendrait Cleric
            # dependant de Sanctified Stalker sur Sacred Flame, ce qui est faux.
            $found = @()
            $remaining = $namePart
            foreach ($cand in $candidates) {
                $nm = $cand[0]; $kind = $cand[1]
                $hit = [regex]::Match($remaining, '\b' + [regex]::Escape($nm) + '\b')
                if ($hit.Success) {
                    # on blanchit le nom trouve pour qu'un nom plus court cache dedans
                    # ne soit pas capte a son tour ("Bard" dans "College of Bards")
                    $remaining = $remaining.Remove($hit.Index, $hit.Length).Insert($hit.Index, (" " * $hit.Length))
                    $found += [PSCustomObject]@{ name = $nm; kind = $kind; index = $hit.Index }
                }
            }
            $found = $found | Sort-Object index
            for ($fi = 0; $fi -lt $found.Count; $fi++) {
                $f = $found[$fi]
                # NB: surtout pas $key ici — c'est l'identifiant du sort, reutilise
                # plus bas pour `id`. L'ecraser corrompait 228 ids en "class|Paladin".
                $availKey = "$($f.kind)|$($f.name)"
                if ($seen.ContainsKey($availKey)) { continue }
                $seen[$availKey] = $true
                $isLast = ($fi -eq $found.Count - 1)
                $availability += [ordered]@{
                    name = $f.name; kind = $f.kind; level = $lvl
                    via = $(if ($isLast) { $via } else { $null })
                }
            }
        }
    }

    # Les listes plates restent, pour tout ce qui lit deja `classes`, mais elles
    # derivent maintenant du bloc structure et non d'un balayage de toute la section.
    $classes = @($availability | Where-Object { $_.kind -eq "class" } | ForEach-Object { $_.name })
    $spellSubclasses = @($availability | Where-Object { $_.kind -eq "subclass" } | ForEach-Object { $_.name })
    $spellRaces = @($availability | Where-Object { $_.kind -eq "race" } | ForEach-Object { $_.name })

    # --- icone du sort.
    # Trois pieges, tous vus en vrai. Prendre la premiere miniature de la page donne
    # le badge "Honour mode", qui apparait avant l'icone du sort : on s'ancre donc sur
    # l'image de l'infobox. Le segment de taille est obligatoire dans le motif, sinon
    # un match paresseux rend un chemin de repertoire. Et on ne reecrit pas la taille :
    # le wiki ne genere que celles qu'il sert, donc forcer /64px- rend 404.
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

    # De quel genre est ce sort ? Un sort qui porte des degats sans jet d'attaque
    # ni sauvegarde etait projete comme un coup qui touche a tous les coups, et
    # ils sont 43 dans ce cas : Cure Wounds affichait des "degats", Hex une frappe
    # autonome alors qu'il s'ajoute aux tiennes, Spiritual Weapon un sort alors
    # que c'est une arme qui attaque ensuite.
    #
    # Le wiki le dit dans sa propre description, et c'est elle qu'on lit :
    #   soin    "Heal a creature you can touch", et aucun type de degat
    #   rider   "Make your attacks deal an additional 1d6 Necrotic damage"
    #   arme    "Summon a floating, spectral weapon", "Weave a shadowy shortsword"
    $kind = $null
    $descFlat = ($desc -replace '\s+', ' ')
    if ($damage -and -not $attackRoll -and -not $save) {
        if ((-not $damageTypes -or $damageTypes.Count -eq 0) -and $descFlat -match '(?i)\bheals?\b') {
            $kind = "heal"
        } elseif ($descFlat -match '(?i)(additional .{0,40}damage (when|whenever) you (attack|hit)|Make your attacks deal|weapon attacks deal|attacks deal an additional|Shift your Hunter)') {
            $kind = "rider"
        } elseif ($descFlat -match '(?i)(floating, spectral|spectral (greataxe|greatsword|halberd|maul|spear|trident)|spiritual twin|(Weave|Conjure|Summon|Create) an? .{0,30}(sword|scimitar|axe|spear|trident|maul|halberd|weapon))') {
            $kind = "weapon"
        } elseif ($descFlat -match '(?i)(anyone inside|anyone who hits you|creature walking on|hangs in the air|anyone under it|that attack anyone|for every 1\.5 m)') {
            # Une zone ou une riposte : les degats se produisent quand quelqu'un
            # entre, passe ou te frappe, pas quand tu lances le sort.
            $kind = "zone"
        }
    }

    $results += [PSCustomObject]@{
        id = $key; name = $name; level = $level; school = $school; kind = $kind
        desc = $desc; cost = $cost; damage = $damage; save = $save; range = $range; aoe = $aoe
        damageMin = $damageMin; damageMax = $damageMax
        attackRoll = [bool]$attackRoll; halfOnSave = [bool]$halfOnSave
        damageTypes = $damageTypes
        concentration = [bool]$concentration; ritual = [bool]$ritual
        scaling = $scaling; upcast = $upcast; upcastDice = $upcastDice
        classes = $classes; subclasses = $spellSubclasses; races = $spellRaces
        availability = $availability; icon = $icon
        wiki = "https://bg3.wiki/wiki/$slug"
    }
}

# Depth 8 : `availability` est un tableau d'objets imbriques. A Depth 4 PowerShell
# serialise ce genre de structure en "System.Collections.Specialized.OrderedDictionary".
$results | ConvertTo-Json -Depth 8 | Set-Content (Join-Path $root "data\spells.json") -Encoding utf8
$withLevel = ($results | Where-Object { $null -ne $_.level }).Count
$withClasses = ($results | Where-Object { $_.classes.Count -gt 0 }).Count
$withDesc = ($results | Where-Object { $_.desc }).Count
$withAvail = ($results | Where-Object { $_.availability.Count -gt 0 }).Count
$withVia = ($results | Where-Object { ($_.availability | Where-Object { $_.via }).Count -gt 0 }).Count
Write-Host ""
Write-Host "Done. $($results.Count) spells -> data\spells.json"
Write-Host "  level: $withLevel   classes: $withClasses   desc: $withDesc   failed: $failed"
Write-Host "  availability: $withAvail   with a 'via' qualifier: $withVia"
