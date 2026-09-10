# data/races.json -> data/races.js
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$src = Get-Content (Join-Path $root "data\races.json") -Raw -Encoding utf8
$out = "// GENERE par scripts/scrape-races.ps1 + build-races.ps1 — ne pas editer.`n" +
       "const RACES = $src;`n`n" +
       'if (typeof module !== "undefined") module.exports = RACES;' + "`n"
Set-Content (Join-Path $root "data\races.js") -Value $out -Encoding utf8
Write-Host "data\races.js genere"
