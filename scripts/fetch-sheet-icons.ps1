# Recupere les icones de classe, sous-classe et race depuis les pages deja en cache,
# et les ecrit dans les jeux de donnees correspondants.
#
# Ces pages n'ont pas d'infobox d'objet : leur image representative est dans la
# balise og:image, qui pointe sur le badge officiel du jeu pour les classes et
# sous-classes ("Class_Fighter_Badge_Icon.png").
#
# Usage: pwsh -File scripts/fetch-sheet-icons.ps1
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

$sets = @(
    @{ json = "classes.json";    cache = "class-";    dir = "classes" },
    @{ json = "subclasses.json"; cache = "subclass-"; dir = "subclasses" },
    @{ json = "races.json";      cache = "race-";     dir = "races" }
)

foreach ($set in $sets) {
    $path = Join-Path $root ("data\" + $set.json)
    if (-not (Test-Path $path)) { Write-Host "  $($set.json) absent"; continue }
    $items = Get-Content $path -Raw -Encoding utf8 | ConvertFrom-Json
    $iconDir = Join-Path $root ("icons\" + $set.dir)
    if (-not (Test-Path $iconDir)) { New-Item -ItemType Directory -Path $iconDir -Force | Out-Null }

    $done = 0; $skipped = 0; $missing = 0; $deduped = 0
    # hash -> path, so a second entry resolving to identical bytes reuses the first
    $seenHash = @{}
    foreach ($it in $items) {
        $page = Join-Path $root ("cache\" + $set.cache + $it.id + ".html")
        if (-not (Test-Path $page)) { $missing++; continue }
        $html = Get-Content $page -Raw -Encoding utf8
        $url = [regex]::Match($html, '<meta property="og:image" content="(?<u>[^"]+)"').Groups['u'].Value
        if (-not $url) { $missing++; continue }

        $ext = if ($url -match '\.jpe?g(\?|$)') { ".jpg" } elseif ($url -match '\.webp(\?|$)') { ".webp" } else { ".png" }
        $dest = Join-Path $iconDir ($it.id + $ext)
        if (Test-Path $dest) { $skipped++ }
        else {
            try {
                Invoke-WebRequest -Uri $url -UserAgent $UA -OutFile $dest -TimeoutSec 30
                $done++
                Start-Sleep -Milliseconds 150
            } catch { $missing++; continue }
        }

        # A subrace whose page redirects to the species page returns that page's
        # og:image, so the ten dragonborn colours all downloaded the same badge —
        # eleven byte-identical copies at 51 KB each. The wiki has no per-colour
        # badge, and pretending otherwise costs half a megabyte, so an exact
        # duplicate is dropped and its entry points at the file already there.
        $rel = "icons/" + $set.dir + "/" + $it.id + $ext
        $hash = (Get-FileHash $dest -Algorithm MD5).Hash
        if ($seenHash.ContainsKey($hash) -and $seenHash[$hash] -ne $rel) {
            Remove-Item $dest -Force
            $rel = $seenHash[$hash]
            $deduped++
        } else {
            $seenHash[$hash] = $rel
        }
        $it | Add-Member -NotePropertyName icon -NotePropertyValue $rel -Force
    }
    $items | ConvertTo-Json -Depth 8 | Set-Content $path -Encoding utf8
    Write-Host ("  {0,-18} {1} telechargees, {2} deja presentes, {3} sans image, {4} dedoublonnees" -f $set.json, $done, $skipped, $missing, $deduped)
}
Write-Host "`nIcones de fiche ecrites dans data\*.json — relancer les build-*.ps1"
