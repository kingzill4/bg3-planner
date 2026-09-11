# Recupere les compagnons recrutables : caracteristiques de depart, classe, race, portrait.
# Sert de preset "tel que le jeu les livre" avant respec.
#
# Usage: pwsh -File scripts/scrape-companions.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$cacheDir = Join-Path $root "cache"
$portraitDir = Join-Path $root "assets\portraits"
if (-not (Test-Path $portraitDir)) { New-Item -ItemType Directory -Path $portraitDir -Force | Out-Null }

$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

$companions = @(
    @{ id = "astarion";   page = "Astarion" }
    @{ id = "shadowheart"; page = "Shadowheart" }
    @{ id = "gale";       page = "Gale" }
    @{ id = "laezel";     page = "Lae%27zel" }
    @{ id = "wyll";       page = "Wyll" }
    @{ id = "karlach";    page = "Karlach" }
    @{ id = "halsin";     page = "Halsin" }
    @{ id = "minthara";   page = "Minthara" }
    @{ id = "jaheira";    page = "Jaheira" }
    @{ id = "minsc";      page = "Minsc" }
)

# L'infobox d'un compagnon ecrit "High elf", la page de la race ecrit "High Elf" —
# meme wiki, deux casses. On garde celle de la page de la race : c'est elle qui
# nomme les races partout ailleurs dans l'outil, et c'est sur ce nom que le preset
# d'origine retrouve la race a appliquer.
$racesFile = Join-Path $root "data\races.json"
$RACE_NAMES = @()
if (Test-Path $racesFile) {
    $RACE_NAMES = @((Get-Content $racesFile -Raw -Encoding utf8 | ConvertFrom-Json).name)
}

function Strip-Html([string]$s) {
    if (-not $s) { return "" }
    $s = [regex]::Replace($s, '(?s)<!--.*?-->', '')
    $s = [regex]::Replace($s, '<[^>]+>', ' ')
    $s = [System.Net.WebUtility]::HtmlDecode($s)
    $s = $s -replace ' ', ' '
    return ([regex]::Replace($s, '\s+', ' ')).Trim()
}

$results = @()
foreach ($c in $companions) {
    $file = Join-Path $cacheDir "companion-$($c.id).html"
    if (Test-Path $file) {
        $html = Get-Content $file -Raw -Encoding utf8
    } else {
        $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/$($c.page)" -UserAgent $UA -TimeoutSec 30).Content
        Set-Content $file -Value $html -Encoding utf8
        Start-Sleep -Milliseconds 300
    }

    # l'infobox marque chaque valeur : <td ... data-source="str">17<br>(+3)</td>
    $scores = [ordered]@{}
    foreach ($ab in @("str", "dex", "con", "int", "wis", "cha")) {
        $m = [regex]::Match($html, 'data-source="' + $ab + '"[^>]*>\s*(?<v>\d{1,2})\s*<')
        if ($m.Success) { $scores[$ab] = [int]$m.Groups['v'].Value }
    }
    if ($scores.Count -lt 6) { $scores = $null }

    $text = Strip-Html $html
    $race = $null
    $rm = [regex]::Match($text, 'Race\s+([A-Z][A-Za-z\- ]{2,28}?)\s+(?:Class|Subrace|Gender|Level)')
    if ($rm.Success) { $race = $rm.Groups[1].Value.Trim() }
    $class = $null
    $cm = [regex]::Match($text, 'Class\s+([A-Z][A-Za-z ]{2,24}?)\s+(?:Subclass|Level|Race|Background)')
    if ($cm.Success) { $class = $cm.Groups[1].Value.Trim() }

    # Le subrace est ce qui compte pour les traits raciaux : "Elf" seul ne dit ni
    # la vision dans le noir ni les cantrips. L'infobox le donne, la prose non.
    $subrace = $null
    $sm = [regex]::Match($text, 'Subrace\s+([A-Z][A-Za-z\- ]{2,28}?)\s+(?:Class|Gender|Level|Background)')
    if ($sm.Success) { $subrace = $sm.Groups[1].Value.Trim() }

    # La sous-classe de depart fait partie du preset : Astarion commence Arcane
    # Trickster, pas Rogue generique. L'infobox suffixe parfois "(default)" ou le
    # patron entre parentheses ("The Fiend ( Mizora )") : on s'arrete avant.
    $subclass = $null
    $sc = [regex]::Match($text, "Subclass\s+([A-Z][A-Za-z' \-]{2,30}?)\s*(?:\(|Deity|Background|Level|Alignment)")
    if ($sc.Success) { $subclass = $sc.Groups[1].Value.Trim() }

    # Le background d'un personnage origine est fixe et ne peut pas etre change
    # en jeu : il appartient donc au preset, pas au choix du joueur.
    $background = $null
    $bm = [regex]::Match($text, "Background\s+([A-Z][A-Za-z ]{2,20}?)\s*(?:\[|Balanced|Difficulty|Stats|Level|Deity)")
    if ($bm.Success) { $background = $bm.Groups[1].Value.Trim() }

    # portrait : le premier de la page n'est pas forcement le bon (celle de Wyll
    # montre d'abord Mizora), donc on exige que le fichier porte son nom
    $portrait = $null
    $bare = ($c.page -replace '%27', '') -replace '[^A-Za-z]', ''
    $pm = [regex]::Match($html, 'srcset="(?<u>/w/images/thumb/[^",\s]*Portrait[^",\s]*?\.webp)')
    foreach ($cand in [regex]::Matches($html, 'srcset="(?<u>/w/images/thumb/[^",\s]*Portrait[^",\s]*?\.webp)')) {
        $fileName = ($cand.Groups['u'].Value -replace '%27', '') -replace '[^A-Za-z]', ''
        if ($fileName -match $bare) { $pm = $cand; break }
    }
    if ($pm.Success) {
        $url = "https://bg3.wiki" + ([regex]::Replace($pm.Groups['u'].Value, '/\d+px-', '/128px-'))
        $dest = Join-Path $portraitDir "$($c.id).webp"
        if (-not (Test-Path $dest)) {
            try { Invoke-WebRequest -Uri $url -UserAgent $UA -OutFile $dest -TimeoutSec 30; Start-Sleep -Milliseconds 200 } catch {}
        }
        if (Test-Path $dest) { $portrait = "assets/portraits/$($c.id).webp" }
    }

    if ($subrace -and $RACE_NAMES.Count) {
        $canon = $RACE_NAMES | Where-Object { $_ -ieq $subrace } | Select-Object -First 1
        if ($canon) { $subrace = $canon }
    }

    $results += [PSCustomObject]@{
        id = $c.id
        name = ($c.page -replace '%27', "'")
        race = $race
        subrace = $subrace
        subclass = $subclass
        background = $background
        class = $class
        scores = $scores
        portrait = $portrait
        wiki = "https://bg3.wiki/wiki/$($c.page)"
    }
    $ok = if ($scores) { ($scores.Values -join "/") } else { "NO SCORES" }
    Write-Host ("  {0,-12} {1,-16} {2,-22} {3}" -f $c.id, $class, ($subrace ?? $race), $ok)
}

$results | ConvertTo-Json -Depth 5 | Set-Content (Join-Path $root "data\companions.json") -Encoding utf8
Write-Host "`n$($results.Count) compagnons -> data\companions.json"
