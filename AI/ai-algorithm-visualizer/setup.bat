@echo off
REM Setup script for Windows

echo.
echo 🚀 Setting up AI Algorithm Visualizer...
echo.

REM Backend setup
echo Setting up Backend...
cd backend
if not exist .env copy .env.example .env
call npm install
echo ✓ Backend setup complete
cd ..

REM AI Service setup
echo.
echo Setting up AI Service...
cd ai-service
if not exist .env copy .env.example .env

if not exist venv (
  python -m venv venv
)

call venv\Scripts\activate
pip install -r requirements.txt
echo ✓ AI Service setup complete
cd ..

REM Frontend setup
echo.
echo Setting up Frontend...
cd frontend
call npm install
echo ✓ Frontend setup complete
cd ..

echo.
echo ═══════════════════════════════════════════════
echo ✅ Setup Complete!
echo ═══════════════════════════════════════════════
echo.
echo Next steps:
echo 1. Run each service in separate terminal: npm run dev
echo 2. Or run from Terminal folder: start-all.bat
echo.
pause
