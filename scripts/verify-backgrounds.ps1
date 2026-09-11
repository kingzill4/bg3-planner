# Verifie que les backgrounds codes dans js/core.js donnent les memes deux
# competences que bg3.wiki/wiki/Backgrounds.
#
# Ils sont ecrits a la main plutot que scrapes — ils sont treize et ne bougent
# pas — ce qui est exactement le genre de table qui derive sans qu'on le voie.
# BG3 s'ecarte deja de la 5e sur Haunted One (Intimidation, pas Survival).
#
# Usage: pwsh -File scripts/verify-backgrounds.ps1 [-Refresh]
param([switch]$Refresh)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$cacheDir = Join-Path $root "cache\rules"
if (-not (Test-Path $cacheDir)) { New-Item -ItemType Directory -Path $cacheDir -Force | Out-Null }
$UA = "bg3-planner personal build tool (contact: fmongeon@mongeonsolutions.ca)"

$file = Join-Path $cacheDir "backgrounds.html"
if ($Refresh -or -not (Test-Path $file)) {
    $html = (Invoke-WebRequest -Uri "https://bg3.wiki/wiki/Backgrounds" -UserAgent $UA -TimeoutSec 30).Content
    Set-Content $file -Value $html -Encoding utf8
    Start-Sleep -Milliseconds 250
} else { $html = Get-Content $file -Raw -Encoding utf8 }

$text = [regex]::Replace($html, '(?s)<style.*?</style>', '')
$text = [regex]::Replace($text, '(?s)<script.*?</script>', '')
$text = [regex]::Replace($text, '</(p|li|dd|dt|h2|h3)>', "`n")
$text = [regex]::Replace($text, '<[^>]+>', ' ')
$text = [System.Net.WebUtility]::HtmlDecode($text)
$text = ($text -split "`n" | ForEach-Object { ($_ -replace '\s+', ' ').Trim() } | Where-Object { $_ }) -join "`n"

# Le wiki ecrit tantot "Skill proficiencies:", tantot "Improves:" — la meme
# chose, dite deux facons. Le nom du background est le titre juste au-dessus.
$wiki = @{}
$lines = $text -split "`n"
$lastHeading = $null
foreach ($line in $lines) {
    $h = [regex]::Match($line, '^(?<n>[A-Z][A-Za-z'' ]{2,24}?)(?: \(Dark Urge only\))? \[ edit section')
    if ($h.Success) { $lastHeading = $h.Groups['n'].Value.Trim(); continue }
    $m = [regex]::Match($line, '^(?:Skill proficiencies|Improves):\s*(?<s>.+)$')
    if ($m.Success -and $lastHeading) {
        $skills = @($m.Groups['s'].Value -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ })
        $wiki[$lastHeading] = $skills
        $lastHeading = $null
    }
}

# Le cote outil : on lit le litteral BACKGROUNDS de js/core.js plutot que de le
# recopier ici, pour qu'une divergence soit impossible a masquer.
$js = Get-Content (Join-Path $root "js\core.js") -Raw -Encoding utf8
$blk = [regex]::Match($js, '(?s)const BACKGROUNDS = \{(?<b>.*?)\n\};')
if (-not $blk.Success) { throw "BACKGROUNDS introuvable dans js/core.js" }

$SKILL_LABEL = @{
    animalHandling = "Animal Handling"; sleightOfHand = "Sleight of Hand"
}
$mine = @{}
foreach ($m in [regex]::Matches($blk.Groups['b'].Value,
        '(?s)label:\s*"(?<label>[^"]+)",\s*skills:\s*\[(?<skills>[^\]]*)\]')) {
    $sk = @([regex]::Matches($m.Groups['skills'].Value, '"([^"]+)"') | ForEach-Object {
        $k = $_.Groups[1].Value
        if ($SKILL_LABEL.ContainsKey($k)) { $SKILL_LABEL[$k] }
        else { (Get-Culture).TextInfo.ToTitleCase($k) }
    })
    $mine[$m.Groups['label'].Value] = $sk
}

$problems = @()
foreach ($name in ($wiki.Keys | Sort-Object)) {
    if (-not $mine.ContainsKey($name)) {
        $problems += "[$name] absent de js/core.js (wiki: $($wiki[$name] -join ', '))"
        continue
    }
    $w = ($wiki[$name] | Sort-Object) -join ', '
    $j = ($mine[$name] | Sort-Object) -join ', '
    if ($w -ne $j) { $problems += "[$name] wiki: $w  |  outil: $j" }
}
foreach ($name in ($mine.Keys | Sort-Object)) {
    if (-not $wiki.ContainsKey($name)) { $problems += "[$name] dans l'outil mais pas sur la page du wiki" }
}

Write-Host "$($wiki.Count) backgrounds lus sur le wiki, $($mine.Count) dans l'outil."
if ($problems.Count -eq 0) { Write-Host "Tout concorde." -ForegroundColor Green }
else {
    $problems | ForEach-Object { Write-Host $_ -ForegroundColor Yellow }
    exit 1
}
