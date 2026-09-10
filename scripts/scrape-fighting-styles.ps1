# Recupere les styles de combat depuis bg3.wiki.
#
# Chaque style a sa propre page, avec sa description exacte et une section
# "How to learn" qui donne la classe ET le niveau ou elle l'obtient. C'est plus
# fiable que le tableau recapitulatif de la page Fighting Style, dont les colonnes
# ne survivent pas a une mise a plat du HTML.
#
# Usage: pwsh -File scripts/scrape-fighting-styles.ps1 [-Refresh]
param([switch]$Refresh)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$cacheDir = Join-Path $root "cache\styles"
if (-not (Test-Path $cacheDir)) { New-Item -ItemType Directory -Path $cacheDir -Force | Out-Null }
$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

$styles = @("Archery", "Defence", "Duelling", "Great Weapon Fighting",
            "Protection", "Two-Weapon Fighting")

function Strip-Html([string]$s) {
    if (-not $s) { return "" }
    $s = [regex]::Replace($s, '(?s)<!--.*?-->', '')
    $s = [regex]::Replace($s, '(?s)<style.*?</style>', '')
    $s = [regex]::Replace($s, '(?s)<script.*?</script>', '')
    $s = [regex]::Replace($s, '<[^>]+>', ' ')
    $s = [System.Net.WebUtility]::HtmlDecode($s)
    $s = $s -replace ' ', ' ' -replace '[​⁠﻿]', ''
    $s = [regex]::Replace($s, '\[\s*edit section[^\]]*\]', '')
    $s = [regex]::Replace($s, '\[\d+\]', '')
    return ([regex]::Replace($s, '\s+', ' ')).Trim()
}

function Get-Section([string]$html, [string]$id) {
    $m = [regex]::Match($html, '(?s)id="' + [regex]::Escape($id) + '".*?</h[23]>(?<body>.*?)(?=<h2|<div class="printfooter")')
    if ($m.Success) { return $m.Groups['body'].Value }
    return ""
}


# La page de chaque style omet parfois une source que le tableau recapitulatif de
# la page "Fighting Style" liste (Archery ne mentionne pas Champion niveau 10).
# On croise les deux et on prend l'union.
function Get-StyleMatrix($cacheDir, $UA) {
    $file = Join-Path $cacheDir "_matrix.html"
    if (Test-Path $file) {
        $html = Get-Content $file -Raw -Encoding utf8
    } else {
        $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/Fighting_Style" -UserAgent $UA -TimeoutSec 30).Content
        Set-Content $file -Value $html -Encoding utf8
        Start-Sleep -Milliseconds 250
    }
    # colonnes du tableau, dans l'ordre, avec le niveau donne par l'en-tete groupe
    $columns = @(
        [PSCustomObject]@{ source = "Fighter";           level = 1  },
        [PSCustomObject]@{ source = "Paladin";           level = 2  },
        [PSCustomObject]@{ source = "Ranger";            level = 2  },
        [PSCustomObject]@{ source = "College of Swords"; level = 3  },
        [PSCustomObject]@{ source = "Champion";          level = 10 }
    )
    $table = [regex]::Match($html, '(?s)<table[^>]*wikitable.*?</table>').Value
    $map = @{}
    foreach ($row in [regex]::Matches($table, '(?s)<tr[^>]*>(?<r>.*?)</tr>')) {
        $r = $row.Groups['r'].Value
        $th = [regex]::Match($r, '(?s)<th[^>]*>(?<t>.*?)</th>')
        if (-not $th.Success) { continue }
        $styleName = [regex]::Replace([System.Net.WebUtility]::HtmlDecode(($th.Groups['t'].Value -replace '<[^>]+>', ' ')), '\s+', ' ').Trim()
        $cells = [regex]::Matches($r, '(?s)<td[^>]*>(?<t>.*?)</td>')
        if ($cells.Count -lt 5) { continue }
        $hits = @()
        for ($i = 0; $i -lt 5; $i++) {
            if ($cells[$i].Groups['t'].Value -match '✓|check|Yes') { $hits += $columns[$i] }
        }
        if ($hits.Count) { $map[$styleName] = $hits }
    }
    return $map
}
$matrix = Get-StyleMatrix $cacheDir $UA
$results = @()
foreach ($name in $styles) {
    $slug = ($name -replace " ", "_")
    $key = ($name.ToLower() -replace "[^a-z0-9]+", "-").Trim("-")
    $file = Join-Path $cacheDir "$key.html"
    if ((-not $Refresh) -and (Test-Path $file)) {
        $html = Get-Content $file -Raw -Encoding utf8
    } else {
        $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/$slug" -UserAgent $UA -TimeoutSec 30).Content
        Set-Content $file -Value $html -Encoding utf8
        Start-Sleep -Milliseconds 250
    }

    $desc = Strip-Html (Get-Section $html "Description")

    # Les notes portent les precisions qui changent le calcul : "This also applies
    # to Versatile weapons when off-hand is empty", "You can carry a shield...".
    $notes = @()
    $noteHtml = Get-Section $html "Notes"
    foreach ($li in [regex]::Matches($noteHtml, '(?s)<li[^>]*>(?<t>.*?)</li>')) {
        $t = Strip-Html $li.Groups['t'].Value
        if ($t.Length -gt 15) { $notes += $t }
    }
    # certaines precisions vivent dans la Description plutot que dans les Notes
    $descBlock = Strip-Html (Get-Section $html "Description")

    # "Class level 1: Fighter" / "Class level 2: Ranger and Paladin"
    $learn = Strip-Html (Get-Section $html "How_to_learn")
    $available = @()
    foreach ($lm in [regex]::Matches($learn, 'Class level (?<lv>\d+):\s*(?<who>[A-Za-z, ]+?)(?=\s*Class level|\s*Used by|\s*Subclasses|$)')) {
        $lv = [int]$lm.Groups['lv'].Value
        foreach ($who in ($lm.Groups['who'].Value -split '\s*(?:,|and)\s*')) {
            $w = $who.Trim()
            if ($w) { $available += [PSCustomObject]@{ source = $w; level = $lv } }
        }
    }

    # union des deux sources, en gardant ce que la page du style omet
    foreach ($m in $matrix[$name]) {
        if (-not ($available | Where-Object { $_.source -eq $m.source })) { $available += $m }
    }
    $available = @($available | Sort-Object level, source)

    $results += [PSCustomObject]@{
        id = $key
        name = $name
        desc = $descBlock
        notes = $notes
        available = $available
        wiki = "https://bg3.wiki/wiki/$slug"
    }
    Write-Host ("  {0,-22} {1}" -f $name, (($available | ForEach-Object { "$($_.source) L$($_.level)" }) -join ", "))
}

$results | ConvertTo-Json -Depth 5 | Set-Content (Join-Path $root "data\fighting-styles.json") -Encoding utf8
Write-Host "`n$($results.Count) styles -> data\fighting-styles.json"
