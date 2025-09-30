# PowerShell script to remove onclick attributes from red-group-btn and close-btn

$redShopPath = Join-Path (Get-Location) "shoppage\red"
$htmlFiles = Get-ChildItem -Path $redShopPath -Filter "*.html"

Write-Host "Removing onclick attributes from $($htmlFiles.Count) red shop files..."

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Remove onclick from red-group-btn
    $content = $content -replace 'onclick="showRedGroupDetail\(\)"', ''
    
    # Remove onclick from close-btn
    $content = $content -replace 'onclick="hideGroupDetail\(\)"', ''
    
    # Clean up extra spaces
    $content = $content -replace '\s+>', '>'
    
    Write-Host "  - Removed onclick attributes"
    
    # Write back to file
    try {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "  ✓ Successfully cleaned $($file.Name)"
    }
    catch {
        Write-Host "  ✗ Failed to clean $($file.Name): $($_.Exception.Message)"
    }
}

Write-Host "`nCompleted onclick attribute cleanup for $($htmlFiles.Count) files"