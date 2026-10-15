# MediTrip Auto-Start Setup Script
# This script creates a Windows Task Scheduler task to start the web server on boot

$TaskName = "MediTrip Web Server"
$ScriptPath = Join-Path $PSScriptRoot "start_server_hidden.vbs"
$Description = "Automatically starts MediTrip web server on port 8000 at system startup"

# Check if task already exists
$ExistingTask = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue

if ($ExistingTask) {
    Write-Host "Task '$TaskName' already exists. Removing it first..."
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
}

# Create a new scheduled task action
$Action = New-ScheduledTaskAction -Execute "wscript.exe" -Argument "`"$ScriptPath`""

# Create a trigger that starts at system startup
$Trigger = New-ScheduledTaskTrigger -AtStartup

# Create settings
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1)

# Create principal (run with highest privileges)
$Principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -RunLevel Highest

# Register the scheduled task
Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Principal $Principal -Description $Description

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "SUCCESS!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "MediTrip web server has been set up to start automatically on boot." -ForegroundColor Cyan
Write-Host ""
Write-Host "Details:" -ForegroundColor Yellow
Write-Host "  - Task Name: $TaskName"
Write-Host "  - Script Path: $ScriptPath"
Write-Host "  - Port: 8000"
Write-Host "  - Access URL: http://localhost:8000"
Write-Host ""
Write-Host "To manage this task:" -ForegroundColor Yellow
Write-Host "  1. Open Task Scheduler (taskschd.msc)"
Write-Host "  2. Look for '$TaskName' in the task list"
Write-Host ""
Write-Host "To test the task now, run:" -ForegroundColor Yellow
Write-Host "  Start-ScheduledTask -TaskName '$TaskName'"
Write-Host ""
