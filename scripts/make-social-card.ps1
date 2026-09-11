# Draws assets/social-card.png — the 1200x630 image shown when the link is pasted
# into Discord, Reddit or anywhere else that reads Open Graph tags.
#
# Drawn rather than screenshotted, for two reasons. A screenshot of the planner at
# 1200x630 crops the panels mid-sentence and shows whatever character happened to
# be loaded, which is noise. And the card must not use Larian's cover art: their
# artwork as the face of a fan tool is the thing the Fan Content Policy asks you
# not to do. Everything here is type and shapes.
#
# Usage: pwsh -File scripts/make-social-card.ps1
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$out  = Join-Path $root "assets\social-card.png"

$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap($W, $H, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# the site's own palette, so the card and the page look like one thing
$bgTop   = [System.Drawing.Color]::FromArgb(255, 18, 26, 36)
$bgBot   = [System.Drawing.Color]::FromArgb(255, 11, 16, 23)
$gold    = [System.Drawing.Color]::FromArgb(255, 212, 175, 106)
$goldDim = [System.Drawing.Color]::FromArgb(255, 138, 109, 58)
$text    = [System.Drawing.Color]::FromArgb(255, 201, 212, 224)
$dim     = [System.Drawing.Color]::FromArgb(255, 147, 163, 184)

$rect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
$grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $bgTop, $bgBot, 90)
$g.FillRectangle($grad, $rect)

# a faint d20 outline off to the right, the same motif as the favicon
$cx = 980.0; $cy = 315.0; $r = 210.0
$pts = @()
for ($i = 0; $i -lt 6; $i++) {
    $a = [Math]::PI / 180 * (60 * $i - 90)
    $pts += New-Object System.Drawing.PointF(($cx + $r * [Math]::Cos($a)), ($cy + $r * [Math]::Sin($a)))
}
$penFaint = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(38, 212, 175, 106), 3)
$g.DrawPolygon($penFaint, [System.Drawing.PointF[]]$pts)
foreach ($p in $pts) { $g.DrawLine($penFaint, (New-Object System.Drawing.PointF($cx, $cy)), $p) }

# a gold rule down the left, echoing the panel borders on the page
$penRule = New-Object System.Drawing.Pen($goldDim, 4)
$g.DrawLine($penRule, 84, 150, 84, 470)

$serif = "Georgia"
$sans  = "Segoe UI"
$fTitle = New-Object System.Drawing.Font($serif, 62, [System.Drawing.FontStyle]::Bold)
$fSub   = New-Object System.Drawing.Font($sans, 27)
$fStat  = New-Object System.Drawing.Font($serif, 34, [System.Drawing.FontStyle]::Bold)
$fLabel = New-Object System.Drawing.Font($sans, 14)
$fFoot  = New-Object System.Drawing.Font($sans, 16)

$bGold = New-Object System.Drawing.SolidBrush($gold)
$bText = New-Object System.Drawing.SolidBrush($text)
$bDim  = New-Object System.Drawing.SolidBrush($dim)

$g.DrawString("BG3 Build Planner", $fTitle, $bGold, 118, 150)
$g.DrawString("Party gear and damage, checked against the wiki", $fSub, $bText, 124, 248)

# the three numbers that say what it is without a sentence
$stats = @(
    @{ n = "934";  l = "ITEMS" },
    @{ n = "579";  l = "SPELLS" },
    @{ n = "12/58"; l = "CLASSES / SUBCLASSES" }
)
$x = 124.0
foreach ($s in $stats) {
    $g.DrawString($s.n, $fStat, $bGold, $x, 344)
    $g.DrawString($s.l, $fLabel, $bDim, ($x + 3), 396)
    $sz = $g.MeasureString($s.l, $fLabel)
    $x += [Math]::Max(180, $sz.Width + 42)
}

$g.DrawString("Every rule and number taken from bg3.wiki — unofficial fan tool, free to use",
              $fFoot, $bDim, 124, 470)

$g.Dispose()
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

$kb = [int]((Get-Item $out).Length / 1KB)
"assets\social-card.png : ${W}x${H}, $kb KB"
