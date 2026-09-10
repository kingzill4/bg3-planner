# data/classes.json -> data/classes.js
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$src = Get-Content (Join-Path $root "data\classes.json") -Raw -Encoding utf8
$out = "// GENERE par scripts/scrape-classes.ps1 + build-classes.ps1 — ne pas editer.`n" +
       "// Regles tirees de bg3.wiki, pas des regles D&D 5e sur table.`n" +
       "const CLASS_DATA = $src;`n`n" +
       'if (typeof module !== "undefined") module.exports = CLASS_DATA;' + "`n"
Set-Content (Join-Path $root "data\classes.js") -Value $out -Encoding utf8
Write-Host "data\classes.js genere"
