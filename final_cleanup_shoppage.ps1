# PowerShell script for final cleanup of font-family declarations in shoppage

$shoppagePath = Join-Path (Get-Location) "shoppage"
$htmlFiles = Get-ChildItem -Path $shoppagePath -Recurse -Filter "*.html"

Write-Host "Final cleanup: removing remaining font-family declarations..."

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Remove font-family declarations more comprehensively
    $content = $content -replace "font-family:\s*'Armor Mincho',\s*'装甲明朝',\s*'Yu Mincho',\s*'游明朝',\s*serif;\s*", ""
    $content = $content -replace "font-family:\s*'Yu Mincho Demibold',\s*'游明朝 Demibold',\s*'Yu Mincho',\s*'游明朝',\s*serif;\s*", ""
    
    # Remove other common duplicated CSS properties
    $content = $content -replace "background-color:\s*#000;\s*", "background-color: #000;"
    $content = $content -replace "color:\s*#fff;\s*", "color: #fff;"
    $content = $content -replace "line-height:\s*1\.6;\s*", "line-height: 1.6;"
    
    # Clean up empty style blocks
    $content = $content -replace "body\s*\{\s*\}", ""
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "  ✓ Final cleanup: $($file.Name)"
}

Write-Host "Final font-family cleanup completed"