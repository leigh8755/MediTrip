@echo off
REM MediTrip Web Server Startup Script
cd /d "%~dp0"
"C:\Python314\python.exe" -m http.server 8000 >> "%~dp0server.log" 2>&1
