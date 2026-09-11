# Genere data/items.js a partir de data/scraped.json (donnees wiki, anglais)
# + data/overrides.json (fiches redigees a la main, francais) qui a priorite.
#
# Usage: pwsh -File scripts/build-db.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$scraped = Get-Content (Join-Path $root "data\scraped.json") -Raw -Encoding utf8 | ConvertFrom-Json

$overridesPath = Join-Path $root "data\overrides.json"
$overrides = @{}
if (Test-Path $overridesPath) {
    $ov = Get-Content $overridesPath -Raw -Encoding utf8 | ConvertFrom-Json
    foreach ($o in $ov) { $overrides[$o.id] = $o }
}

function JsStr($s) {
    if ($null -eq $s -or $s -eq "") { return "null" }
    $e = $s -replace '\\', '\\' -replace '"', '\"' -replace "`r", "" -replace "`n", " "
    return '"' + $e + '"'
}

function JsArr($items) {
    if ($null -eq $items -or $items.Count -eq 0) { return "[]" }
    return "[" + (($items | ForEach-Object { JsStr $_ }) -join ",") + "]"
}

function JsSpecial($entries) {
    if ($null -eq $entries -or $entries.Count -eq 0) { return "[]" }
    $parts = $entries | ForEach-Object { "{n:$(JsStr $_.n),d:$(JsStr $_.d)}" }
    return "[" + ($parts -join ",") + "]"
}

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine("// Base d'objets BG3 — GENERE AUTOMATIQUEMENT, ne pas editer a la main.")
[void]$sb.AppendLine("// Source : bg3.wiki (scripts/scrape.ps1). Corrections manuelles : data/overrides.json.")
[void]$sb.AppendLine("// Regenerer avec : pwsh -File scripts/build-db.ps1")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("const ITEMS = [")

$kept = 0
$cutCount = 0
foreach ($it in $scraped) {
    if ($it.cut) { $cutCount++; continue }   # contenu coupe du jeu : hors base

    $o = $overrides[$it.id]
    $summary  = if ($o -and $o.summary)  { $o.summary }  else { $it.summary }
    $location = if ($o -and $o.location) { $o.location } else { $it.location }
    $act = if ($o -and $o.act) { $o.act } elseif ($it.act) { $it.act } else { $null }
    $actStr = if ($act) { "$act" } else { "null" }
    $att = if ($it.attunement) { "true" } else { "false" }

    # icone locale si telechargee, sinon URL wiki, sinon null.
    # On cherche par identifiant sans presumer de l'extension : une icone deja sur le
    # disque en .webp reste valide meme si le wiki sert desormais un .png pour la meme
    # page, et l'inverse. Sinon un simple changement d'extension re-telechargerait tout.
    $iconRef = "null"
    if ($it.icon) {
        $urlExt = if ($it.icon -match '\.png(\?|$)') { ".png" } else { ".webp" }
        $found = $null
        foreach ($ext in @($urlExt, ".webp", ".png")) {
            $p = Join-Path $root ("icons\" + $it.id + $ext)
            if (Test-Path $p) { $found = "icons/" + $it.id + $ext; break }
        }
        if ($found) { $iconRef = JsStr $found } else { $iconRef = JsStr $it.icon }
    }

    $line = "  { id: $(JsStr $it.id), name: $(JsStr $it.name), type: $(JsStr $it.type), subtype: $(JsStr $it.subtype), " +
            "rarity: $(JsStr $it.rarity), act: $actStr, attunement: $att, icon: $iconRef, " +
            "damage: $(JsStr $it.damage), ac: $(if ($it.ac) { $it.ac } else { 'null' }), " +
            "details: $(JsArr $it.details), special: $(JsSpecial $it.special), " +
            "summary: $(JsStr $summary), location: $(JsStr $location), wiki: $(JsStr $it.wiki), " +
            # Le nom interne de l'objet : la seule chose qu'une sauvegarde .lsv porte
            # de lui. Sans ce champ, rien dans une partie ne peut etre relie a sa fiche.
            "stats: $(JsStr $it.stats), anyAct: $(if ($it.anyAct) { 'true' } else { 'false' }) },"
    [void]$sb.AppendLine($line)
    $kept++
}

[void]$sb.AppendLine("];")
[void]$sb.AppendLine("")
[void]$sb.AppendLine('if (typeof module !== "undefined") module.exports = ITEMS;')

Set-Content (Join-Path $root "data\items.js") -Value $sb.ToString() -Encoding utf8
Write-Host "items.js genere : $kept objets (+ $cutCount objets 'cut content' exclus)"
