# data/sets.json -> data/sets.js
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$src = Get-Content (Join-Path $root "data\sets.json") -Raw -Encoding utf8
$out = "// GENERE par scripts/scrape-sets.ps1 + build-sets.ps1 — ne pas editer.`n" +
       "// BG3 n'a pas de bonus de panoplie mecanique : ce sont des regroupements thematiques.`n" +
       "const SETS = $src;`n`n" +
       'if (typeof module !== "undefined") module.exports = SETS;' + "`n"
Set-Content (Join-Path $root "data\sets.js") -Value $out -Encoding utf8
Write-Host "data\sets.js genere"
