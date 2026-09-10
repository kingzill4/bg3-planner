# data/subclasses.json -> data/subclasses.js
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$src = Get-Content (Join-Path $root "data\subclasses.json") -Raw -Encoding utf8
$out = "// GENERE par scripts/scrape-subclasses.ps1 + build-subclasses.ps1 — ne pas editer.`n" +
       "const SUBCLASSES = $src;`n`n" +
       'if (typeof module !== "undefined") module.exports = SUBCLASSES;' + "`n"
Set-Content (Join-Path $root "data\subclasses.js") -Value $out -Encoding utf8
Write-Host "data\subclasses.js genere"
