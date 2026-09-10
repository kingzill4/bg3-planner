# Telecharge les icones d'objets en local (icons/<id>.webp).
# Evite de solliciter bg3.wiki a chaque affichage de page.
#
# Usage: pwsh -File scripts/fetch-icons.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$iconDir = Join-Path $root "icons"
if (-not (Test-Path $iconDir)) { New-Item -ItemType Directory -Path $iconDir | Out-Null }

$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"
$items = Get-Content (Join-Path $root "data\scraped.json") -Raw -Encoding utf8 | ConvertFrom-Json

$done = 0; $skipped = 0; $failed = 0
foreach ($it in $items) {
    if (-not $it.icon) { continue }
    # l'extension vient de l'URL ; une icone deja presente sous l'autre extension
    # compte comme deja telechargee, pour ne pas re-tirer 900 fichiers pour rien
    $ext = if ($it.icon -match '\.png(\?|$)') { ".png" } else { ".webp" }
    $dest = Join-Path $iconDir ($it.id + $ext)
    $alt  = Join-Path $iconDir ($it.id + $(if ($ext -eq ".png") { ".webp" } else { ".png" }))
    if ((Test-Path $dest) -or (Test-Path $alt)) { $skipped++; continue }
    try {
        Invoke-WebRequest -Uri $it.icon -UserAgent $UA -OutFile $dest -TimeoutSec 30
        $done++
        Start-Sleep -Milliseconds 120
    } catch {
        $failed++
    }
    if (($done + $skipped) % 100 -eq 0) { Write-Host "  $($done + $skipped) / $($items.Count)" }
}
Write-Host "Icones : $done telechargees, $skipped deja presentes, $failed echecs -> $iconDir"
