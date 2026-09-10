# data/fighting-styles.json -> data/fighting-styles.js
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$src = Get-Content (Join-Path $root "data\fighting-styles.json") -Raw -Encoding utf8
$out = "// GENERE par scripts/scrape-fighting-styles.ps1 + build-fighting-styles.ps1 — ne pas editer.`n" +
       "const FIGHTING_STYLES = $src;`n`n" +
       'if (typeof module !== "undefined") module.exports = FIGHTING_STYLES;' + "`n"
Set-Content (Join-Path $root "data\fighting-styles.js") -Value $out -Encoding utf8
Write-Host "data\fighting-styles.js genere"
