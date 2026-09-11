# Verifie les regles de combat que l'outil applique, contre les pages du wiki qui
# les enoncent.
#
# Les autres verificateurs comparent des DONNEES scrapees a leur source. Celui-ci
# compare du CODE a sa source : les regles de degats sont ecrites a la main dans
# js/combat.js, et une regle ecrite a la main est une regle qui derive en silence.
# Chacune est relue ici sur la page qui la donne, et la phrase attendue doit s'y
# trouver — si le wiki change d'avis, ou si quelqu'un change le code sans changer
# le wiki, la verification tombe.
#
# Usage: pwsh -File scripts/verify-combat.ps1 [-Refresh]
param([switch]$Refresh)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot "wiki-table.ps1")
$cacheDir = Join-Path $root "cache\rules"
if (-not (Test-Path $cacheDir)) { New-Item -ItemType Directory -Path $cacheDir -Force | Out-Null }
$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

function Get-Rules([string]$page) {
    $key = ($page.ToLower() -replace "[^a-z0-9]+", "-").Trim("-")
    $file = Join-Path $cacheDir "$key.html"
    if ($Refresh -or -not (Test-Path $file)) {
        $slug = ($page -replace "'", "%27" -replace " ", "_")
        $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/$slug" -UserAgent $UA -TimeoutSec 30).Content
        Set-Content $file -Value $html -Encoding utf8
        Start-Sleep -Milliseconds 250
    } else { $html = Get-Content $file -Raw -Encoding utf8 }
    ConvertTo-PlainText $html
}

# Chaque regle : la page qui l'enonce, et un fragment de cette page qui doit s'y
# trouver encore. Les fragments sont courts et litteraux exprès — c'est la phrase
# sur laquelle le code s'appuie, pas un resume de celle-ci.
$rules = @(
    @{ page = "Critical Hit";            want = "Any dice that are rolled for damage, including additional dice such as those from smites or combat manoeuvres, are rolled twice";  why = "seuls les des doublent" }
    @{ page = "Critical Hit";            want = "Flat modifiers and bonuses to damage";                    why = "les bonus fixes ne doublent pas" }
    @{ page = "Critical Hit";            want = "with the exception of Divine Smite";                       why = "Brutal Critical/Savage Attacks touchent aussi Divine Smite" }
    @{ page = "Improved Divine Smite";   want = "Melee weapon attacks deal an additional 1d8";              why = "+1d8 radiant a chaque coup de melee, paladin 11" }
    @{ page = "Brutal Critical";         want = "you roll an extra damage die as well as the normal additional critical die"; why = "un de de plus sur un critique" }
    @{ page = "Brutal Critical";         want = "only applies to main hand melee weapon attacks";           why = "jamais sur la main gauche" }
    @{ page = "Savage Attacks";          want = "you deal an extra die of weapon damage";                   why = "un de de plus, demi-orque" }
    @{ page = "Rage";                    want = "additional 2 (increased to 3 at level 9) damage";          why = "+2 puis +3 a partir du niveau 9" }
    @{ page = "Rage Impeded";            want = "Raging won't grant extra damage";                          why = "l'armure lourde annule les degats de Rage" }
    @{ page = "Savage Attacker";         want = "you roll your damage dice twice and use the highest result"; why = "le meilleur de deux jets" }
    @{ page = "Savage Attacker";         want = "Great Weapon Fighting is applied before selecting the highest"; why = "l'ordre des deux relances" }
    @{ page = "Great Weapon Fighting";   want = "you roll a 1 or 2 on a damage die";                        why = "relance des 1 et des 2" }
    @{ page = "Great Weapon Fighting";   want = "added damage dice from sources like Superiority Die";      why = "s'applique aux des ajoutes, contrairement a la 5e" }
    @{ page = "Divine Smite";            want = "capped to 5d8";                                            why = "plafond a 5d8" }
    @{ page = "Duelling";                want = "you deal an additional 2 damage with that weapon";         why = "+2 en une main" }
    @{ page = "Duelling";                want = "carry a shield in your free hand";                         why = "un bouclier ne gene pas" }
    @{ page = "Two-Weapon Fighting";     want = "add your Ability Score Modifier to the damage";            why = "le modificateur revient sur la main gauche" }
    @{ page = "Extra Attack";            want = "Class level 5";                                            why = "attaque supplementaire au niveau 5" }
    @{ page = "Improved Extra Attack";   want = "two additional attacks";                                   why = "trois attaques, guerrier 11" }
    @{ page = "High Ground Rules";       want = 'a +2 "High Ground" bonus to attack rolls';                 why = "+2 en hauteur" }
    @{ page = "High Ground Rules";       want = "Sharpshooter feat removes the low ground penalty";         why = "Sharpshooter annule le malus, a distance" }
    @{ page = "Wet (Condition)";         want = "resistances negated instead of becoming vulnerable";       why = "Wet annule une resistance au lieu de doubler" }
    @{ page = "Resistant";               want = "halved (rounded down)";                                    why = "resistance : moitie, arrondie vers le bas" }
    @{ page = "Resistant";               want = "Neither vulnerability or resistance affect immunity";      why = "l'immunite l'emporte" }
    @{ page = "Dice rolls";              want = "most saving throws are not guaranteed to fail or succeed"; why = "pas de 20 naturel automatique sur une sauvegarde" }
    @{ page = "Dice rolls";              want = "8 + proficiency bonus + spellcasting ability modifier";    why = "formule du DD de sort" }
    @{ page = "Sneak Attack (Melee)";    want = "Deal an extra 1d6 damage to a foe you have Advantage against"; why = "Sneak Attack exige l'avantage" }
    @{ page = "Sneak Attack (Melee)";    want = "ally within 1.5 m (5 ft) of the target and you don't have Disadvantage"; why = "ou un allie au contact, sans desavantage" }
)

$problems = @()
$pages = @{}
foreach ($r in $rules) {
    if (-not $pages.ContainsKey($r.page)) { $pages[$r.page] = Get-Rules $r.page }
    $text = $pages[$r.page]
    # On compare sur du texte normalise : le wiki insere des espaces insecables et
    # des icones au milieu de ses phrases.
    $needle = ($r.want -replace '\s+', ' ')
    if ($text -notlike "*$needle*") {
        $problems += "[$($r.page)] introuvable : `"$($r.want)`"  ($($r.why))"
    }
}

# Et le bonus de maitrise, qui n'est pas une phrase mais une colonne : la formule
# du code doit rendre la colonne de CHAQUE classe.
$classes = Get-Content (Join-Path $root "data\classes.json") -Raw -Encoding utf8 | ConvertFrom-Json
foreach ($c in $classes) {
    $file = Join-Path $root "cache\class-$($c.id).html"
    if (-not (Test-Path $file)) { continue }
    $m = [regex]::Match((Get-Content $file -Raw -Encoding utf8), '(?si)id="Class_progression".*?(<table.*?</table>)')
    if (-not $m.Success) { continue }
    $t = Read-WikiTable $m.Groups[1].Value
    $pc = Find-WikiColumn $t "Proficiency Bonus"
    if ($pc -lt 0) { continue }
    foreach ($row in $t.body) {
        $lm = [regex]::Match([string]$row.cells[0], '^(\d+)')
        if (-not $lm.Success) { continue }
        $lv = [int]$lm.Groups[1].Value
        $wiki = [int](([string]$row.cells[$pc]) -replace '[^\d]', '')
        $mine = 2 + [Math]::Floor(($lv - 1) / 4)
        if ($wiki -ne $mine) { $problems += "[$($c.id)] niveau $lv : maitrise wiki +$wiki, formule +$mine" }
    }
}

Write-Host "$($rules.Count) regles de combat relues sur $($pages.Count) pages, plus le bonus de maitrise des 12 classes."
if ($problems.Count -eq 0) { Write-Host "Tout concorde." -ForegroundColor Green }
else {
    $problems | ForEach-Object { Write-Host $_ -ForegroundColor Yellow }
    exit 1
}
