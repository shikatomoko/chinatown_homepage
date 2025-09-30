# PowerShell script to add common/styles.css to all HTML files and remove duplicate CSS

# Get all HTML files in the workspace
$htmlFiles = Get-ChildItem -Path "C:\Users\tomok\OneDrive\デスクトップ\chinatown_homepage" -Recurse -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Processing file: $($file.FullName)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Add common/styles.css link if not already present
    if (-not ($content -match "common/styles\.css")) {
        # Calculate relative path to common/styles.css
        $relativePath = Get-Item $file.FullName | Resolve-Path -Relative
        $depth = ($relativePath -split "\\").Length - 2
        $pathPrefix = if ($depth -eq 0) { "" } elseif ($depth -eq 1) { "../" } else { "../../" }
        
        # Insert common/styles.css link after style.css or before navigation.css
        if ($content -match '<link rel="stylesheet" href="[^"]*style\.css">') {
            $content = $content -replace '(<link rel="stylesheet" href="[^"]*style\.css">)', "`$1`r`n    <link rel=`"stylesheet`" href=`"${pathPrefix}common/styles.css`">"
        } elseif ($content -match '<link rel="stylesheet" href="[^"]*navigation\.css">') {
            $content = $content -replace '(<link rel="stylesheet" href="[^"]*navigation\.css">)', "<link rel=`"stylesheet`" href=`"${pathPrefix}common/styles.css`">`r`n    `$1"
        }
        
        Write-Host "Added common/styles.css link to $($file.Name)"
    }
    
    # Remove common font-family declarations from embedded CSS
    $content = $content -replace "font-family:\s*'Armor Mincho',\s*'装甲明朝',\s*'Yu Mincho',\s*'游明朝',\s*serif;", ""
    
    # Remove common body CSS properties that are now in common/styles.css
    $content = $content -replace "margin:\s*0;", ""
    $content = $content -replace "box-sizing:\s*border-box;", ""
    $content = $content -replace "color:\s*#e8e8e8;", ""
    
    # Clean up empty lines and trailing spaces
    $content = $content -replace "\s*\r?\n\s*\r?\n", "`r`n`r`n"
    $content = $content -replace "^\s+", ""
    
    # Write the modified content back to the file
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Updated $($file.Name)"
}

Write-Host "Completed processing all HTML files for common styles integration"