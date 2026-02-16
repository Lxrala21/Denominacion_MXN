@echo off
title Control Denominaciones - MySQL Server
color 0A

echo ================================================
echo    Control de Denominaciones MXN - MySQL
echo ================================================
echo.

:: Verificar si MySQL esta corriendo
echo [1/2] Verificando MySQL...
net start MySQL84 >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] MySQL ya esta corriendo
) else (
    echo [!] MySQL no estaba corriendo, iniciando...
    net start MySQL84
    if %errorlevel% neq 0 (
        echo [ERROR] No se pudo iniciar MySQL
        pause
        exit /b 1
    )
)

echo.
echo [2/2] Iniciando servidor API...
echo.
echo ================================================
echo    Servidor corriendo en:
echo    http://localhost:3002
echo ================================================
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

cd backend
npm start

pause
