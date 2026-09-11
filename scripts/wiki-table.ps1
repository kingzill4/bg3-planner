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
    # Le wiki ecrit le cout d'une capacite en icones entre parentheses — "Frenzied
    # Strike (<img action>)". Les balises retirees, la parenthese reste vide : 131
    # des 511 capacites de sous-classe s'appelaient "Frenzied Strike ( )". On ne
    # supprime qu'une paire qui ne contient plus que de la ponctuation.
    $s = [regex]::Replace($s, '\(\s*[+\-,/&\s]*\)', '')
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

# Le wiki ne presente pas une liste plate : il IMBRIQUE. Les huit Lands d'un
# Circle of the Land sont dans une grille sous "Nth Level Circle of the Land
# Spells", les styles de combat d'un Champion sont dans un <dl> a l'interieur du
# <dd> de "Fighting Style", les variantes d'un Transmuter's Stone dans une
# tablelist, celles de Gathered Swarm dans les cellules d'un tableau. Lu a plat,
# tout cela devenait des capacites soeurs : 48 "capacites" pour une sous-classe
# qui en a sept, et la structure que le wiki donnait etait perdue.
#
# On lit donc la profondeur. Une entree <dt> ouverte a l'interieur d'un <dd>,
# d'une cellule, d'une grille ou d'une tablelist est une OPTION de l'entree
# au-dessus d'elle, pas une capacite de plus.
function Get-FeatureEntries {
    param([string]$html)

    $entries = @()          # entrees de premier niveau
    $stack = [System.Collections.Generic.List[bool]]::new()   # conteneurs ouverts
    $open = [System.Collections.Generic.List[object]]::new()  # <dt>/<dd> en cours
    $cur = $null            # derniere entree de premier niveau vue
    $owner = $null          # derniere entree vue, tous niveaux confondus

    $nestingDiv = '(?i)(display:\s*grid|bg3wiki-tablelist)'
    $rx = [regex]'(?i)<(?<close>/?)(?<tag>dl|dt|dd|td|th|div)(?<attrs>[^>]*?)/?>'

    foreach ($m in $rx.Matches($html)) {
        $tag = $m.Groups['tag'].Value.ToLower()
        $isClose = $m.Groups['close'].Value -eq '/'
        $depth = 0; foreach ($s in $stack) { if ($s) { $depth++ } }

        if (-not $isClose) {
            if ($tag -eq 'dt' -or $tag -eq 'dd') {
                # Un <dd> peut contenir un <dl> entier — c'est comme cela que le
                # wiki liste les styles de combat d'un Champion. Il faut donc
                # pouvoir ouvrir un <dt> alors qu'un <dd> est encore ouvert, d'ou
                # une pile plutot qu'une seule capture en cours : sans elle les
                # entrees imbriquees dans un <dd> disparaissaient purement.
                $open.Add([PSCustomObject]@{
                    tag = $tag; at = $m.Index + $m.Length; depth = $depth; owner = $owner
                })
                continue
            }
            if ($tag -eq 'div') {
                $stack.Add([bool]($m.Groups['attrs'].Value -match $nestingDiv))
            } else {
                $stack.Add($true)     # dl, td, th
            }
            continue
        }

        if ($tag -eq 'dt' -or $tag -eq 'dd') {
            $i = -1
            for ($k = $open.Count - 1; $k -ge 0; $k--) { if ($open[$k].tag -eq $tag) { $i = $k; break } }
            if ($i -lt 0) { continue }
            $rec = $open[$i]
            while ($open.Count -gt $i) { $open.RemoveAt($open.Count - 1) }
            $raw = $html.Substring($rec.at, $m.Index - $rec.at)

            if ($tag -eq 'dt') {
                $n = ConvertTo-PlainText $raw
                if (-not $n -or $n.Length -gt 70) { continue }
                # Le wiki ecrit parfois une capacite deux fois de suite : une
                # entree pour son texte, une seconde intitulee "Variants:" pour
                # porter la liste de ses variantes. C'est une seule capacite —
                # l'ecole de Transmutation en avait deux "Transmuter's Stone" au
                # niveau 6 — donc on refond la seconde dans la premiere.
                if ($rec.depth -le 1 -and $cur -and $cur.n -eq $n) {
                    $owner = $cur
                    continue
                }
                $e = [ordered]@{ n = $n; d = ""; depth = $rec.depth; opts = @() }
                if ($rec.depth -le 1 -or -not $cur) {
                    $entries += , $e
                    $cur = $e
                } else {
                    $cur.opts += , $e
                }
                $owner = $e
            } else {
                # Un <dd> decrit l'entree ouverte au meme niveau que lui. On retire
                # les <dl> imbriques : leurs <dt> sont deja lus comme options, les
                # recopier ici ferait un pave illisible.
                $o = $rec.owner
                if (-not $o -or $o.depth -ne $rec.depth) { $o = $owner }
                if ($o -and $o.depth -eq $rec.depth) {
                    $inner = [regex]::Replace($raw, '(?s)<dl\b.*</dl>', ' ')
                    $t = ConvertTo-PlainText $inner
                    # Un terrain donne DEUX sorts par niveau (Underdark niveau 3 =
                    # Web ET Misty Step) : chaque <dd> en est un, et n'en lire
                    # qu'un perdait la moitie des sorts de la sous-classe.
                    # "Variants:" tout seul n'est pas une description : c'est
                    # l'etiquette de la liste qui suit, et cette liste est deja
                    # lue comme les options de la capacite.
                    if ($t -match '^\w[\w'' ]{0,20}:$') { $t = "" }
                    if ($t -and $o.d -ne $t) {
                        $o.d = if ($o.d) { $o.d + " · " + $t } else { $t }
                    }
                }
            }
            continue
        }

        if ($stack.Count) { $stack.RemoveAt($stack.Count - 1) }
    }
    return $entries
}

# Une page de classe ou de sous-classe range ses capacites sous des titres
# "Level N". On rend chaque niveau avec son morceau de HTML, pour que le lecteur
# de <dl> ci-dessus sache a quel niveau appartient ce qu'il lit.
function Split-WikiLevels {
    param([Parameter(Mandatory)][string]$Html)
    $marks = [regex]::Matches($Html, '<h3[^>]*>\s*<span[^>]*id="Level_(?<lv>\d+)"')
    if ($marks.Count -eq 0) { return @([PSCustomObject]@{ level = $null; html = $Html }) }
    $out = @()
    for ($i = 0; $i -lt $marks.Count; $i++) {
        $start = $marks[$i].Index
        $end = if ($i + 1 -lt $marks.Count) { $marks[$i + 1].Index } else { $Html.Length }
        $out += [PSCustomObject]@{
            level = [int]$marks[$i].Groups['lv'].Value
            html  = $Html.Substring($start, $end - $start)
        }
    }
    return $out
}
