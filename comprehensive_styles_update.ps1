# PowerShell script to comprehensively update all HTML files with common/styles.css

# Get all HTML files in the workspace
$htmlFiles = Get-ChildItem -Path "C:\Users\tomok\OneDrive\デスクトップ\chinatown_homepage" -Recurse -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Processing file: $($file.FullName)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Calculate relative path to common directory
    $relativePath = $file.DirectoryName
    $rootPath = "C:\Users\tomok\OneDrive\デスクトップ\chinatown_homepage"
    
    # Determine how many levels deep this file is
    $relativeToRoot = $relativePath.Replace($rootPath, "").TrimStart('\')
    $depth = if ($relativeToRoot -eq "") { 0 } else { ($relativeToRoot -split '\\').Length }
    
    # Generate appropriate relative path prefix
    $pathPrefix = switch ($depth) {
        0 { "" }
        1 { "../" }
        default { "../../" }
    }
    
    Write-Host "File depth: $depth, Path prefix: '$pathPrefix'"
    
    # Add common/styles.css link if not already present
    if (-not ($content -match "common/styles\.css")) {
        if ($content -match '(<link rel="stylesheet" href="[^"]*style\.css">)') {
            $content = $content -replace '(<link rel="stylesheet" href="[^"]*style\.css">)', "`$1`r`n    <link rel=`"stylesheet`" href=`"${pathPrefix}common/styles.css`">"
            Write-Host "Added common/styles.css link after style.css in $($file.Name)"
        } elseif ($content -match '(<link rel="stylesheet" href="[^"]*navigation\.css">)') {
            $content = $content -replace '(<link rel="stylesheet" href="[^"]*navigation\.css">)', "<link rel=`"stylesheet`" href=`"${pathPrefix}common/styles.css`">`r`n    `$1"
            Write-Host "Added common/styles.css link before navigation.css in $($file.Name)"
        }
    }
    
    # Remove common CSS properties that are now in common/styles.css
    
    # Remove font-family declarations
    $content = $content -replace "font-family:\s*'Armor Mincho',\s*'装甲明朝',\s*'Yu Mincho',\s*'游明朝',\s*serif;\s*", ""
    
    # Remove common body properties
    $content = $content -replace "margin:\s*0;\s*", ""
    $content = $content -replace "padding:\s*0;\s*", ""
    $content = $content -replace "box-sizing:\s*border-box;\s*", ""
    $content = $content -replace "color:\s*#e8e8e8;\s*", ""
    
    # Clean up empty style rules
    $content = $content -replace "\s*\{\s*\}", " {}"
    
    # Clean up multiple empty lines
    $content = $content -replace "(\r?\n\s*){3,}", "`r`n`r`n"
    
    # Write the modified content back to the file
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Updated $($file.Name)"
}

Write-Host "Completed comprehensive common styles integration for all HTML files"