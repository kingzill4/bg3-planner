# Verifie que data/classes.json dit exactement ce que dit le wiki, niveau par niveau.
#
# La page d'une classe porte un tableau de progression : une ligne par niveau,
# une colonne "Features". C'est la source, et on la relit ici par un chemin
# different de celui du scraper — si les deux listes divergent, le nettoyage du
# scraper a mange ou invente quelque chose.
#
# Usage: pwsh -File scripts/verify-classes.ps1 [-Refresh] [-Id barbarian]
param(
    [switch]$Refresh,
    [string]$Id
)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot "wiki-table.ps1")
$cacheDir = Join-Path $root "cache"
$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

$data = Get-Content (Join-Path $root "data\classes.json") -Raw -Encoding utf8 | ConvertFrom-Json
if ($Id) { $data = @($data | Where-Object { $_.id -eq $Id }) }

$problems = @()
$checked = 0
foreach ($cls in $data) {
    $file = Join-Path $cacheDir ("class-" + $cls.id + ".html")
    if ($Refresh -or -not (Test-Path $file)) {
        $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/$($cls.name)" -UserAgent $UA -TimeoutSec 30).Content
        Set-Content $file -Value $html -Encoding utf8
        Start-Sleep -Milliseconds 250
    }
    $html = Get-Content $file -Raw -Encoding utf8

    # Le ranger ecrit id="Class_progression", les autres id="Class_Progression".
    $tbl = [regex]::Match($html, '(?si)id="Class_progression".*?(<table.*?</table>)')
    if (-not $tbl.Success) {
        $problems += [PSCustomObject]@{ id = $cls.id; note = "pas de tableau de progression sur la page" }
        continue
    }
    $table = Read-WikiTable $tbl.Groups[1].Value
    $featCol = Find-WikiColumn $table "Features"
    if ($featCol -lt 0) {
        $problems += [PSCustomObject]@{ id = $cls.id; note = "pas de colonne Features" }
        continue
    }

    $wiki = @{}
    foreach ($r in $table.body) {
        $lm = [regex]::Match([string]$r.cells[0], '^(\d+)')
        if (-not $lm.Success) { continue }
        $wiki[[int]$lm.Groups[1].Value] = Split-WikiFeatures ([string]$r.cells[$featCol])
    }

    $checked++
    foreach ($lv in 1..12) {
        $wn = @(@($wiki[$lv]) | Where-Object { $_ } | ForEach-Object { $_.ToLower() })
        $mn = @(@(($cls.progression | Where-Object { $_.level -eq $lv }).features) |
                Where-Object { $_ } | ForEach-Object { $_.ToLower() })
        $miss = @($wn | Where-Object { $mn -notcontains $_ })
        $extra = @($mn | Where-Object { $wn -notcontains $_ })
        if ($miss.Count -or $extra.Count) {
            $problems += [PSCustomObject]@{
                id = $cls.id; level = $lv
                note = ("absent du json: [" + ($miss -join ", ") + "]  en trop: [" + ($extra -join ", ") + "]")
            }
        }
    }
}

Write-Host "$checked classes relues depuis le wiki."
if ($problems.Count -eq 0) { Write-Host "Tout concorde." -ForegroundColor Green }
else {
    foreach ($p in $problems) {
        Write-Host ("[{0}{1}] {2}" -f $p.id, $(if ($p.level) { " L$($p.level)" }), $p.note) -ForegroundColor Yellow
    }
    exit 1
}
