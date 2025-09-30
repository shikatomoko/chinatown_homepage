# PowerShell script to fix encoding issues in shoppage/red files

$redShopPath = Join-Path (Get-Location) "shoppage\red"
$htmlFiles = Get-ChildItem -Path $redShopPath -Filter "*.html"

Write-Host "Fixing encoding issues in $($htmlFiles.Count) red shop files..."

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Fix the garbled text in style section
    $content = $content -replace '/\*[^*/]*繝[^*/]*\*/', '/* ページ固有のスタイルがあればここに記述 */'
    
    # Clean up any remaining encoding issues
    $content = $content -replace '繝壹・繧ｸ蝗ｺ譛峨・繧ｹ繧ｿ繧､繝ｫ縺後≠繧後・縺薙％縺ｫ險倩ｿｰ', 'ページ固有のスタイルがあればここに記述'
    
    # Write back to file with proper encoding
    try {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "  ✓ Fixed encoding for $($file.Name)"
    }
    catch {
        Write-Host "  ✗ Failed to fix $($file.Name): $($_.Exception.Message)"
    }
}

Write-Host "`nCompleted encoding fixes for shoppage/red files"