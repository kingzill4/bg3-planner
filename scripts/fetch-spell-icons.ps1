# Telecharge les icones de sorts en local (icons/spells/<id>.webp),
# pour ne pas solliciter bg3.wiki a chaque affichage.
#
# Usage: pwsh -File scripts/fetch-spell-icons.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$iconDir = Join-Path $root "icons\spells"
if (-not (Test-Path $iconDir)) { New-Item -ItemType Directory -Path $iconDir -Force | Out-Null }

$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"
$spells = Get-Content (Join-Path $root "data\spells.json") -Raw -Encoding utf8 | ConvertFrom-Json

$done = 0; $skipped = 0; $failed = 0
foreach ($s in $spells) {
    if (-not $s.icon) { continue }
    $dest = Join-Path $iconDir ($s.id + ".webp")
    if (Test-Path $dest) { $skipped++; continue }
    try {
        Invoke-WebRequest -Uri $s.icon -UserAgent $UA -OutFile $dest -TimeoutSec 30
        $done++
        Start-Sleep -Milliseconds 120
    } catch { $failed++ }
    if (($done + $skipped) % 100 -eq 0) { Write-Host "  $($done + $skipped) / $($spells.Count)" }
}
Write-Host "Icones de sorts : $done telechargees, $skipped deja presentes, $failed echecs"
