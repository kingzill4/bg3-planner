# Recupere les sous-classes depuis bg3.wiki, en ecartant celles qui ne sont pas
# implementees dans le jeu (le wiki documente aussi du contenu 5e absent de BG3).
#
# Usage: pwsh -File scripts/scrape-subclasses.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$cacheDir = Join-Path $root "cache"
$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

$names = Get-Content (Join-Path $PSScriptRoot "subclass-list.txt") | Where-Object { $_.Trim() }

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

$CLASS_NAMES = @("Barbarian","Bard","Cleric","Druid","Fighter","Monk",
                 "Paladin","Ranger","Rogue","Sorcerer","Warlock","Wizard")

$results = @()
$skipped = @()
foreach ($name in $names) {
    $slug = ($name -replace "'", "%27" -replace " ", "_")
    $key = ($name.ToLower() -replace "[^a-z0-9]+", "-").Trim("-")
    $file = Join-Path $cacheDir "subclass-$key.html"
    if (Test-Path $file) {
        $html = Get-Content $file -Raw -Encoding utf8
    } else {
        try {
            $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/$slug" -UserAgent $UA -TimeoutSec 30).Content
            Set-Content $file -Value $html -Encoding utf8
            Start-Sleep -Milliseconds 250
        } catch { $skipped += "$name (fetch failed)"; continue }
    }

    $text = Strip-Html $html
    if ($text -match 'does not appear in normal gameplay') {
        $skipped += "$name (not in game)"
        continue
    }

    # nom d'affichage sans le desambiguisateur du wiki
    $display = ($name -replace '\s*\((barbarian|sorcerer|wizard|fighter|rogue) subclass\)\s*$', '').Trim()

    # classe parente : le desambiguisateur fait foi, sinon "subclasses of X" dans le chapeau
    $parent = $null
    if ($name -match '\((?<c>barbarian|sorcerer|wizard|fighter|rogue) subclass\)') {
        $parent = (Get-Culture).TextInfo.ToTitleCase($Matches['c'])
    } else {
        $m = [regex]::Match($text, 'subclass(?:es)? of (?:the )?(?<c>' + ($CLASS_NAMES -join '|') + ')')
        if ($m.Success) { $parent = $m.Groups['c'].Value }
    }
    if (-not $parent) {
        $intro = $text.Substring(0, [Math]::Min(600, $text.Length))
        foreach ($c in $CLASS_NAMES) { if ($intro -match "\b$c\b") { $parent = $c; break } }
    }
    if (-not $parent) { $skipped += "$name (no parent class)"; continue }

    # patch d'introduction, utile pour savoir si c'est du contenu recent
    $patch = $null
    $pm = [regex]::Match($text, 'Released as part of (Patch \d+)')
    if ($pm.Success) { $patch = $pm.Groups[1].Value }

    # description : premier paragraphe utile
    $desc = $null
    $bodyStart = [regex]::Match($html, '(?s)<div class="mw-content-ltr mw-parser-output".*')
    if ($bodyStart.Success) {
        foreach ($p in [regex]::Matches($bodyStart.Value, '(?s)<p(?![^>]*mw-empty-elt)[^>]*>(?<t>.*?)</p>')) {
            $t = Strip-Html $p.Groups['t'].Value
            if ($t.Length -gt 50 -and $t -notmatch 'This article is about') { $desc = $t; break }
        }
    }
    if ($desc -and $desc.Length -gt 240) { $desc = $desc.Substring(0, 237).TrimEnd() + "..." }

    # certaines sous-classes accordent des maitrises (Hexblade, College of Valour,
    # Bladesinging...) : c'est la partie mecanique que l'outil sait exploiter
    $grants = ([regex]::Matches($text, '(?i)gain(?:s)? proficienc(?:y|ies)[^.]{0,200}') |
               ForEach-Object { $_.Value }) -join " | "
    $subArmour = @()
    foreach ($a in @("Light armour","Medium armour","Heavy armour","Shields")) {
        if ($grants -match [regex]::Escape($a)) { $subArmour += ($a -replace 'armour', 'Armour') }
    }
    $subWeapons = @()
    if ($grants -match '(?i)Simple weapons') { $subWeapons += "simple" }
    if ($grants -match '(?i)Martial weapons') { $subWeapons += "martial" }
    if ($grants -match '(?i)all weapon proficiencies') { $subWeapons += "simple"; $subWeapons += "martial" }

    # Arcane Trickster et Eldritch Knight lancent des sorts alors que leur classe
    # de base n'en lance pas : la sous-classe porte sa propre caracteristique
    $subSpellAbility = $null
    $sa = [regex]::Match($text, '(?i)Spellcasting Ability\s+(?<a>Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\b(?<after>.{0,40})')
    if ($sa.Success -and $sa.Groups['after'].Value -notmatch '(?i)effective use of') {
        $subSpellAbility = @{ "Strength"="str"; "Dexterity"="dex"; "Constitution"="con"
                              "Intelligence"="int"; "Wisdom"="wis"; "Charisma"="cha" }[$sa.Groups['a'].Value]
    }

    # Les capacites de la sous-classe, rangees par niveau. La page les presente en
    # sections "Level N" contenant des listes de definition <dt>nom</dt><dd>texte</dd>.
    # Sans elles, une sous-classe n'etait qu'un libelle : Battle Master sans ses
    # manoeuvres, Thief sans sa seconde action bonus.
    $features = @()
    $sf = [regex]::Match($html, '(?s)id="Subclass_features".*?(?=<h2)')
    if ($sf.Success) {
        $body = $sf.Value
        # decouper aux titres de niveau ; ce qui precede le premier reste "niveau 1"
        $levelMarks = [regex]::Matches($body, '<h3[^>]*>\s*<span[^>]*id="Level_(?<lv>\d+)"')
        $segments = @()
        if ($levelMarks.Count -eq 0) {
            $segments += [PSCustomObject]@{ level = $null; html = $body }
        } else {
            for ($i = 0; $i -lt $levelMarks.Count; $i++) {
                $start = $levelMarks[$i].Index
                $end = if ($i + 1 -lt $levelMarks.Count) { $levelMarks[$i + 1].Index } else { $body.Length }
                $segments += [PSCustomObject]@{
                    level = [int]$levelMarks[$i].Groups['lv'].Value
                    html  = $body.Substring($start, $end - $start)
                }
            }
        }
        foreach ($seg in $segments) {
            foreach ($m in [regex]::Matches($seg.html, '(?s)<dt[^>]*>(?<n>.*?)</dt>\s*<dd[^>]*>(?<d>.*?)</dd>')) {
                $n = Strip-Html $m.Groups['n'].Value
                $d = Strip-Html $m.Groups['d'].Value
                if (-not $n -or $n.Length -gt 70) { continue }
                $features += [PSCustomObject]@{ level = $seg.level; n = $n; d = $d }
            }
        }
    }

    # Certaines sous-classes demandent un choix supplementaire dont tout depend :
    # l'ancetre draconique fixe le type de degat ET donne un sort, le Bestial Heart
    # d'un Wildheart change ses capacites. Le wiki les presente en tableau titre
    # "X (Choose N)" : on les lit pour que l'outil puisse les proposer.
    $choices = @()
    # Deux formulations : "Draconic Ancestry (Choose 1)" et "Choose a Bestial Heart from
    # the table below". Les deux precedent le tableau des options.
    $choicePattern = '(?s)(?:(?<label>[A-Z][A-Za-z '' ]{2,40}?)\s*\(Choose (?<n>\d+)\)' +
                     '|Choose (?<n2>\d+|a|an) (?<label2>[A-Za-z'' ]{2,40}?)(?: from the table below| of the following)?[:.]?)' +
                     '(?<after>.{0,600}?)(?<table><table.*?</table>)'
    foreach ($cm in [regex]::Matches($html, $choicePattern)) {
        $raw = if ($cm.Groups['label'].Success -and $cm.Groups['label'].Value) { $cm.Groups['label'].Value } else { $cm.Groups['label2'].Value }
        $label = ([regex]::Replace($raw, '<[^>]+>', '')).Trim()
        $count = if ($cm.Groups['n'].Success -and $cm.Groups['n'].Value) { [int]$cm.Groups['n'].Value }
                 elseif ($cm.Groups['n2'].Value -match '^\d+$') { [int]$cm.Groups['n2'].Value } else { 1 }
        $tbl = $cm.Groups['table'].Value
        $rows = [regex]::Matches($tbl, '(?s)<tr[^>]*>(?<r>.*?)</tr>')
        if ($rows.Count -lt 2) { continue }

        # la premiere ligne donne les en-tetes, qui nomment ce que chaque colonne porte
        $headers = @()
        foreach ($c in [regex]::Matches($rows[0].Groups['r'].Value, '(?s)<t[hd][^>]*>(?<c>.*?)</t[hd]>')) {
            $headers += Strip-Html $c.Groups['c'].Value
        }
        # Le libelle tire de la phrase est souvent tronque ("Choose a Bestial Heart from
        # the table below"). La premiere en-tete du tableau nomme exactement le choix.
        if ($headers.Count -and $headers[0] -and $headers[0].Length -le 40) { $label = $headers[0] }
        if (-not $label -or $label.Length -gt 40 -or $label.Length -lt 3) { continue }

        $opts = @()
        for ($i = 1; $i -lt $rows.Count; $i++) {
            $cells = @()
            foreach ($c in [regex]::Matches($rows[$i].Groups['r'].Value, '(?s)<t[hd][^>]*>(?<c>.*?)</t[hd]>')) {
                $cells += Strip-Html $c.Groups['c'].Value
            }
            if (-not $cells.Count -or -not $cells[0]) { continue }
            $fields = [ordered]@{}
            for ($k = 1; $k -lt $cells.Count -and $k -lt $headers.Count; $k++) {
                if ($cells[$k]) { $fields[$headers[$k]] = $cells[$k] }
            }
            $opts += [PSCustomObject]@{ n = $cells[0]; fields = $fields }
        }
        if ($opts.Count) {
            $choices += [PSCustomObject]@{ label = $label; count = $count; options = $opts }
        }
    }

    $results += [PSCustomObject]@{
        id = $key
        name = $display
        class = $parent
        desc = $desc
        patch = $patch
        armour = $subArmour
        weapons = ($subWeapons | Select-Object -Unique)
        spellAbility = $subSpellAbility
        features = $features
        choices = $choices
        wiki = "https://bg3.wiki/wiki/$slug"
    }
}

$results = $results | Sort-Object class, name
$results | ConvertTo-Json -Depth 8 | Set-Content (Join-Path $root "data\subclasses.json") -Encoding utf8

Write-Host "Retenues : $($results.Count)"
$results | Group-Object class | ForEach-Object { "  {0,-10} {1}" -f $_.Name, (($_.Group | ForEach-Object { $_.name }) -join ", ") }
Write-Host "`nEcartees : $($skipped.Count)"
$skipped | ForEach-Object { "  $_" }
