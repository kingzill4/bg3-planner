# Garde les icones deja acquises quand un scraper reecrit son fichier.
#
# Les icones ne viennent pas du meme endroit que les donnees : les scrapers lisent
# les pages, puis fetch-sheet-icons.ps1 repasse par-dessus pour ajouter le champ
# "icon". Rejouer un scraper seul reecrivait donc le fichier sans ce champ, et les
# 33 races puis les 58 sous-classes ont perdu leurs images exactement comme cela —
# deux fois, parce que l'ordre du pipeline tenait dans la memoire de qui le lance
# plutot que dans le code.
#
# Desormais chaque scraper reprend l'icone de l'entree du meme id dans le fichier
# qu'il s'apprete a remplacer. Relancer fetch-sheet-icons.ps1 reste utile pour les
# NOUVELLES entrees ; ce n'est plus obligatoire pour ne pas casser les anciennes.
#
# Dot-source : . "$PSScriptRoot\keep-icons.ps1"

function Merge-ExistingIcons {
    param(
        [Parameter(Mandatory)][AllowEmptyCollection()][object[]]$Items,
        [Parameter(Mandatory)][string]$JsonPath,
        [string]$Field = "icon"
    )
    if (-not (Test-Path $JsonPath)) { return $Items }
    try {
        $old = Get-Content $JsonPath -Raw -Encoding utf8 | ConvertFrom-Json
    } catch { return $Items }

    $byId = @{}
    foreach ($o in @($old)) {
        if ($o.id -and $o.$Field) { $byId[[string]$o.id] = $o.$Field }
    }
    if (-not $byId.Count) { return $Items }

    $kept = 0
    foreach ($it in $Items) {
        if ($it.$Field) { continue }
        $id = [string]$it.id
        if ($byId.ContainsKey($id)) {
            $it | Add-Member -NotePropertyName $Field -NotePropertyValue $byId[$id] -Force
            $kept++
        }
    }
    if ($kept) { Write-Host "  $kept $Field(s) conserve(s) du fichier precedent" }
    return $Items
}
