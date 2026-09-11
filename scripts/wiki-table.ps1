# Lecture d'un tableau du wiki en grille.
#
# Un tableau de progression ne se lit pas cellule par cellule : le wiki met une
# legende en premiere ligne d'entete, empile deux niveaux d'entete ("Spell Slots
# per Spell Level" au-dessus de "1st 2nd 3rd"), fusionne des lignes avec rowspan
# et des colonnes avec colspan. Lu naivement, la colonne "Features" d'un moine
# rendait sa progression de degats et celle d'un voleur ses des de Sneak Attack.
# On reconstruit donc la grille avant de chercher quoi que ce soit dedans.
#
# Dot-source : . "$PSScriptRoot\wiki-table.ps1"

function ConvertTo-PlainText([string]$s) {
    if (-not $s) { return "" }
    $s = [regex]::Replace($s, '(?s)<!--.*?-->', '')
    $s = [regex]::Replace($s, '(?s)<style.*?</style>', '')
    $s = [regex]::Replace($s, '(?s)<script.*?</script>', '')
    $s = [regex]::Replace($s, '<[^>]+>', ' ')
    $s = [System.Net.WebUtility]::HtmlDecode($s)
    $s = $s -replace ' ', ' ' -replace '[​⁠﻿]', ''
    $s = [regex]::Replace($s, '\s+', ' ')
    $s = [regex]::Replace($s, '\s+([,.;:])', '$1')
    return $s.Trim()
}

function Read-WikiTable {
    param([Parameter(Mandatory)][string]$Html)

    $rows = @()
    $pending = @{}      # colonne -> @{ text; left }  (rowspan en cours)

    foreach ($tr in [regex]::Matches($Html, '(?s)<tr[^>]*>(?<r>.*?)</tr>')) {
        $row = @{}
        $isHead = $true
        $col = 0
        # Un rowspan ouvert sur CETTE ligne vaut aussi pour les suivantes : si on
        # le decompte des la fin de la ligne qui l'ouvre, il disparait avant
        # d'avoir servi, et toutes les colonnes en dessous glissent d'un cran.
        $addedHere = @{}
        foreach ($cell in [regex]::Matches($tr.Groups['r'].Value,
                 '(?s)<(?<tag>td|th)(?<attrs>[^>]*)>(?<c>.*?)</(?:td|th)>')) {
            # d'abord les colonnes encore occupees par un rowspan plus haut
            while ($pending.ContainsKey($col) -and $pending[$col].left -gt 0) {
                $row[$col] = $pending[$col].text
                $col++
            }
            if ($cell.Groups['tag'].Value -ne 'th') { $isHead = $false }
            $text = ConvertTo-PlainText $cell.Groups['c'].Value
            $attrs = $cell.Groups['attrs'].Value
            $cs = 1; $rs = 1
            $m = [regex]::Match($attrs, 'colspan\s*=\s*"?(\d+)'); if ($m.Success) { $cs = [int]$m.Groups[1].Value }
            $m = [regex]::Match($attrs, 'rowspan\s*=\s*"?(\d+)'); if ($m.Success) { $rs = [int]$m.Groups[1].Value }
            for ($k = 0; $k -lt $cs; $k++) {
                $row[$col] = $text
                if ($rs -gt 1) { $pending[$col] = @{ text = $text; left = $rs - 1 }; $addedHere[$col] = $true }
                $col++
            }
        }
        while ($pending.ContainsKey($col) -and $pending[$col].left -gt 0) {
            $row[$col] = $pending[$col].text
            $col++
        }
        foreach ($k in @($pending.Keys)) {
            if ($addedHere.ContainsKey($k)) { continue }
            $pending[$k].left--
            if ($pending[$k].left -le 0) { $pending.Remove($k) }
        }
        if ($row.Count) { $rows += , [PSCustomObject]@{ cells = $row; head = $isHead } }
    }

    # Les lignes d'entete du haut se superposent : "Spell Slots per Spell Level"
    # coiffe "1st 2nd 3rd". On empile leurs libelles par colonne pour qu'une
    # colonne se reconnaisse a son intitule complet.
    $headers = @{}
    $firstBody = 0
    foreach ($r in $rows) {
        if (-not $r.head) { break }
        foreach ($c in $r.cells.Keys) {
            $t = $r.cells[$c]
            if (-not $t) { continue }
            if ($headers.ContainsKey($c) -and $headers[$c] -ne $t) { $headers[$c] = $headers[$c] + " " + $t }
            elseif (-not $headers.ContainsKey($c)) { $headers[$c] = $t }
        }
        $firstBody++
    }

    [PSCustomObject]@{
        headers = $headers
        body = @($rows | Select-Object -Skip $firstBody)
    }
}

# "Rage, Unarmoured Defence" -> deux entrees. Le wiki separe par des virgules,
# mais "Bardic Inspiration (d6)" en contient une qui n'est pas un separateur : on
# ne coupe que sur les virgules hors parentheses.
function Split-WikiFeatures {
    param([string]$Text)
    if (-not $Text -or $Text -eq "-") { return @() }
    $out = @(); $buf = ""; $depth = 0
    foreach ($ch in $Text.ToCharArray()) {
        if ($ch -eq '(') { $depth++ }
        elseif ($ch -eq ')') { $depth-- }
        if ($ch -eq ',' -and $depth -le 0) { $out += $buf; $buf = "" } else { $buf += $ch }
    }
    $out += $buf
    @($out | ForEach-Object { ($_ -replace '\(\s+', '(' -replace '\s+\)', ')').Trim() } | Where-Object { $_ })
}

# Index de la colonne dont l'intitule contient $Name (insensible a la casse).
function Find-WikiColumn {
    param([Parameter(Mandatory)]$Table, [Parameter(Mandatory)][string]$Name)
    foreach ($c in ($Table.headers.Keys | Sort-Object)) {
        if ($Table.headers[$c] -match [regex]::Escape($Name)) { return [int]$c }
    }
    return -1
}
