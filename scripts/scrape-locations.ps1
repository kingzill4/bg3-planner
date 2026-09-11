# Quel acte pour quel lieu — depuis les categories du wiki, pas depuis une liste
# tenue a la main.
#
# L'acte d'un objet se devine a l'endroit ou on le trouve, et cet endroit est
# ecrit en toutes lettres dans sa section "Where to find". Restait a savoir a quel
# acte appartient "Sharess' Caress" : c'etait une liste de mots-cles ecrite de
# memoire, et 180 objets n'avaient pas d'acte parce que leur lieu n'y figurait
# pas. Le wiki classe pourtant chaque lieu lui-meme, dans
# Category:Act One/Two/Three Locations.
#
# Un lieu cite dans deux actes garde le plus petit : c'est la premiere fois qu'on
# peut y aller, et c'est ce qu'un planificateur veut savoir.
#
# Usage: pwsh -File scripts/scrape-locations.ps1 [-Refresh]
param([switch]$Refresh)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot "wiki-table.ps1")
$cacheDir = Join-Path $root "cache\rules"
if (-not (Test-Path $cacheDir)) { New-Item -ItemType Directory -Path $cacheDir -Force | Out-Null }
$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

# Un tableau de paires plutot qu'une table indexee par entier : avec une table
# ordonnee, $cats[1] rend le deuxieme element par position, pas la cle 1.
$cats = @(
    @{ act = 1; page = "Act_One_Locations" }
    @{ act = 2; page = "Act_Two_Locations" }
    @{ act = 3; page = "Act_Three_Locations" }
)

# Des noms trop generiques pour servir de mot-cle : ils apparaissent dans le texte
# d'objets qu'on trouve ailleurs, et rattacheraient a un acte des objets qui n'y
# sont pas. Le lieu existe, il est simplement inutilisable comme indice.
# Seuls ceux qui existent VRAIMENT dans plusieurs actes, ou dont le nom est un mot
# courant qu'un autre texte emploiera. "Ancient Lair" ou "Heapside Prison" sont des
# lieux uniques : les avoir ecartes par prudence retirait de la donnee juste.
$tooGeneric = @("Campsite", "Astral Plane", "Camp")

$byName = [ordered]@{}
foreach ($c in $cats) {
    $act = $c.act
    $name = $c.page
    $file = Join-Path $cacheDir "cat-$($name.ToLower()).html"
    if ($Refresh -or -not (Test-Path $file)) {
        $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/Category:$name" -UserAgent $UA -TimeoutSec 30).Content
        Set-Content $file -Value $html -Encoding utf8
        Start-Sleep -Milliseconds 250
    } else { $html = Get-Content $file -Raw -Encoding utf8 }

    $body = [regex]::Match($html, '(?s)id="mw-pages".*').Value
    foreach ($m in [regex]::Matches($body, '<li><a href="/wiki/[^"]+" title="([^"]+)"')) {
        $loc = [System.Net.WebUtility]::HtmlDecode($m.Groups[1].Value)
        # "Adamantine Forge (location)" : le desambiguisateur ne fait pas partie du nom
        $loc = ($loc -replace '\s*\([^)]*\)\s*$', '').Trim()
        if (-not $loc -or $loc.Length -lt 5) { continue }
        if ($tooGeneric -contains $loc) { continue }
        # le plus petit acte gagne
        if (-not $byName.Contains($loc)) { $byName[$loc] = [int]$act }
    }
}

$out = [ordered]@{}
foreach ($k in ($byName.Keys | Sort-Object)) { $out[$k] = $byName[$k] }
$json = ($out | ConvertTo-Json -Depth 3)
Set-Content (Join-Path $root "data\locations.json") -Value $json -Encoding utf8

$counts = @{}
foreach ($k in $out.Keys) { $counts[$out[$k]] = 1 + [int]$counts[$out[$k]] }
Write-Host "$($out.Count) lieux -> data\locations.json"
foreach ($a in 1..3) { Write-Host ("  acte {0} : {1}" -f $a, [int]$counts[$a]) }
