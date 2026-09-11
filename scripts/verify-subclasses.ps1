# Verifie que data/subclasses.json dit exactement ce que dit le wiki.
#
# Le scraper et ce script lisent la meme page par deux chemins differents : le
# scraper nettoie, regroupe et filtre, celui-ci prend betement chaque <dt> de la
# section "Subclass features" dans l'ordre. Si les deux listes divergent, c'est
# que le nettoyage a mange quelque chose — c'est arrive : un terrain du Circle of
# the Land donne DEUX sorts par niveau et seul le premier etait lu.
#
# Usage: pwsh -File scripts/verify-subclasses.ps1 [-Refresh] [-Id circle-of-the-land]
param(
    [switch]$Refresh,
    [string]$Id
)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$cacheDir = Join-Path $root "cache"
$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

$data = Get-Content (Join-Path $root "data\subclasses.json") -Raw -Encoding utf8 | ConvertFrom-Json
if ($Id) { $data = @($data | Where-Object { $_.id -eq $Id }) }

function Plain([string]$s) {
    $s = [regex]::Replace($s, '(?s)<style.*?</style>', '')
    $s = [regex]::Replace($s, '<[^>]+>', ' ')
    $s = [System.Net.WebUtility]::HtmlDecode($s)
    $s = ($s -replace '\s+', ' ').Trim()
    # les balises separaient le nom du nombre : "Charges : 3" ici, "Charges: 3"
    # apres nettoyage du scraper. Meme chose, pas une divergence.
    ($s -replace '\s+([,.;:])', '$1')
}

$problems = @()
$checked = 0
foreach ($sub in $data) {
    $file = Join-Path $cacheDir ("subclass-" + $sub.id + ".html")
    if ($Refresh -or -not (Test-Path $file)) {
        $slug = ($sub.name -replace "'", "%27" -replace " ", "_")
        $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/$slug" -UserAgent $UA -TimeoutSec 30).Content
        Set-Content $file -Value $html -Encoding utf8
        Start-Sleep -Milliseconds 250
    }
    $html = Get-Content $file -Raw -Encoding utf8

    # Relecture independante : chaque <dt> de la section, avec le niveau du <h3>
    # qui le precede. Aucun regroupement, aucun filtre.
    $sf = [regex]::Match($html, '(?s)id="Subclass_features".*?(?=<h2)')
    if (-not $sf.Success) { continue }
    $body = $sf.Value
    $marks = [regex]::Matches($body, '<h3[^>]*>\s*<span[^>]*id="Level_(?<lv>\d+)"')
    $wiki = @()
    foreach ($dt in [regex]::Matches($body, '(?s)<dt[^>]*>(?<n>.*?)</dt>')) {
        $lv = $null
        foreach ($mk in $marks) { if ($mk.Index -lt $dt.Index) { $lv = [int]$mk.Groups['lv'].Value } }
        $n = Plain $dt.Groups['n'].Value
        $n = ($n -replace '\(\s*[+\-,/&\s]*\)', '').Trim()
        if (-not $n -or $n.Length -gt 70) { continue }
        $wiki += "$lv|$n"
    }

    # Le json imbrique desormais les options sous leur capacite parente, comme le
    # wiki ; on compare l'ensemble des noms, parents et options confondus.
    $mine = @()
    foreach ($f in $sub.features) {
        $mine += "$($f.level)|$($f.n)"
        foreach ($o in $f.opts) { $mine += "$($f.level)|$($o.n)" }
    }
    $checked++

    $missing = @($wiki | Where-Object { $mine -notcontains $_ })
    $extra = @($mine | Where-Object { $wiki -notcontains $_ })
    # On compare des ensembles de noms : le wiki ecrit parfois deux fois la meme
    # capacite au meme niveau (une entree pour le texte, une pour ses variantes)
    # et le scraper les refond en une. Ce qui doit concorder, c'est QUI est la.
    $wikiSet = @($wiki | Select-Object -Unique)
    $mineSet = @($mine | Select-Object -Unique)
    if ($missing.Count -or $extra.Count -or $wikiSet.Count -ne $mineSet.Count) {
        $problems += [PSCustomObject]@{
            id = $sub.id; wiki = $wikiSet.Count; mine = $mineSet.Count
            missing = ($missing -join " ; "); extra = ($extra -join " ; ")
        }
    }
}

Write-Host "$checked sous-classes relues depuis le wiki."
if ($problems.Count -eq 0) {
    Write-Host "Tout concorde." -ForegroundColor Green
} else {
    foreach ($p in $problems) {
        Write-Host ("[{0}] wiki={1} json={2}" -f $p.id, $p.wiki, $p.mine) -ForegroundColor Yellow
        if ($p.missing) { Write-Host ("  absent du json : " + $p.missing) }
        if ($p.extra) { Write-Host ("  en trop        : " + $p.extra) }
    }
    exit 1
}
