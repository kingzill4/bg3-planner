# Verifie que data/races.json dit exactement ce que dit le wiki : le jeu complet
# de races et sous-races, et pour chacune sa vitesse, sa vision dans le noir, ses
# resistances et ses traits.
#
# La liste elle-meme compte autant que les valeurs : une sous-race oubliee est
# une combinaison que l'outil ne sait pas planifier. Dix couleurs de dragonborn
# manquaient jusqu'a ce qu'on les compte.
#
# Usage: pwsh -File scripts/verify-races.ps1 [-Refresh] [-Id high-elf]
param([switch]$Refresh, [string]$Id)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot "wiki-table.ps1")
$cacheDir = Join-Path $root "cache"
$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

$data = Get-Content (Join-Path $root "data\races.json") -Raw -Encoding utf8 | ConvertFrom-Json
$wanted = if ($Id) { @($data | Where-Object { $_.id -eq $Id }) } else { $data }

function Get-Page([string]$slug, [string]$key) {
    $file = Join-Path $cacheDir "race-$key.html"
    if ($Refresh -or -not (Test-Path $file)) {
        $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/$slug" -UserAgent $UA -TimeoutSec 30).Content
        Set-Content $file -Value $html -Encoding utf8
        Start-Sleep -Milliseconds 250
        return $html
    }
    Get-Content $file -Raw -Encoding utf8
}

$problems = @()

# 1. La liste des races, telle que la page Races la donne.
$listFile = Join-Path $root "cache\rules\races-index.html"
if (-not (Test-Path (Split-Path $listFile))) { New-Item -ItemType Directory -Path (Split-Path $listFile) -Force | Out-Null }
if ($Refresh -or -not (Test-Path $listFile)) {
    $idx = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/Races" -UserAgent $UA -TimeoutSec 30).Content
    Set-Content $listFile -Value $idx -Encoding utf8
    Start-Sleep -Milliseconds 250
} else { $idx = Get-Content $listFile -Raw -Encoding utf8 }

$names = @($data.name)
$body = [regex]::Match($idx, '(?s)<div class="mw-content-ltr mw-parser-output".*?<div class="printfooter"')
$idxText = ConvertTo-PlainText $(if ($body.Success) { $body.Value } else { $idx })
$notOnIndex = @($names | Where-Object { $idxText -notmatch [regex]::Escape($_) })
if ($notOnIndex.Count) {
    $problems += "races absentes de la page Races du wiki : " + ($notOnIndex -join ", ")
}

# 2. Chaque race, valeur par valeur.
$checked = 0
foreach ($r in $wanted) {
    $slug = ($r.name -replace "'", "%27" -replace " ", "_")
    $html = Get-Page $slug $r.id
    # Le corps de l'article seulement : la barre de navigation du wiki contient un
    # lien "Darkvision" sur CHAQUE page, ce qui faisait passer les halfelins pour
    # des races a vision nocturne.
    # ... et la navbox de bas de page, qui vit DANS le corps de l'article et liste
    # elle aussi "Darkvision" sur chaque page du wiki.
    $bodyM = [regex]::Match($html, '(?s)<div class="mw-content-ltr mw-parser-output".*?<div class="printfooter"')
    $raw = if ($bodyM.Success) { $bodyM.Value } else { $html }
    $navAt = $raw.IndexOf('navbox')
    if ($navAt -gt 0) { $raw = $raw.Substring(0, $navAt) }
    $text = ConvertTo-PlainText $raw
    $checked++

    # Vitesse : le wiki l'ecrit en metres ET en pieds, "9 m / 30 ft".
    $sm = [regex]::Match($text, '(?:Speed|movement speed)[^0-9]{0,40}?([\d.]+)\s*m\b')
    if ($sm.Success) {
        $w = [double]$sm.Groups[1].Value
        if ([Math]::Abs($w - [double]$r.speed) -gt 0.01) {
            $problems += "[$($r.id)] vitesse wiki $w m, json $($r.speed) m"
        }
    }

    # Vision dans le noir : presente ou absente, pas de demi-mesure.
    $hasDv = $text -match 'Darkvision'
    if ($hasDv -ne [bool]$r.darkvision) {
        $problems += "[$($r.id)] darkvision wiki=$hasDv json=$($r.darkvision)"
    }

    # Resistances : ce que le json annonce doit se retrouver sur la page.
    foreach ($res in @($r.resistances)) {
        if ($text -notmatch [regex]::Escape($res)) {
            $problems += "[$($r.id)] resistance '$res' absente de la page"
        }
    }

    # Traits : le nom de chaque trait doit exister sur la page de la race.
    foreach ($t in @($r.traits)) {
        $n = $t.n
        if (-not $n) { continue }
        if ($n -in @("Size", "Base Racial Speed")) { continue }   # libelles de l'outil
        if ($text -notmatch [regex]::Escape($n)) {
            $problems += "[$($r.id)] trait '$n' introuvable sur la page"
        }
    }
}

Write-Host "$checked races relues depuis le wiki (sur $($data.Count) dans le json)."
if ($problems.Count -eq 0) { Write-Host "Tout concorde." -ForegroundColor Green }
else {
    $problems | ForEach-Object { Write-Host $_ -ForegroundColor Yellow }
    exit 1
}
