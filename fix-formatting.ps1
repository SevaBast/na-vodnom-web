# PowerShell script to remove empty lines around "sk:" and "en:" in menuData.ts
# This script safely formats the file without changing content

$filePath = "src/data/menuData.ts"

# Check if file exists
if (-not (Test-Path $filePath)) {
    Write-Host "Error: File $filePath not found!" -ForegroundColor Red
    exit 1
}

Write-Host "Starting formatting of $filePath..." -ForegroundColor Green

# Read all lines
$lines = Get-Content $filePath -Encoding UTF8

# Create new array for processed lines
$newLines = @()

for ($i = 0; $i -lt $lines.Length; $i++) {
    $currentLine = $lines[$i]
    
    # Check if current line contains "sk:" or "en:" with extra spacing
    if ($currentLine -match '^\s*sk:\s*' -or $currentLine -match '^\s*en:\s*') {
        # Remove empty line before if exists
        if ($newLines.Count -gt 0 -and $newLines[-1] -match '^\s*$') {
            $newLines = $newLines[0..($newLines.Count - 2)]
        }
        
        # Add the sk:/en: line with proper indentation (6 spaces)
        if ($currentLine -match '^\s*(sk|en):\s*(.+)') {
            $newLines += "      $($matches[1]): $($matches[2])"
        }
        
        # Skip next empty line if it exists
        if (($i + 1) -lt $lines.Length -and $lines[$i + 1] -match '^\s*$') {
            $i++
        }
    }
    else {
        # Add line as-is
        $newLines += $currentLine
    }
}

# Create backup
$backupPath = "$filePath.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Copy-Item $filePath $backupPath
Write-Host "Backup created: $backupPath" -ForegroundColor Yellow

# Write the processed content back
$newLines | Set-Content $filePath -Encoding UTF8

Write-Host "Formatting complete!" -ForegroundColor Green
Write-Host "Changes made:" -ForegroundColor Cyan

# Show summary of changes
$originalLineCount = $lines.Length
$newLineCount = $newLines.Length
$linesRemoved = $originalLineCount - $newLineCount

Write-Host "  - Original lines: $originalLineCount" -ForegroundColor White
Write-Host "  - New lines: $newLineCount" -ForegroundColor White
Write-Host "  - Empty lines removed: $linesRemoved" -ForegroundColor Green

Write-Host "`nReview the changes and delete the backup file if satisfied." -ForegroundColor Yellow