# PowerShell script to update all shoppage files with shared navigation and styles

# Define the root path
$rootPath = Get-Location
$shoppagePath = Join-Path $rootPath "shoppage"

# Get all HTML files in shoppage directory recursively
$htmlFiles = Get-ChildItem -Path $shoppagePath -Recurse -Filter "*.html"

Write-Host "Found $($htmlFiles.Count) HTML files in shoppage directory"

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Calculate relative path depth for this file
    $relativePath = $file.DirectoryName
    $relativeToRoot = $relativePath.Replace($rootPath, "").TrimStart('\')
    $depth = if ($relativeToRoot -eq "") { 0 } else { ($relativeToRoot -split '\\').Length }
    
    # Generate appropriate relative path prefix (shoppage files are 2 levels deep)
    $pathPrefix = "../../"
    
    Write-Host "  - File depth: $depth, Using path prefix: '$pathPrefix'"
    
    # 1. Add common CSS files if not already present
    if (-not ($content -match "common/styles\.css")) {
        if ($content -match '(<link rel="stylesheet" href="[^"]*style\.css">)') {
            $content = $content -replace '(<link rel="stylesheet" href="[^"]*style\.css">)', "`$1`r`n    <link rel=`"stylesheet`" href=`"${pathPrefix}common/styles.css`">"
            Write-Host "  - Added common/styles.css link"
        }
    }
    
    if (-not ($content -match "common/navigation\.css")) {
        if ($content -match '(<link rel="stylesheet" href="[^"]*common/styles\.css">)') {
            $content = $content -replace '(<link rel="stylesheet" href="[^"]*common/styles\.css">)', "`$1`r`n    <link rel=`"stylesheet`" href=`"${pathPrefix}common/navigation.css`">"
            Write-Host "  - Added common/navigation.css link"
        } elseif ($content -match '(<link rel="stylesheet" href="[^"]*style\.css">)') {
            $content = $content -replace '(<link rel="stylesheet" href="[^"]*style\.css">)', "`$1`r`n    <link rel=`"stylesheet`" href=`"${pathPrefix}common/navigation.css`">"
            Write-Host "  - Added common/navigation.css link"
        }
    }
    
    # 2. Remove embedded navigation CSS (hover-menu system)
    # Remove entire navigation CSS blocks
    $content = $content -replace '(?s)\/\* ホバーメニューシステム \*\/.*?(?=\s*\.tab-container|\s*\.org-tab|\s*@media|\s*</style>)', ''
    $content = $content -replace '(?s)\.navigation\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.hover-menu-container\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.menu-icon\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.menu-icon:hover\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.hover-menu\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.hover-menu-container:hover \.hover-menu\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.menu-item\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.menu-item:hover\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.menu-divider\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.submenu\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.submenu-content\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.submenu:hover \.submenu-content\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.submenu-item\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.submenu-item:hover\s*\{[^}]*\}\s*', ''
    
    # Remove color class definitions that are now in common CSS
    $content = $content -replace '(?s)\.color-red\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.color-blue\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.color-green\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.color-yellow\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.color-white\s*\{[^}]*\}\s*', ''
    $content = $content -replace '(?s)\.color-black\s*\{[^}]*\}\s*', ''
    
    Write-Host "  - Removed embedded navigation CSS"
    
    # 3. Remove embedded navigation HTML
    $content = $content -replace '(?s)<div class="hover-menu-container">.*?</div>\s*', ''
    Write-Host "  - Removed embedded navigation HTML"
    
    # 4. Add navigation placeholder if not present
    if (-not ($content -match 'id="navigation-placeholder"')) {
        # Add navigation placeholder after body tag or at the beginning of main content
        if ($content -match '(<body[^>]*>)') {
            $content = $content -replace '(<body[^>]*>)', "`$1`r`n    <div id=`"navigation-placeholder`"></div>"
            Write-Host "  - Added navigation placeholder"
        }
    }
    
    # 5. Add navigation JavaScript if not present
    if (-not ($content -match "common/navigation\.js")) {
        # Add before closing body tag
        if ($content -match '(</body>)') {
            $content = $content -replace '(</body>)', "    <script src=`"${pathPrefix}common/navigation.js`"></script>`r`n`$1"
            Write-Host "  - Added navigation JavaScript"
        }
    }
    
    # 6. Remove common CSS properties that are now in common/styles.css
    $content = $content -replace "font-family:\s*'Yu Mincho Demibold',\s*'游明朝 Demibold',\s*'Yu Mincho',\s*'游明朝',\s*serif;\s*", ""
    $content = $content -replace "font-family:\s*'Armor Mincho',\s*'装甲明朝',\s*'Yu Mincho',\s*'游明朝',\s*serif;\s*", ""
    $content = $content -replace "margin:\s*0;\s*", ""
    $content = $content -replace "padding:\s*0;\s*", ""
    $content = $content -replace "box-sizing:\s*border-box;\s*", ""
    $content = $content -replace "color:\s*#e8e8e8;\s*", ""
    
    # 7. Clean up empty lines and formatting
    $content = $content -replace "(\r?\n\s*){3,}", "`r`n`r`n"
    $content = $content -replace "\s*\{\s*\}", " {}"
    
    # Write the modified content back to the file
    try {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "  ✓ Successfully updated $($file.Name)"
    }
    catch {
        Write-Host "  ✗ Failed to update $($file.Name): $($_.Exception.Message)"
    }
}

Write-Host "`nCompleted shoppage navigation integration for $($htmlFiles.Count) files"