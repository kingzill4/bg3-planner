# Verifie la table de multiclassage : ce qu'une classe prise en second accorde
# vraiment, contre bg3.wiki/wiki/Multiclassing.
#
# C'est la table la plus facile a se tromper et la plus dure a voir : un
# personnage qui prend un niveau de clerc en second n'obtient pas ce qu'un clerc
# de niveau 1 obtient, et rien dans l'interface ne le dit si la table est fausse.
#
# Usage: pwsh -File scripts/verify-multiclass.ps1 [-Refresh]
param([switch]$Refresh)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot "wiki-table.ps1")
$cacheDir = Join-Path $root "cache\rules"
if (-not (Test-Path $cacheDir)) { New-Item -ItemType Directory -Path $cacheDir -Force | Out-Null }
$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

$file = Join-Path $cacheDir "multiclassing.html"
if ($Refresh -or -not (Test-Path $file)) {
    $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/Multiclassing" -UserAgent $UA -TimeoutSec 30).Content
    Set-Content $file -Value $html -Encoding utf8
    Start-Sleep -Milliseconds 250
} else { $html = Get-Content $file -Raw -Encoding utf8 }

$classes = Get-Content (Join-Path $root "data\classes.json") -Raw -Encoding utf8 | ConvertFrom-Json
$js = Get-Content (Join-Path $root "js\core.js") -Raw -Encoding utf8

# Le tableau "Class / Gained Proficiency". Tout y est dans une seule cellule :
# les armures, les armes nommees et le nombre de competences.
$target = $null
foreach ($t in [regex]::Matches($html, '(?s)<table.*?</table>')) {
    $tbl = Read-WikiTable $t.Value
    if ((Find-WikiColumn $tbl "Class") -ge 0 -and (Find-WikiColumn $tbl "Gained Proficiency") -ge 0) {
        $target = $tbl; break
    }
}
if (-not $target) { Write-Host "Pas de tableau de maitrises multiclasse trouve." -ForegroundColor Yellow; exit 1 }

$clsCol = Find-WikiColumn $target "Class"
$profCol = Find-WikiColumn $target "Gained Proficiency"
$WORDS = @{ one = 1; two = 2; three = 3 }

$problems = @()
$seen = 0
foreach ($row in $target.body) {
    $name = ([string]$row.cells[$clsCol]).Trim()
    if (-not $name) { continue }
    $cls = $classes | Where-Object { $_.name -ieq $name }
    if (-not $cls) { continue }
    $seen++
    $wikiProf = [string]$row.cells[$profCol]
    # "None" veut dire aucune maitrise, pas "on n'a pas trouve".
    $granted = if ($wikiProf -match '^\s*None\s*$') { @() }
               else { @($wikiProf -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ }) }

    $expectArmour = @(); $expectWeapons = @(); $expectNamed = @(); $expectSkills = 0
    foreach ($g in $granted) {
        switch -regex ($g) {
            '^(Light|Medium|Heavy) [Aa]rmour$' { $expectArmour += ($g -replace 'armour', 'Armour'); continue }
            '^Shields$'          { $expectArmour += "Shields"; continue }
            '^Simple Weapons$'   { $expectWeapons += "simple"; continue }
            '^Martial Weapons$'  { $expectWeapons += "martial"; continue }
            '^(\w+) skills?\*?$' {
                $w = $matches[1].ToLower()
                $expectSkills += $(if ($WORDS.ContainsKey($w)) { $WORDS[$w] } else { 0 })
                continue
            }
            '^\w+ instrument$'   { continue }     # cosmetique, aucun effet chiffre
            default              { $expectNamed += ($g -replace 's$', ''); continue }
        }
    }

    $cmp = @(
        @{ what = "armures";     wiki = $expectArmour;  mine = @($cls.multiclass.armour) }
        @{ what = "categories";  wiki = $expectWeapons; mine = @($cls.multiclass.weapons) }
        @{ what = "armes";       wiki = $expectNamed;   mine = @($cls.multiclass.weaponExceptions) }
    )
    foreach ($c in $cmp) {
        $w = (($c.wiki | Sort-Object) -join ', ')
        $j = (($c.mine | Sort-Object) -join ', ')
        if ($w -ne $j) { $problems += "[$($cls.id)] $($c.what) : wiki [$w] / json [$j]" }
    }

    $jm = [regex]::Match($js, '(?s)MULTICLASS_SKILL_GRANTS = \{(?<b>.*?)\};')
    $mine = $null
    if ($jm.Success) {
        $km = [regex]::Match($jm.Groups['b'].Value, "\b$($cls.id)\s*:\s*(\d+)")
        if ($km.Success) { $mine = [int]$km.Groups[1].Value }
    }
    if ($null -eq $mine) { $problems += "[$($cls.id)] absent de MULTICLASS_SKILL_GRANTS" }
    elseif ($mine -ne $expectSkills) {
        $problems += "[$($cls.id)] competences : wiki $expectSkills ('$wikiProf'), outil $mine"
    }
}
Write-Host "Table de multiclassage relue depuis le wiki ($seen classes)."
if ($problems.Count -eq 0) { Write-Host "Tout concorde." -ForegroundColor Green }
else {
    $problems | ForEach-Object { Write-Host $_ -ForegroundColor Yellow }
    exit 1
}
