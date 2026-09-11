# Recupere les regles de classe depuis bg3.wiki : PV, maitrises, sauvegardes,
# competences, caracteristique d'incantation.
# Objectif : ne plus dependre de regles D&D 5e memorisees, mais des valeurs BG3.
#
# Usage: pwsh -File scripts/scrape-classes.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot "keep-icons.ps1")
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

# Le premier vrai paragraphe de la page dediee a une capacite. Meme politesse que
# les autres scrapers : cache disque, 250 ms, User-Agent identifiable, et jamais
# rien d'autre qu'un /wiki/<Article>.
function Get-FeaturePageDescription([string]$featureName) {
    if (-not $featureName) { return $null }
    $slug = ($featureName -replace "'", "%27" -replace " ", "_")
    $key = ($featureName.ToLower() -replace "[^a-z0-9]+", "-").Trim("-")
    $file = Join-Path $cacheDir "feature-$key.html"
    if (Test-Path $file) { $h = Get-Content $file -Raw -Encoding utf8 }
    else {
        try {
            $h = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/$slug" -UserAgent $UA -TimeoutSec 30).Content
            Set-Content $file -Value $h -Encoding utf8
            Start-Sleep -Milliseconds 250
        } catch { return $null }
    }
    # Une redirection n'est pas une description. "Channel Oath" renvoie vers la page
    # des ressources, "Pact Magic" et "Expertise" vers Spells et Proficiency : en
    # prendre le premier paragraphe donnerait a une capacite le resume d'un autre
    # sujet, ce qui est pire que pas de bulle du tout.
    # On tolere la redirection qui reste sur le sujet — "Eldritch Invocations" mene
    # a "Eldritch Invocation", "Channel Oath" a "Channel Oath Charge" — et on
    # refuse celle qui change de sujet : "Expertise" mene a "Proficiency" et
    # "Pact Magic" a "Spells", deux pages qui parlent d'autre chose.
    $pn = [regex]::Match($h, '"wgPageName":"(?<p>[^"]+)"')
    if ($pn.Success) {
        $norm = { param($s) (($s -replace '%27', "'" -replace '_', ' ').ToLower() -replace 's\b', '') }
        $landed = & $norm $pn.Groups['p'].Value
        $asked = & $norm $slug
        if (-not ($landed.Contains($asked) -or $asked.Contains($landed))) { return $null }
    }

    $body = [regex]::Match($h, '(?s)<div class="mw-content-ltr mw-parser-output".*')
    if (-not $body.Success) { return $null }
    # Les encadres du wiki sont faits de <p> comme le reste. Sans les ecarter,
    # "Pact Magic" se decrivait par "Lists of spells by level All spells Cantrips
    # 1st level..." — le sommaire de la barre laterale.
    $raw = [regex]::Replace($body.Value, '(?s)<table.*?</table>', ' ')
    foreach ($marker in @('navbox', 'class="hatnote"')) {
        $at = $raw.IndexOf($marker)
        if ($at -gt 0) { $raw = $raw.Substring(0, $at) }
    }
    foreach ($p in [regex]::Matches($raw, '(?s)<p(?![^>]*mw-empty-elt)[^>]*>(?<t>.*?)</p>')) {
        $t = ConvertTo-PlainText $p.Groups['t'].Value
        if ($t.Length -lt 40) { continue }
        if ($t -match '^(This article|Redirect|For |Main article)') { continue }
        # Une description est une phrase. Une enumeration de liens n'en est pas
        # une : elle n'a ni point final ni verbe, et c'est tout ce qui la
        # distingue de loin d'un paragraphe.
        if ($t -notmatch '\.(\s|$)') { continue }
        if ($t -notmatch '(?i)\b(is|are|can|you|gain|allow|grant|when|deal|add)\b') { continue }
        if ($t.Length -gt 320) { $t = $t.Substring(0, 317).TrimEnd() + "..." }
        return $t
    }
    return $null
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
    # Le tableau de progression ne donne que des NOMS. Ce que "Wild Shape" fait,
    # la page le dit plus bas, dans "Level progression" : une liste de definition
    # par niveau, la meme structure que pour les sous-classes. Sans elle, le
    # chemin de niveaux n'etait qu'une suite d'etiquettes qu'on ne pouvait pas
    # interroger, alors que la moindre capacite de sous-classe s'ouvre au clic.
    # Une capacite y porte un texte, ou une liste d'options, ou les deux : "Wild
    # Shape" donne ses quatre formes de bete, "Spellcasting" ses emplacements de
    # sorts du niveau. Les deux valent d'etre gardes — une capacite decrite par sa
    # seule liste n'est pas une capacite sans description.
    # On retient aussi a QUEL niveau chaque description a ete lue. Une capacite qui
    # revient en montant en puissance porte le meme nom a chaque palier : le wiki
    # ecrit "Improved Bardic Inspiration" aux niveaux 5 et 10, et sans le niveau,
    # le barde de niveau 10 lisait "vos des sont maintenant des d8" sous une
    # capacite qui les passe a d10.
    $descByName = @{}
    $descByLevel = @{}
    $lpM = [regex]::Match($html, '(?si)id="Level_progression".*?(?=<h2)')
    if ($lpM.Success) {
        foreach ($seg in (Split-WikiLevels $lpM.Value)) {
            foreach ($e in (Get-FeatureEntries $seg.html)) {
                $k = $e.n.ToLower()
                if (-not $e.d -and -not $e.opts.Count) { continue }
                $info = [PSCustomObject]@{
                    d = $e.d
                    opts = @($e.opts | ForEach-Object { [PSCustomObject]@{ n = $_.n; d = $_.d } })
                }
                if (-not $descByName.ContainsKey($k)) { $descByName[$k] = $info }
                if ($null -ne $seg.level) {
                    $lk = "$($seg.level)|$k"
                    if (-not $descByLevel.ContainsKey($lk)) { $descByLevel[$lk] = $info }
                }
            }
        }
    }

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
                # Le nom reste la valeur qui fait foi — c'est lui que le tableau
                # du wiki donne, et c'est sur lui que les verificateurs comparent.
                # La description l'accompagne quand la page en fournit une.
                $named = @(Split-WikiFeatures $features)
                $detail = @()
                foreach ($f in $named) {
                    $k = $f.ToLower()
                    # "Bardic Inspiration (d6)" est decrit sous "Bardic Inspiration"
                    $alt = ($f -replace '\s*\([^)]*\)\s*$', '').ToLower()
                    # Le niveau d'abord : c'est lui qui distingue deux paliers du
                    # meme nom. Le nom seul ne sert que pour une capacite decrite
                    # une fois et acquise ailleurs.
                    $lv = [int]$lvlM.Groups['n'].Value
                    $info = $null
                    foreach ($try in @("$lv|$k", "$lv|$alt")) {
                        if ($descByLevel.ContainsKey($try)) { $info = $descByLevel[$try]; break }
                    }
                    if (-not $info) {
                        $info = if ($descByName.ContainsKey($k)) { $descByName[$k] }
                                elseif ($descByName.ContainsKey($alt)) { $descByName[$alt] }
                                else { $null }
                    }
                    # Neuf capacites ne sont pas reprises niveau par niveau sur la
                    # page de leur classe — Expertise, Pact Magic, Channel Oath. Le
                    # wiki leur consacre une page a elles : c'est la qu'on va lire,
                    # plutot que de laisser une pastille muette au milieu de
                    # quatre-vingt-onze qui parlent.
                    if (-not $info) {
                        $d = Get-FeaturePageDescription ($f -replace '\s*\([^)]*\)\s*$', '')
                        if ($d) { $info = [PSCustomObject]@{ d = $d; opts = @() } }
                    }
                    if (-not $info) { continue }
                    $entry = [ordered]@{ n = $f; d = $info.d }
                    if ($info.opts.Count) { $entry.opts = $info.opts }
                    $detail += [PSCustomObject]$entry
                }
                $row = [ordered]@{
                    level = [int]$lvlM.Groups['n'].Value
                    features = $named
                }
                if ($detail.Count) { $row.detail = $detail }
                $progression += [PSCustomObject]$row
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

$jsonPath = Join-Path $root "data\classes.json"
$results = Merge-ExistingIcons -Items $results -JsonPath $jsonPath
$results | ConvertTo-Json -Depth 8 | Set-Content (Join-Path $root "data\classes.json") -Encoding utf8
Write-Host "`n$($results.Count) classes -> data\classes.json"
