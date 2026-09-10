# Stamps a version onto every local script and stylesheet reference in index.html.
#
# Why this is needed: GitHub Pages serves everything with `Cache-Control: max-age=600`.
# For ten minutes after a deploy, a returning visitor is served the OLD js/*.js and
# data/*.js straight from their own browser cache, without ever asking the server.
# The deploy is fine; the browser simply never looks. That is exactly how a change
# can be live and invisible at the same time.
#
# The stamp is a content hash, not a timestamp: a file that did not change keeps its
# URL and stays cached, and only what actually changed is re-fetched. index.html
# itself still carries the ten-minute delay — nothing here can shorten that — but
# once it is re-read, every asset it points at is guaranteed fresh.
#
# Run it before committing whenever js/, data/ or style.css changed.
# Usage: pwsh -File scripts/stamp-assets.ps1 [-Check]
param([switch]$Check)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$page = Join-Path $root "index.html"
$html = Get-Content $page -Raw -Encoding utf8
$original = $html

function Short-Hash([string]$path) {
    if (-not (Test-Path $path)) { return $null }
    return (Get-FileHash $path -Algorithm MD5).Hash.Substring(0, 8).ToLower()
}

$stamped = 0
$missing = @()

# src="js/app.js" or src="js/app.js?v=abc123", and the same for href= on the CSS
$pattern = '(?<attr>(?:src|href))="(?<file>(?:js|data)/[^"?]+\.js|style\.css)(?:\?v=[0-9a-f]+)?"'
$html = [regex]::Replace($html, $pattern, {
    param($m)
    $file = $m.Groups['file'].Value
    $full = Join-Path $root ($file -replace '/', '\')
    $h = Short-Hash $full
    if (-not $h) { $script:missing += $file; return $m.Value }
    $script:stamped++
    '{0}="{1}?v={2}"' -f $m.Groups['attr'].Value, $file, $h
})

if ($Check) {
    if ($html -eq $original) { "index.html est a jour ($stamped references)"; exit 0 }
    Write-Host "index.html a des empreintes perimees - relancer sans -Check" -ForegroundColor Yellow
    exit 1
}

if ($html -ne $original) {
    Set-Content $page -Value $html -Encoding utf8 -NoNewline
    "index.html : $stamped references horodatees"
} else {
    "index.html : deja a jour ($stamped references)"
}
if ($missing.Count) { "  fichiers introuvables : " + ($missing -join ", ") }
