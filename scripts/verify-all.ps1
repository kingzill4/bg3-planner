# Relit tout ce que l'outil affirme sur les regles et le compare au wiki.
#
# Chaque verificateur lit la meme page que son scraper, mais par un autre chemin :
# si les deux tombent d'accord, la donnee est celle du wiki ; s'ils divergent,
# c'est le nettoyage qui a ajoute ou perdu quelque chose. C'est ainsi qu'on a vu
# que le barde n'avait plus une seule capacite de classe (le scraper lisait sa
# derniere colonne, ses emplacements de sorts) et que le Circle of the Land
# comptait 48 capacites au lieu de 16.
#
# Usage: pwsh -File scripts/verify-all.ps1 [-Refresh]
#   -Refresh relit les pages depuis bg3.wiki au lieu du cache disque.
param([switch]$Refresh)

$checks = @(
    @{ name = "races";        script = "verify-races.ps1" }
    @{ name = "classes";      script = "verify-classes.ps1" }
    @{ name = "sous-classes"; script = "verify-subclasses.ps1" }
    @{ name = "backgrounds";  script = "verify-backgrounds.ps1" }
    @{ name = "multiclasse";  script = "verify-multiclass.ps1" }
)

$failed = @()
foreach ($c in $checks) {
    Write-Host ""
    Write-Host "=== $($c.name) ===" -ForegroundColor Cyan
    $args = @("-File", (Join-Path $PSScriptRoot $c.script))
    if ($Refresh) { $args += "-Refresh" }
    & pwsh @args
    if ($LASTEXITCODE -ne 0) { $failed += $c.name }
}

Write-Host ""
if ($failed.Count) {
    Write-Host "Divergences avec le wiki : $($failed -join ', ')" -ForegroundColor Red
    exit 1
}
Write-Host "Tout concorde avec le wiki." -ForegroundColor Green
