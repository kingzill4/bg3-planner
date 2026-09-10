# data/companions.json -> data/companions.js (chargeable via <script>, sans serveur)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$src = Get-Content (Join-Path $root "data\companions.json") -Raw -Encoding utf8
$out = "// GENERE par scripts/scrape-companions.ps1 + build-companions.ps1 — ne pas editer.`n" +
       "const COMPANIONS = $src;`n`n" +
       'if (typeof module !== "undefined") module.exports = COMPANIONS;' + "`n"
Set-Content (Join-Path $root "data\companions.js") -Value $out -Encoding utf8
Write-Host "data\companions.js genere"
