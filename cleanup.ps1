# Cleanup script for Vite cache issues
Write-Host "Cleaning Vite cache and node_modules..." -ForegroundColor Yellow

# Stop any running node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Remove Vite cache directories
if (Test-Path "node_modules\.vite") {
    Remove-Item -Recurse -Force "node_modules\.vite" -ErrorAction SilentlyContinue
}
if (Test-Path ".vite") {
    Remove-Item -Recurse -Force ".vite" -ErrorAction SilentlyContinue
}

Write-Host "Cleanup complete. Please restart the dev server with: npm run dev" -ForegroundColor Green
