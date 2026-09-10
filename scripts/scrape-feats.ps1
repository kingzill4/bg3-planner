# Recupere les dons depuis bg3.wiki (page "Feats").
#
# Les descriptions etaient jusqu'ici ecrites de memoire dans app.js. Les lire sur le
# wiki evite les glissements 5e et donne le texte exact que le jeu affiche.
#
# La page est un grand tableau <tr><th>Nom</th><td>Description</td></tr>, mais des
# tableaux imbriques (le passif accorde, les "Notes") produisent leurs propres <tr>.
# On retire donc les tables imbriquees avant de decouper les lignes.
#
# Usage: pwsh -File scripts/scrape-feats.ps1 [-Refresh]
param([switch]$Refresh)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$cacheDir = Join-Path $root "cache\rules"
if (-not (Test-Path $cacheDir)) { New-Item -ItemType Directory -Path $cacheDir -Force | Out-Null }
$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"
$file = Join-Path $cacheDir "feats.html"

if ((-not $Refresh) -and (Test-Path $file)) {
    $html = Get-Content $file -Raw -Encoding utf8
} else {
    $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/Feats" -UserAgent $UA -TimeoutSec 30).Content
    Set-Content $file -Value $html -Encoding utf8
    Start-Sleep -Milliseconds 250
}

function Strip-Html([string]$s) {
    if (-not $s) { return "" }
    $s = [regex]::Replace($s, '(?s)<!--.*?-->', '')
    $s = [regex]::Replace($s, '(?s)<style.*?</style>', '')
    $s = [regex]::Replace($s, '(?s)<script.*?</script>', '')
    $s = [regex]::Replace($s, '</(p|li|dd|dt|br)>', ' ')
    $s = [regex]::Replace($s, '<br\s*/?>', ' ')
    $s = [regex]::Replace($s, '<[^>]+>', ' ')
    $s = [System.Net.WebUtility]::HtmlDecode($s)
    $s = $s -replace ' ', ' ' -replace '[​⁠﻿]', ''
    $s = [regex]::Replace($s, '\[\s*edit section[^\]]*\]', '')
    $s = [regex]::Replace($s, '\[\d+\]', '')
    return ([regex]::Replace($s, '\s+', ' ')).Trim()
}

# Retire les tables imbriquees, en repetant tant qu'il en reste (imbrication multiple)
function Remove-NestedTables([string]$s) {
    $prev = ""
    while ($prev -ne $s) {
        $prev = $s
        $s = [regex]::Replace($s, '(?s)<table(?:(?!<table).)*?</table>', ' ')
    }
    return $s
}

$table = [regex]::Match($html, '(?s)<table[^>]*wikitable.*?</table>').Value
# on garde la table externe : on enleve d'abord son ouverture/fermeture, puis les imbriquees
$inner = [regex]::Replace($table, '^(?s)<table[^>]*>', '')
$inner = [regex]::Replace($inner, '(?s)</table>\s*$', '')
$flat = Remove-NestedTables $inner

$results = @()
foreach ($row in [regex]::Matches($flat, '(?s)<tr[^>]*>(?<r>.*?)</tr>')) {
    $r = $row.Groups['r'].Value
    $th = [regex]::Match($r, '(?s)<th[^>]*>(?<t>.*?)</th>')
    if (-not $th.Success) { continue }
    $name = Strip-Html $th.Groups['t'].Value
    # "Notes" est un en-tete de bloc du wiki, pas un don
    if (-not $name -or $name -in @("Name", "Notes") -or $name.Length -gt 40) { continue }

    $desc = ""
    $td = [regex]::Match($r, '(?s)<td[^>]*>(?<t>.*?)</td>')
    if ($td.Success) { $desc = Strip-Html $td.Groups['t'].Value }
    # le tableau imbrique retire emportait parfois la description : on retombe sur la
    # ligne complete du tableau d'origine, moins le nom repete en tete
    if (-not $desc) {
        $full = [regex]::Match($table, '(?s)<th[^>]*>\s*(?:<[^>]+>\s*)*' + [regex]::Escape($name) + '.*?</tr>(?<after>.*?)(?=<tr[^>]*>\s*<th|</table>)')
        if ($full.Success) { $desc = Strip-Html $full.Groups['after'].Value }
    }
    if ($desc.StartsWith($name)) { $desc = $desc.Substring($name.Length).Trim() }
    # couper avant les notes du wiki, qui ne font pas partie de la description en jeu
    $desc = [regex]::Replace($desc, '\s*Notes\s+.*$', '')
    if ($desc.Length -gt 400) { $desc = $desc.Substring(0, 397).TrimEnd() + "..." }

    $key = ($name.ToLower() -replace "[^a-z0-9]+", "-").Trim("-")
    if ($results | Where-Object { $_.id -eq $key }) { continue }
    $results += [PSCustomObject]@{
        id = $key
        name = $name
        desc = $desc
        wiki = "https://bg3.wiki/wiki/" + ($name -replace " ", "_")
    }
    Write-Host ("  {0,-24} {1}" -f $name, $desc.Substring(0, [Math]::Min(80, $desc.Length)))
}

# Le tableau melange les dons et les passifs qu'ils accordent ("Sentinel: Snare").
# Un nom a deux-points appartient au don qui le precede : on le range dessous plutot
# que de le presenter comme un don a part entiere, que le jeu ne propose pas.
$grouped = @()
foreach ($f in $results) {
    if ($f.name -match '^(?<parent>[^:]+):\s*(?<sub>.+)$') {
        $parentName = $Matches['parent'].Trim()
        $parent = $grouped | Where-Object { $_.name -eq $parentName } | Select-Object -First 1
        if ($parent) {
            $parent.grants += [PSCustomObject]@{ n = $Matches['sub'].Trim(); d = $f.desc }
            continue
        }
    }
    $grouped += [PSCustomObject]@{
        id = $f.id; name = $f.name; desc = $f.desc; grants = @(); wiki = $f.wiki
    }
}
$results = $grouped

$results | ConvertTo-Json -Depth 4 | Set-Content (Join-Path $root "data\feats.json") -Encoding utf8
Write-Host "`n$($results.Count) dons -> data\feats.json"
