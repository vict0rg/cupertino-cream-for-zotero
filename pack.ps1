# Cupertino Cream for Zotero — Windows build.
# Concatenate the reader module into bootstrap.js, exactly as scripts/build.py does.
Add-Type -AssemblyName System.IO.Compression, System.IO.Compression.FileSystem
$root = $PSScriptRoot
$src = Join-Path $root "Cupertino-Zotero"
$meta = Get-Content (Join-Path $src "manifest.json") -Raw | ConvertFrom-Json
$xpi = Join-Path $root ("cupertino-cream-for-zotero-" + $meta.version + ".xpi")
if (Test-Path $xpi) { Remove-Item $xpi -Force }
$zip = [System.IO.Compression.ZipFile]::Open($xpi, [System.IO.Compression.ZipArchiveMode]::Create)
try {
  $combined = (Get-Content (Join-Path $src "bootstrap.js") -Raw -Encoding UTF8) + "`n`n" +
    (Get-Content (Join-Path $src "reader-background.js") -Raw -Encoding UTF8)
  $entry = $zip.CreateEntry("bootstrap.js")
  $writer = New-Object System.IO.StreamWriter($entry.Open(), [System.Text.UTF8Encoding]::new($false))
  try { $writer.Write($combined) } finally { $writer.Dispose() }
  foreach ($f in @('manifest.json','style.css','icons/icon-48.png','icons/icon-96.png')) {
    $file = Join-Path $src $f.Replace('/', [IO.Path]::DirectorySeparatorChar)
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
      $zip, $file, $f, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
  }
  foreach ($f in @('LICENSE','CREDITS.md','NOTICE.md')) {
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
      $zip, (Join-Path $root $f), $f, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
  }
} finally { $zip.Dispose() }
Write-Host ("Created " + $xpi)
Write-Host "Install in Zotero: Tools -> Plugins -> Install Plugin From File"
