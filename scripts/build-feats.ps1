# data/feats.json -> data/feats.js
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$src = Get-Content (Join-Path $root "data\feats.json") -Raw -Encoding utf8
$out = "// GENERE par scripts/scrape-feats.ps1 + build-feats.ps1 — ne pas editer.`n" +
       "const FEAT_DATA = $src;`n`n" +
       'if (typeof module !== "undefined") module.exports = FEAT_DATA;' + "`n"
Set-Content (Join-Path $root "data\feats.js") -Value $out -Encoding utf8
Write-Host "data\feats.js genere"
