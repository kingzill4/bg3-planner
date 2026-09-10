# data/spells.json -> data/spells.js
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$spells = Get-Content (Join-Path $root "data\spells.json") -Raw -Encoding utf8 | ConvertFrom-Json

# prefere l'icone locale quand elle a ete telechargee, sinon garde l'URL wiki
$local = 0
foreach ($s in $spells) {
    if (-not $s.icon) { continue }
    $path = Join-Path $root ("icons\spells\" + $s.id + ".webp")
    if (Test-Path $path) { $s.icon = "icons/spells/" + $s.id + ".webp"; $local++ }
}

# Depth 8 : `availability` est un tableau d'objets imbriques. A profondeur
# insuffisante PowerShell les serialise en
# "System.Collections.Specialized.OrderedDictionary" au lieu du JSON attendu.
$src = $spells | ConvertTo-Json -Depth 8
$out = "// GENERE par scripts/scrape-spells.ps1 + build-spells.ps1 — ne pas editer.`n" +
       "const SPELLS = $src;`n`n" +
       'if (typeof module !== "undefined") module.exports = SPELLS;' + "`n"
Set-Content (Join-Path $root "data\spells.js") -Value $out -Encoding utf8
Write-Host "data\spells.js genere : $($spells.Count) sorts ($local icones locales)"
