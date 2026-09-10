# Recupere les panoplies depuis bg3.wiki.
# Attention : BG3 n'a pas de bonus de set mecanique facon Diablo. Les pages "set" du
# wiki sont des regroupements thematiques listant les pieces qui vont ensemble.
# On enregistre donc l'appartenance, pas un bonus.
#
# Usage: pwsh -File scripts/scrape-sets.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$cacheDir = Join-Path $root "cache"
$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

function Strip-Html([string]$s) {
    if (-not $s) { return "" }
    $s = [regex]::Replace($s, '(?s)<!--.*?-->', '')
    $s = [regex]::Replace($s, '(?s)<style.*?</style>', '')
    $s = [regex]::Replace($s, '<[^>]+>', ' ')
    $s = [System.Net.WebUtility]::HtmlDecode($s)
    $s = $s -replace ' ', ' ' -replace '[​⁠﻿]', ''
    return ([regex]::Replace($s, '\s+', ' ')).Trim()
}

# liste des pages de la categorie
$listFile = Join-Path $cacheDir "category-equipment-sets.html"
if (Test-Path $listFile) {
    $listHtml = Get-Content $listFile -Raw -Encoding utf8
} else {
    $listHtml = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/Category:Equipment_sets" -UserAgent $UA -TimeoutSec 30).Content
    Set-Content $listFile -Value $listHtml -Encoding utf8
}
$pagesSection = [regex]::Match($listHtml, '(?s)id="mw-pages".*')
$setNames = [regex]::Matches($pagesSection.Value, 'title="(?<t>[^"]*set)"') |
            ForEach-Object { [System.Net.WebUtility]::HtmlDecode($_.Groups['t'].Value) } |
            Sort-Object -Unique

# noms d'objets connus, pour ne retenir que les lignes qui designent un vrai objet
$items = Get-Content (Join-Path $root "data\scraped.json") -Raw -Encoding utf8 | ConvertFrom-Json
$itemIdByName = @{}
foreach ($it in $items) { if (-not $it.cut) { $itemIdByName[$it.name] = $it.id } }

$results = @()
foreach ($setName in $setNames) {
    $slug = ($setName -replace "'", "%27" -replace " ", "_")
    $key = ($setName.ToLower() -replace "[^a-z0-9]+", "-").Trim("-")
    $file = Join-Path $cacheDir "set-$key.html"
    if (Test-Path $file) {
        $html = Get-Content $file -Raw -Encoding utf8
    } else {
        try {
            $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/$slug" -UserAgent $UA -TimeoutSec 30).Content
            Set-Content $file -Value $html -Encoding utf8
            Start-Sleep -Milliseconds 250
        } catch { continue }
    }

    # les liens sont imbriques dans des spans d'icone : on scanne tous les liens
    # de la page et on ne garde que ceux qui designent un objet connu
    $memberIds = @()
    foreach ($m in [regex]::Matches($html, '<a href="/wiki/[^"]*" title="(?<n>[^"]+)"')) {
        $n = [System.Net.WebUtility]::HtmlDecode($m.Groups['n'].Value)
        if ($itemIdByName.ContainsKey($n) -and $memberIds -notcontains $itemIdByName[$n]) {
            $memberIds += $itemIdByName[$n]
        }
    }
    if ($memberIds.Count -lt 2) { continue }

    $desc = $null
    $bodyStart = [regex]::Match($html, '(?s)<div class="mw-content-ltr mw-parser-output".*')
    if ($bodyStart.Success) {
        foreach ($p in [regex]::Matches($bodyStart.Value, '(?s)<p(?![^>]*mw-empty-elt)[^>]*>(?<t>.*?)</p>')) {
            $t = Strip-Html $p.Groups['t'].Value
            if ($t.Length -gt 40) { $desc = $t; break }
        }
    }
    if ($desc -and $desc.Length -gt 220) { $desc = $desc.Substring(0, 217).TrimEnd() + "..." }

    $results += [PSCustomObject]@{
        id = $key
        name = $setName
        desc = $desc
        items = $memberIds
        wiki = "https://bg3.wiki/wiki/$slug"
    }
    Write-Host ("  {0,-28} {1} pieces" -f $setName, $memberIds.Count)
}

$results | ConvertTo-Json -Depth 5 | Set-Content (Join-Path $root "data\sets.json") -Encoding utf8
Write-Host "`n$($results.Count) panoplies -> data\sets.json"
