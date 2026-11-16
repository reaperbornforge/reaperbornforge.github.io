$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$artifactDir = Join-Path $projectRoot 'artifacts'
$distRoot = Join-Path $projectRoot 'dist'
$manifestPath = Join-Path $artifactDir 'publication-manifest.json'
$report = Get-Content -LiteralPath (Join-Path $artifactDir 'browser-report.json') -Raw -Encoding UTF8 | ConvertFrom-Json
if ($report.result -ne 'passed') { throw 'O teste de navegador precisa passar antes de empacotar.' }
$manifestHash = (Get-FileHash -LiteralPath $manifestPath -Algorithm SHA256).Hash.ToLowerInvariant()
if ($manifestHash -ne $report.manifestSha256) { throw 'O pacote mudou desde o teste de navegador.' }
$manifest = Get-Content -LiteralPath $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
foreach ($file in $manifest.files) {
    $localHash = (Get-FileHash -LiteralPath (Join-Path $distRoot $file.path) -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($localHash -ne $file.sha256) { throw "Arquivo alterado: $($file.path)" }
}
$archivePath = Join-Path $artifactDir 'Reaperborn-Forge-publicacao.zip'
$publicPaths = @('index.html','assets','projects','404.html','robots.txt','sitemap.xml','.nojekyll') | ForEach-Object { Join-Path $distRoot $_ }
Compress-Archive -LiteralPath $publicPaths -DestinationPath $archivePath -Force
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [IO.Compression.ZipFile]::OpenRead($archivePath)
try {
    $entries = @($archive.Entries | Where-Object { $_.Name -ne '' })
    if ($entries.Count -ne $manifest.files.Count) { throw 'Quantidade de arquivos no ZIP diverge do manifesto.' }
    foreach ($file in $manifest.files) {
        $entry = $entries | Where-Object { $_.FullName.Replace('\','/') -eq $file.path } | Select-Object -First 1
        if ($null -eq $entry) { throw "Arquivo ausente no ZIP: $($file.path)" }
        $stream = $entry.Open()
        $sha = [Security.Cryptography.SHA256]::Create()
        try { $hash = [BitConverter]::ToString($sha.ComputeHash($stream)).Replace('-','').ToLowerInvariant() }
        finally { $stream.Dispose(); $sha.Dispose() }
        if ($hash -ne $file.sha256) { throw "Hash divergente no ZIP: $($file.path)" }
    }
}
finally { $archive.Dispose() }
Write-Output "ZIP verificado: $archivePath ($($manifest.files.Count) arquivos)"
