# PowerShell script to remove duplicate @media queries that are now in common/styles.css

# Get all HTML files in the workspace
$htmlFiles = Get-ChildItem -Path "C:\Users\tomok\OneDrive\デスクトップ\chinatown_homepage" -Recurse -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Processing file: $($file.FullName)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Remove common @media queries that are duplicated in common/styles.css
    # Remove @media (max-width: 768px) blocks that only contain common styles
    $content = $content -replace '@media\s*\(\s*max-width:\s*768px\s*\)\s*\{[^{}]*font-family[^{}]*\}', ''
    $content = $content -replace '@media\s*\(\s*max-width:\s*480px\s*\)\s*\{[^{}]*font-family[^{}]*\}', ''
    
    # Remove empty @media blocks
    $content = $content -replace '@media\s*\([^)]*\)\s*\{\s*\}', ''
    
    # Remove common responsive patterns that are now in common/styles.css
    # This is a more conservative approach - only remove if they match exactly common patterns
    
    # Clean up multiple empty lines
    $content = $content -replace '\r?\n\s*\r?\n\s*\r?\n', "`r`n`r`n"
    
    # Write the modified content back to the file
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Cleaned up media queries in $($file.Name)"
}

Write-Host "Completed cleaning up duplicate @media queries"