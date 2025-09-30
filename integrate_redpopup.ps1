# PowerShell script to integrate redpopup.css and redpopup.js into red shoppage files

$redShopPath = Join-Path (Get-Location) "shoppage\red"
$htmlFiles = Get-ChildItem -Path $redShopPath -Filter "*.html"

Write-Host "Integrating redpopup files into $($htmlFiles.Count) red shop files..."

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Add redpopup.css link after shopred.css
    if (-not ($content -match "redpopup\.css")) {
        if ($content -match '(<link rel="stylesheet" href="shopred\.css">)') {
            $content = $content -replace '(<link rel="stylesheet" href="shopred\.css">)', "`$1`r`n    <link rel=`"stylesheet`" href=`"redpopup.css`">"
            Write-Host "  - Added redpopup.css link"
        }
    }
    
    # Add redpopup.js script before the closing body tag, but after navigation.js
    if (-not ($content -match "redpopup\.js")) {
        if ($content -match '(<script src="[^"]*navigation\.js"></script>)') {
            $content = $content -replace '(<script src="[^"]*navigation\.js"></script>)', "`$1`r`n    <script src=`"redpopup.js`"></script>"
            Write-Host "  - Added redpopup.js script"
        }
    }
    
    # Remove embedded popup-related JavaScript functions
    # Remove showRedGroupDetail function
    $content = $content -replace '(?s)\s*function\s+showRedGroupDetail\s*\(\s*\)\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}\s*', ''
    
    # Remove hideGroupDetail function
    $content = $content -replace '(?s)\s*function\s+hideGroupDetail\s*\(\s*\)\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}\s*', ''
    
    # Remove handleEscKey function
    $content = $content -replace '(?s)\s*function\s+handleEscKey\s*\([^)]*\)\s*\{[^{}]*\}\s*', ''
    
    # Remove overlay click event listener
    $content = $content -replace '(?s)\s*//\s*オーバーレイクリックで閉じる[^}]*document\.getElementById\(.*overlay.*\)\.addEventListener\(.*hideGroupDetail.*\);\s*', ''
    
    # Remove DOMContentLoaded event for overlay
    $content = $content -replace '(?s)\s*document\.addEventListener\(.*DOMContentLoaded.*function\(\)\s*\{[^{}]*overlay[^{}]*\}\);\s*', ''
    
    Write-Host "  - Removed embedded popup JavaScript"
    
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

Write-Host "`nCompleted redpopup integration for $($htmlFiles.Count) files"