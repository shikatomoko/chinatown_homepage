# PowerShell script to update shoppage/red files with shopred.css

# Get all HTML files in shoppage/red directory
$redShopPath = Join-Path (Get-Location) "shoppage\red"
$htmlFiles = Get-ChildItem -Path $redShopPath -Filter "*.html"

Write-Host "Updating $($htmlFiles.Count) red shop files with shopred.css..."

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Add shopred.css link after common/navigation.css
    if (-not ($content -match "shopred\.css")) {
        if ($content -match '(<link rel="stylesheet" href="[^"]*common/navigation\.css">)') {
            $content = $content -replace '(<link rel="stylesheet" href="[^"]*common/navigation\.css">)', "`$1`r`n    <link rel=`"stylesheet`" href=`"shopred.css`">"
            Write-Host "  - Added shopred.css link"
        }
    }
    
    # Remove the embedded <style> section that contains the red shop common styles
    # This is a comprehensive removal of the style block
    $content = $content -replace '(?s)<style>\s*.*?</style>\s*', '<style>
        /* ページ固有のスタイルがあればここに記述 */
    </style>
    '
    
    Write-Host "  - Removed embedded common styles"
    
    # Clean up multiple empty lines
    $content = $content -replace "(\r?\n\s*){3,}", "`r`n`r`n"
    
    # Write back to file
    try {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "  ✓ Successfully updated $($file.Name)"
    }
    catch {
        Write-Host "  ✗ Failed to update $($file.Name): $($_.Exception.Message)"
    }
}

Write-Host "`nCompleted shoppage/red CSS consolidation for $($htmlFiles.Count) files"