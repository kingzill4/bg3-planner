# Recupere les races jouables et leurs traits mecaniques depuis bg3.wiki.
# La categorie "Races" du wiki melange les creatures du jeu, d'ou la liste explicite.
#
# Une page d'espece decrit TOUTES ses sous-races. Decouper naivement de "Racial
# features" a "Equipment" donnait donc la vision dans le noir et la resistance au
# poison des Strongheart aux Lightfoot. On lit desormais la section commune, puis
# uniquement la section de la sous-race demandee.
#
# Usage: pwsh -File scripts/scrape-races.ps1 [-Refresh]
param([switch]$Refresh)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$cacheDir = Join-Path $root "cache"
$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

# races et sous-races jouables (les sous-races ont leurs propres traits)
$races = @(
    "Human", "Githyanki", "Half-Orc", "Dragonborn",
    "High Elf", "Wood Elf", "Half-Elf", "High Half-Elf", "Wood Half-Elf", "Drow Half-Elf",
    "Lolth-Sworn Drow", "Seldarine Drow",
    "Lightfoot Halfling", "Strongheart Halfling",
    "Gold Dwarf", "Shield Dwarf", "Duergar",
    "Forest Gnome", "Rock Gnome", "Deep Gnome",
    "Asmodeus Tiefling", "Mephistopheles Tiefling", "Zariel Tiefling"
)

function Strip-Html([string]$s) {
    if (-not $s) { return "" }
    $s = [regex]::Replace($s, '(?s)<!--.*?-->', '')
    $s = [regex]::Replace($s, '(?s)<style.*?</style>', '')
    $s = [regex]::Replace($s, '(?s)<script.*?</script>', '')
    $s = [regex]::Replace($s, '<[^>]+>', ' ')
    $s = [System.Net.WebUtility]::HtmlDecode($s)
    $s = $s -replace ' ', ' ' -replace '[​⁠﻿]', ''
    $s = [regex]::Replace($s, '\[\s*edit section[^\]]*\]', '')
    return ([regex]::Replace($s, '\s+', ' ')).Trim()
}

# Coupe le HTML entre le titre dont l'id correspond et le prochain titre de meme
# niveau ou moins. S'ancrer sur id= evite la table des matieres, qui contient les
# memes libelles plus haut dans la page.
function Get-SectionHtml([string]$html, [string]$id, [int]$level) {
    $m = [regex]::Match($html, '(?s)<h' + $level + '[^>]*>\s*<span[^>]*id="' + [regex]::Escape($id) + '"')
    if (-not $m.Success) {
        $m = [regex]::Match($html, '(?s)id="' + [regex]::Escape($id) + '"')
        if (-not $m.Success) { return "" }
    }
    $rest = $html.Substring($m.Index)
    $stop = [regex]::Match($rest.Substring(1), '(?s)<h[1-' + $level + '][ >]')
    if ($stop.Success) { return $rest.Substring(0, $stop.Index + 1) }
    return $rest
}

# Les traits sont des listes de definition : <dl><dt>Nom</dt><dd>Description</dd></dl>
function Get-Traits([string]$sectionHtml) {
    $out = @()
    foreach ($m in [regex]::Matches($sectionHtml, '(?s)<dt[^>]*>(?<n>.*?)</dt>\s*<dd[^>]*>(?<d>.*?)</dd>')) {
        $n = Strip-Html $m.Groups['n'].Value
        $d = Strip-Html $m.Groups['d'].Value
        if ($n -and $n.Length -lt 60) { $out += [PSCustomObject]@{ n = $n; d = $d } }
    }
    return $out
}

$ARMOUR_TERMS = @{ "Light armour" = "Light Armour"; "Medium armour" = "Medium Armour"
                   "Heavy armour" = "Heavy Armour"; "Shields" = "Shields" }
$WEAPON_TERMS = @("Shortswords","Longswords","Greatswords","Rapiers","Hand Crossbows",
                  "Shortbows","Longbows","Battleaxes","Handaxes","Light Hammers","Warhammers",
                  "Scimitars","Daggers","Crossbows")

$results = @()
$missing = @()
foreach ($name in $races) {
    $slug = ($name -replace "'", "%27" -replace " ", "_")
    $key = ($name.ToLower() -replace "[^a-z0-9]+", "-").Trim("-")
    $file = Join-Path $cacheDir "race-$key.html"
    if ((-not $Refresh) -and (Test-Path $file)) {
        $html = Get-Content $file -Raw -Encoding utf8
    } else {
        try {
            $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/$slug" -UserAgent $UA -TimeoutSec 30).Content
            Set-Content $file -Value $html -Encoding utf8
            Start-Sleep -Milliseconds 250
        } catch { $missing += $name; continue }
    }

    # 1. les traits communs a l'espece
    $sharedHtml = Get-SectionHtml $html "Racial_features" 2
    # la section commune s'arrete avant "Subraces" : sinon elle avale les sous-races
    $subIdx = $sharedHtml.IndexOf('id="Subraces"')
    if ($subIdx -ge 0) { $sharedHtml = $sharedHtml.Substring(0, $subIdx) }

    # 2. les traits de CETTE sous-race uniquement. Le wiki ecrit "High elf" la ou
    #    la liste dit "High Elf" : l'ancre est en casse de phrase.
    $subHtml = ""
    $anchor = ($name -replace ' ', '_')
    foreach ($cand in @($anchor, ($anchor.Substring(0,1) + $anchor.Substring(1).ToLower()))) {
        $subHtml = Get-SectionHtml $html $cand 3
        if ($subHtml) { break }
    }

    $traits = @()
    $traits += Get-Traits $sharedHtml
    if ($subHtml) { $traits += Get-Traits $subHtml }

    $features = (Strip-Html $sharedHtml) + " " + (Strip-Html $subHtml)

    $speed = 9
    $sm = [regex]::Match($features, 'move (\d+(?:\.\d+)?) m')
    if ($sm.Success) { $speed = [double]$sm.Groups[1].Value }

    $darkvision = ($traits | Where-Object { $_.n -match 'Darkvision' }).Count -gt 0

    $resistances = @()
    foreach ($rm in [regex]::Matches($features, 'Resistance (?:to|against) ([A-Z][a-z]+)(?: damage)?')) {
        $r = $rm.Groups[1].Value
        if ($resistances -notcontains $r) { $resistances += $r }
    }

    # une mention isolee d'"armure legere" ne vaut pas maitrise : il faut que le terme
    # apparaisse dans une phrase qui octroie explicitement une proficiency
    $grants = [regex]::Matches($features, '(?i)proficienc(?:y|ies)[^.]{0,240}') |
              ForEach-Object { $_.Value }
    $grantText = $grants -join " | "

    $armour = @()
    foreach ($k in $ARMOUR_TERMS.Keys) {
        if ($grantText -match [regex]::Escape($k)) { $armour += $ARMOUR_TERMS[$k] }
    }

    $weapons = @()
    foreach ($w in $WEAPON_TERMS) {
        if ($grantText -match [regex]::Escape($w)) {
            # le wiki ecrit "Shortswords" ; l'outil indexe au singulier
            $weapons += ($w -replace 's$', '')
        }
    }
    # "Hand Crossbows" ne doit pas aussi compter comme "Crossbow" generique
    if ($weapons -contains "Hand Crossbow" -and $grantText -notmatch '(?<!Hand )Crossbows') {
        $weapons = $weapons | Where-Object { $_ -ne "Crossbow" }
    }

    $results += [PSCustomObject]@{
        id = $key
        name = $name
        speed = $speed
        darkvision = [bool]$darkvision
        resistances = $resistances
        armour = $armour
        weapons = $weapons
        traits = $traits
        wiki = "https://bg3.wiki/wiki/$slug"
    }
    Write-Host ("  {0,-24} speed {1,-5} dark:{2,-6} res:{3,-10} traits:{4,-3} arm:{5,-26} wpn:{6}" -f `
        $name, $speed, $darkvision, ($resistances -join ","), $traits.Count, ($armour -join ","), ($weapons -join ","))
}

$results | ConvertTo-Json -Depth 5 | Set-Content (Join-Path $root "data\races.json") -Encoding utf8
Write-Host "`n$($results.Count) races -> data\races.json"
if ($missing) { Write-Host "Introuvables : $($missing -join ', ')" }
