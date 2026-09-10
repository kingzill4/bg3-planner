# Mini serveur statique local (pas besoin de Node/Python).
# Usage: pwsh -File scripts/serve.ps1 [-Port 8791]
param(
    [int]$Port = 8791
)

$root = Split-Path -Parent $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $root at http://localhost:$Port/  (Ctrl+C pour arreter)"

# un type MIME correct compte : un background-image CSS servi en
# application/octet-stream n'est pas rendu par certains navigateurs
$mime = @{
    ".html" = "text/html"; ".js" = "text/javascript"; ".css" = "text/css"
    ".json" = "application/json"; ".svg" = "image/svg+xml"
    ".png" = "image/png"; ".webp" = "image/webp"
    ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg"; ".gif" = "image/gif"
    ".woff2" = "font/woff2"; ".ico" = "image/x-icon"
}

try {
    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        $req = $ctx.Request
        $res = $ctx.Response
        $path = $req.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }
        $filePath = Join-Path $root ($path.TrimStart("/"))
        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath)
            $res.ContentType = $mime[$ext]
            if (-not $res.ContentType) { $res.ContentType = "application/octet-stream" }
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $res.StatusCode = 404
        }
        $res.OutputStream.Close()
    }
} finally {
    $listener.Stop()
}
