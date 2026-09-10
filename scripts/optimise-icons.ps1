# Downscale icons that are far larger than anywhere they are displayed.
#
# The fetch-*.ps1 scripts save whatever the wiki serves. For most icons that is
# already small, but race badges arrive as 1060x600 PNGs — around 500 KB each, for
# something the app renders at 24x24 or 32x32. Twenty-three of them came to 6.4 MB,
# roughly a seventh of the whole published site, to draw thumbnails.
#
# This is deliberately a separate step rather than part of the fetch: the fetch
# stays a faithful copy of what the wiki gave us, and this is the one place that
# decides what the site actually ships.
#
# Re-run it after any icon fetch. It is idempotent — files already at or below the
# target are left untouched.
#
# Usage: pwsh -File scripts/optimise-icons.ps1 [-MaxWidth 128] [-WhatIf]
param(
    [int]$MaxWidth = 128,
    [switch]$WhatIf
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot

# 3x the largest on-screen size is enough for any display density we care about.
# Class and subclass badges are 300x300 at ~25 KB and are left alone: they are
# already proportionate, and the cost of touching them would be pure churn.
$targets = @("icons\races", "assets")

$before = 0; $after = 0; $touched = 0; $skipped = 0

foreach ($rel in $targets) {
    $dir = Join-Path $root $rel
    if (-not (Test-Path $dir)) { continue }

    foreach ($file in Get-ChildItem $dir -File -Include *.png, *.jpg, *.jpeg -Recurse) {
        $before += $file.Length

        $img = $null
        try { $img = [System.Drawing.Image]::FromFile($file.FullName) }
        catch { Write-Host "  skip (unreadable): $($file.Name)"; $after += $file.Length; $skipped++; continue }

        if ($img.Width -le $MaxWidth) {
            $img.Dispose(); $after += $file.Length; $skipped++
            continue
        }

        $w = $MaxWidth
        $h = [int][Math]::Round($img.Height * ($MaxWidth / $img.Width))
        $oldW = $img.Width; $oldH = $img.Height; $oldKb = [int]($file.Length / 1KB)

        if ($WhatIf) {
            "  would resize {0,-28} {1}x{2} -> {3}x{4}" -f $file.Name, $oldW, $oldH, $w, $h
            $img.Dispose(); $after += $file.Length
            continue
        }

        # Keep each file in its own format. Writing a resized .jpg back out as PNG
        # would leave a PNG behind a .jpg name: browsers sniff their way through it,
        # but the server then advertises the wrong Content-Type.
        $isJpeg = $file.Extension -in ".jpg", ".jpeg"

        # A 32bpp ARGB bitmap with high-quality resampling preserves the alpha the
        # PNG badges rely on and avoids the halo the default nearest-neighbour path
        # leaves around transparent edges.
        $bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.DrawImage($img, 0, 0, $w, $h)
        $g.Dispose()
        $img.Dispose()

        # write to a temp file first: overwriting the source we just read from is
        # how you end up with a zero-byte icon and no way back
        $tmp = $file.FullName + ".tmp"
        if ($isJpeg) {
            # JPEG has no alpha, so flatten onto the app's own dark background
            # rather than letting undefined transparency come out as black boxes
            $flat = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
            $fg = [System.Drawing.Graphics]::FromImage($flat)
            $fg.Clear([System.Drawing.Color]::FromArgb(15, 22, 32))
            $fg.DrawImage($bmp, 0, 0)
            $fg.Dispose()
            $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
                   Where-Object { $_.MimeType -eq "image/jpeg" }
            $prm = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $prm.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
                [System.Drawing.Imaging.Encoder]::Quality, 85)
            $flat.Save($tmp, $enc, $prm)
            $flat.Dispose()
        } else {
            $bmp.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
        }
        $bmp.Dispose()
        Move-Item $tmp $file.FullName -Force

        $newKb = [int]((Get-Item $file.FullName).Length / 1KB)
        $after += (Get-Item $file.FullName).Length
        $touched++
        "  {0,-28} {1}x{2} -> {3}x{4}   {5} KB -> {6} KB" -f $file.Name, $oldW, $oldH, $w, $h, $oldKb, $newKb
    }
}

""
"Resized {0} file(s), left {1} alone." -f $touched, $skipped
"{0:N2} MB -> {1:N2} MB  ({2:N0} % of original)" -f ($before / 1MB), ($after / 1MB),
    $(if ($before) { 100 * $after / $before } else { 100 })
