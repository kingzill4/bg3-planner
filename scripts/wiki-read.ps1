# Lecture ponctuelle d'une page de regles du wiki, pour verifier une affirmation
# avant de l'ecrire dans le code. Meme politesse que les scrapers : cache disque,
# 250 ms entre deux requetes, User-Agent identifiable, uniquement /wiki/<Article>.
#
# Usage: pwsh -File scripts/wiki-read.ps1 -Page "Critical Hit" [-Grep "crit"] [-Chars 3000]
param(
    [Parameter(Mandatory)][string]$Page,
    [string]$Grep,
    [int]$Chars = 4000,
    [switch]$Refresh
)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$cacheDir = Join-Path $root "cache\rules"
if (-not (Test-Path $cacheDir)) { New-Item -ItemType Directory -Path $cacheDir -Force | Out-Null }
$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

$slug = ($Page -replace "'", "%27" -replace " ", "_")
$key = ($Page.ToLower() -replace "[^a-z0-9]+", "-").Trim("-")
$file = Join-Path $cacheDir "$key.html"
if ((-not $Refresh) -and (Test-Path $file)) {
    $html = Get-Content $file -Raw -Encoding utf8
} else {
    $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/$slug" -UserAgent $UA -TimeoutSec 30).Content
    Set-Content $file -Value $html -Encoding utf8
    Start-Sleep -Milliseconds 250
}

$body = [regex]::Match($html, '(?s)<div class="mw-content-ltr mw-parser-output".*?<div class="printfooter"')
$t = if ($body.Success) { $body.Value } else { $html }
$t = [regex]::Replace($t, '(?s)<style.*?</style>', '')
$t = [regex]::Replace($t, '(?s)<script.*?</script>', '')
$t = [regex]::Replace($t, '</(p|li|tr|h2|h3|dd|dt)>', "`n")
$t = [regex]::Replace($t, '<[^>]+>', ' ')
$t = [System.Net.WebUtility]::HtmlDecode($t)
$t = ($t -split "`n" | ForEach-Object { ($_ -replace '\s+', ' ').Trim() } | Where-Object { $_ }) -join "`n"

if ($Grep) {
    ($t -split "`n" | Where-Object { $_ -match $Grep }) -join "`n"
} else {
    $t.Substring(0, [Math]::Min($Chars, $t.Length))
}
