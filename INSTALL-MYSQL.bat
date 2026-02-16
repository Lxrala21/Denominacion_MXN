@echo off
echo ================================================
echo Instalacion - Control de Denominaciones MySQL
echo ================================================
echo.

echo [1/3] Instalando dependencias de Node.js...
cd backend
call npm install
cd ..

echo.
echo [2/3] Creando base de datos MySQL...
echo Ejecutando script SQL...
"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" -u root -pcontrolpallets2026 < database.sql

echo.
echo [3/3] Verificando instalacion...
timeout /t 2 /nobreak >nul

echo.
echo ================================================
echo Instalacion completada!
echo ================================================
echo.
echo Para iniciar el servidor, ejecuta: START-SERVER-MYSQL.bat
echo.
pause
