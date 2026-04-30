$gitPath = "C:\Program Files\Git\bin"
$oldPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($oldPath -notlike "*$gitPath*") {
    $newPath = "$oldPath;$gitPath"
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    Write-Host "Success! Git has been added to your User PATH."
    Write-Host "Please RESTART your VS Code or terminal for the changes to take effect."
} else {
    Write-Host "Git is already in your PATH."
}
