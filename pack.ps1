# Cupertino for Zotero with PDF Background — Windows packager
Add-Type -AssemblyName System.IO.Compression, System.IO.Compression.FileSystem
$root = $PSScriptRoot
$src = Join-Path $root "Cupertino-Zotero"
$meta = Get-Content (Join-Path $src "manifest.json") -Raw | ConvertFrom-Json
$xpi = Join-Path $root ("cupertino-with-pdf-background-" + $meta.version + ".xpi")
if (Test-Path $xpi) { Remove-Item $xpi -Force }
$zip = [System.IO.Compression.ZipFile]::Open($xpi, [System.IO.Compression.ZipArchiveMode]::Create)
try {
    foreach ($f in @('manifest.json','bootstrap.js','style.css','icons/icon-48.png','icons/icon-96.png')) {
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
            $zip, (Join-Path $src $f.Replace('/', [IO.Path]::DirectorySeparatorChar)),
            $f, [System.IO.Compression.CompressionLevel]::Optimal
        ) | Out-Null
    }
} finally { $zip.Dispose() }
Write-Host ("Created " + $xpi)
Write-Host "Install in Zotero: Tools -> Plugins -> gear -> Install Plugin From File"
