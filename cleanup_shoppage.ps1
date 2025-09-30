# PowerShell script to clean up remaining old navigation elements in shoppage files

# Get all HTML files in shoppage directory
$shoppagePath = Join-Path (Get-Location) "shoppage"
$htmlFiles = Get-ChildItem -Path $shoppagePath -Recurse -Filter "*.html"

Write-Host "Cleaning up remaining navigation elements in $($htmlFiles.Count) files..."

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Remove any remaining hover-menu related CSS and JavaScript references
    $content = $content -replace '(?s)\.hover-menu-container[^{]*\{[^}]*\}\s*', ''
    $content = $content -replace "if \(\!e\.target\.closest\('\.hover-menu-container'\)\)", "// Removed old navigation check"
    $content = $content -replace "closest\('\.hover-menu-container'\)", "// Removed old navigation"
    
    # Remove any remaining old navigation JavaScript functions
    $content = $content -replace '(?s)function\s+hideGroupDetail\(\)[^}]*\}', ''
    
    # Clean up font-family duplicates that might have been missed
    $content = $content -replace "font-family:\s*'Yu Mincho Demibold',\s*'游明朝 Demibold',\s*'Yu Mincho',\s*'游明朝',\s*serif;\s*", ""
    
    # Clean up multiple empty lines
    $content = $content -replace "(\r?\n\s*){3,}", "`r`n`r`n"
    
    # Write back to file
    try {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "  ✓ Cleaned up $($file.Name)"
    }
    catch {
        Write-Host "  ✗ Failed to clean $($file.Name): $($_.Exception.Message)"
    }
}

Write-Host "`nCompleted cleanup of old navigation elements"