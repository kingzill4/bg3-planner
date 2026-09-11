# Recupere les regles de classe depuis bg3.wiki : PV, maitrises, sauvegardes,
# competences, caracteristique d'incantation.
# Objectif : ne plus dependre de regles D&D 5e memorisees, mais des valeurs BG3.
#
# Usage: pwsh -File scripts/scrape-classes.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot "wiki-table.ps1")
$cacheDir = Join-Path $root "cache"
$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

$classes = @("Barbarian","Bard","Cleric","Druid","Fighter","Monk",
             "Paladin","Ranger","Rogue","Sorcerer","Warlock","Wizard")

function Strip-Html([string]$s) {
    if (-not $s) { return "" }
    $s = [regex]::Replace($s, '(?s)<!--.*?-->', '')
    $s = [regex]::Replace($s, '(?s)<style.*?</style>', '')
    $s = [regex]::Replace($s, '(?s)<script.*?</script>', '')
    $s = [regex]::Replace($s, '<[^>]+>', ' ')
    $s = [System.Net.WebUtility]::HtmlDecode($s)
    $s = $s -replace ' ', ' ' -replace '[​⁠﻿]', ''
    return ([regex]::Replace($s, '\s+', ' ')).Trim()
}

$ALL_SKILLS = @("Acrobatics","Animal Handling","Arcana","Athletics","Deception","History",
                "Insight","Intimidation","Investigation","Medicine","Nature","Perception",
                "Performance","Persuasion","Religion","Sleight of Hand","Stealth","Survival")
$ABILITY_WORDS = @{ "Strength"="str"; "Dexterity"="dex"; "Constitution"="con"
                    "Intelligence"="int"; "Wisdom"="wis"; "Charisma"="cha" }

$results = @()
foreach ($name in $classes) {
    $key = $name.ToLower()
    $file = Join-Path $cacheDir "class-$key.html"
    if (Test-Path $file) {
        $html = Get-Content $file -Raw -Encoding utf8
    } else {
        $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/$name" -UserAgent $UA -TimeoutSec 30).Content
        Set-Content $file -Value $html -Encoding utf8
        Start-Sleep -Milliseconds 300
    }
    $text = Strip-Html $html

    # on ancre sur les identifiants de section : le texte brut fait d'abord
    # remonter le sommaire, et les libelles varient d'une page a l'autre
    function Get-SectionText([string]$rawHtml, [string]$id) {
        $m = [regex]::Match($rawHtml, '(?s)id="' + [regex]::Escape($id) + '".*?</h[234]>(?<b>.*?)(?=<h2)')
        if ($m.Success) { return Strip-Html $m.Groups['b'].Value }
        return ""
    }

    # --- points de vie : "At Level 1: 10 + Constitution Modifier / On level up: 6 + ..."
    $attrs = Get-SectionText $html "Attributes"
    if (-not $attrs) { $attrs = $text }
    # la casse et la formulation varient d'une page a l'autre
    $hp1 = $null; $hpUp = $null
    $m = [regex]::Match($attrs, '(?i)At level 1:\s*(\d+)')
    if ($m.Success) { $hp1 = [int]$m.Groups[1].Value }
    $m = [regex]::Match($attrs, '(?i)On level up:\s*(\d+)')
    if ($m.Success) { $hpUp = [int]$m.Groups[1].Value }

    # --- caracteristique d'incantation, uniquement depuis la section Attributes.
    # "Spellcasting ability" suivi immediatement de la carac ; les mentions de
    # sous-classe (Eldritch Knight, Arcane Trickster) sont formulees autrement.
    # Chez les non-lanceurs, cette ligne dit "X for the effective use of items,
    # scrolls and equipment" : c'est l'usage de parchemins, pas l'incantation de classe.
    $spellAbility = $null
    $m = [regex]::Match($attrs, '(?i)Spellcasting ability\s+(?<a>Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\b(?<after>.{0,40})')
    if ($m.Success -and $m.Groups['after'].Value -notmatch '(?i)effective use of') {
        $spellAbility = $ABILITY_WORDS[$m.Groups['a'].Value]
    }

    # --- maitrises de depart, puis maitrises multiclasse (le wiki les distingue)
    $profAll = Get-SectionText $html "Starting_Proficiencies"
    $profSection = $profAll
    $multiSection = ""
    $mi = $profAll.IndexOf("Multiclass Proficiencies")
    if ($mi -ge 0) {
        $profSection = $profAll.Substring(0, $mi)
        $multiSection = $profAll.Substring($mi)
    }

    # sauvegardes
    $saves = @()
    $sm = [regex]::Match($profSection, '(?i)Saving throw proficiencies\s+(?<s>.{0,90}?)(?:Equipment|Skill|Armour|Weapon)', 'IgnoreCase')
    if ($sm.Success) {
        foreach ($k in $ABILITY_WORDS.Keys) {
            if ($sm.Groups['s'].Value -match "\b$k\b") { $saves += $ABILITY_WORDS[$k] }
        }
    }

    # equipement : borne a la sous-section pour eviter l'equipement de depart
    $equip = ""
    $em = [regex]::Match($profSection, '(?is)Equipment proficiencies(?<e>.{0,400}?)(?:Skills? (?:proficiencies|with proficiency)|Starting equipment|$)')
    if ($em.Success) { $equip = $em.Groups['e'].Value }

    # les memes categories, mais telles que le jeu les accorde en multiclassant
    $mcArmour = @(); $mcWeapons = @(); $mcExceptions = @()
    if ($multiSection) {
        $mcEquip = ""
        $mm = [regex]::Match($multiSection, '(?is)Equipment proficiencies(?<e>.{0,400}?)(?:Skill|Starting Equipment|$)')
        if ($mm.Success) { $mcEquip = $mm.Groups['e'].Value }
        foreach ($a in @("Light armour","Medium armour","Heavy armour","Shields")) {
            if ($mcEquip -match [regex]::Escape($a)) { $mcArmour += ($a -replace 'armour', 'Armour') }
        }
        if ($mcEquip -match 'Simple weapons') { $mcWeapons += "simple" }
        if ($mcEquip -match 'Martial weapons') { $mcWeapons += "martial" }
        foreach ($w in @("Hand Crossbows","Longswords","Rapiers","Shortswords","Daggers","Darts",
                         "Slings","Quarterstaves","Light Crossbows","Clubs","Javelins","Maces",
                         "Scimitars","Sickles","Spears","Greatclubs","Handaxes","Light Hammers","Flails","Morningstars","Warhammers","Battleaxes","Shortbows","Longbows","Tridents","Pikes","Halberds","Glaives")) {
            if ($mcEquip -match [regex]::Escape($w)) {
                $mcExceptions += $(if ($w -eq "Quarterstaves") { "Quarterstaff" } else { $w -replace 's$', '' })
            }
        }
    }

    $armour = @()
    foreach ($a in @("Light armour","Medium armour","Heavy armour","Shields")) {
        if ($equip -match [regex]::Escape($a)) {
            $armour += ($a -replace 'armour', 'Armour')
        }
    }
    $weapons = @()
    if ($equip -match 'Simple weapons') { $weapons += "simple" }
    if ($equip -match 'Martial weapons') { $weapons += "martial" }

    # armes nommees (Bard, Rogue, Monk, Druid, Sorcerer, Wizard...)
    $weaponExceptions = @()
    foreach ($w in @("Hand Crossbows","Longswords","Rapiers","Shortswords","Daggers","Darts",
                     "Slings","Quarterstaves","Light Crossbows","Clubs","Javelins","Maces",
                     "Scimitars","Sickles","Spears","Greatclubs","Handaxes","Light Hammers","Flails","Morningstars","Warhammers","Battleaxes","Shortbows","Longbows","Tridents","Pikes","Halberds","Glaives")) {
        if ($equip -match [regex]::Escape($w)) {
            $singular = switch ($w) {
                "Quarterstaves" { "Quarterstaff" }
                default { $w -replace 's$', '' }
            }
            $weaponExceptions += $singular
        }
    }

    # competences : "Skill proficiencies (Choose 2) Acrobatics, ..."
    $skillPicks = 2
    $skillList = @()
    $skm = [regex]::Match($profSection, '(?is)Skills? (?:proficiencies|with proficiency)\s*\(Choose (?<n>\d)\)(?<list>.{0,400})')
    if ($skm.Success) {
        $skillPicks = [int]$skm.Groups['n'].Value
        foreach ($s in $ALL_SKILLS) {
            if ($skm.Groups['list'].Value -match [regex]::Escape($s)) { $skillList += $s }
        }
    }

    # La table de progression donne, niveau par niveau, ce que la classe accorde.
    # Sans elle un planificateur ne peut pas montrer le chemin : on choisit "niveau
    # 12" sans jamais voir ce qu'on gagne en route, ni ce qu'un split multiclasse
    # retarde. Les cellules vides heritent du niveau precedent (le bonus de maitrise
    # n'est repete que lorsqu'il change).
    # On lit la colonne par son intitule, pas par sa position. "La derniere colonne
    # non vide" marchait pour le barbare, dont le tableau s'arrete a Rage Damage,
    # et se trompait partout ailleurs : le barde ressortait sans une seule capacite
    # (la derniere colonne est son nombre d'emplacements de sorts), le moine avec
    # "+ 3 m / 10 ft" au niveau 2 et "1d6" au niveau 3 — sa vitesse et son de
    # d'arts martiaux au lieu de ses capacites.
    $progression = @()
    $tblM = [regex]::Match($html, '(?si)id="Class_progression".*?(<table.*?</table>)')
    if (-not $tblM.Success) { $tblM = [regex]::Match($html, '(?s)(<table[^>]*wikitable.*?</table>)') }
    if ($tblM.Success) {
        $table = Read-WikiTable $tblM.Groups[1].Value
        $featCol = Find-WikiColumn $table "Features"
        if ($featCol -lt 0) { Write-Warning "$name : pas de colonne Features" }
        else {
            foreach ($row in $table.body) {
                $lvlM = [regex]::Match([string]$row.cells[0], '^(?<n>\d+)(?:st|nd|rd|th)$')
                if (-not $lvlM.Success) { continue }
                $features = [string]$row.cells[$featCol]
                # "-" est la facon dont le wiki ecrit "rien a ce niveau".
                if (-not $features -or $features -eq "-") { $features = "" }
                $progression += [PSCustomObject]@{
                    level = [int]$lvlM.Groups['n'].Value
                    features = @(Split-WikiFeatures $features)
                }
            }
        }
    }

    $results += [PSCustomObject]@{
        id = $key; name = $name
        hpLevel1 = $hp1; hpOnLevelUp = $hpUp
        spellAbility = $spellAbility
        saves = $saves
        armour = $armour
        weapons = $weapons
        weaponExceptions = $weaponExceptions
        skillPicks = $skillPicks
        progression = $progression
        skills = $skillList
        multiclass = [PSCustomObject]@{
            armour = $mcArmour; weapons = $mcWeapons; weaponExceptions = $mcExceptions
        }
        wiki = "https://bg3.wiki/wiki/$name"
    }
    Write-Host ("  {0,-10} hp {1,2}/{2}  spell:{3,-4} saves:{4,-8} arm:[{5}] wpn:[{6}] skills:{7}  MC:[{8}|{9}]" -f `
        $name, $hp1, $hpUp, $spellAbility, ($saves -join ","), ($armour -join ","), `
        ($weapons -join ","), $skillPicks, ($mcArmour -join ","), ($mcWeapons -join ","))
}

$results | ConvertTo-Json -Depth 8 | Set-Content (Join-Path $root "data\classes.json") -Encoding utf8
Write-Host "`n$($results.Count) classes -> data\classes.json"
