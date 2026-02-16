@echo off
title Ver Base de Datos - MySQL
color 0B

echo ================================================
echo    Base de Datos: denominaciones_db
echo ================================================
echo.
echo Conectando a MySQL...
echo.

"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" -u root -pcontrolpallets2026 denominaciones_db

pause
