#!/bin/bash
# Setup and run all services

echo "🚀 Starting AI Algorithm Visualizer Setup..."
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Start backend
echo -e "${BLUE}1. Starting Backend (Express)...${NC}"
cd backend
npm install > /dev/null 2>&1
npm run dev &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"
sleep 2

# Start AI service
echo -e "${BLUE}2. Starting AI Service (FastAPI)...${NC}"
cd ../ai-service

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install requirements
pip install -q -r requirements.txt
python app/main.py &
AI_PID=$!
echo -e "${GREEN}✓ AI Service started (PID: $AI_PID)${NC}"
sleep 2

# Start frontend
echo -e "${BLUE}3. Starting Frontend (React + Vite)...${NC}"
cd ../frontend
npm install > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"
sleep 2

# Display service information
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ All Services Started Successfully!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
echo ""
echo "📍 Service URLs:"
echo -e "   ${BLUE}Frontend:${NC}  http://localhost:5173"
echo -e "   ${BLUE}Backend:${NC}   http://localhost:5000"
echo -e "   ${BLUE}AI Service:${NC} http://localhost:8000"
echo ""
echo "Process IDs:"
echo "   Backend:   $BACKEND_PID"
echo "   AI Service: $AI_PID"
echo "   Frontend:  $FRONTEND_PID"
echo ""
echo "To stop services, press Ctrl+C"
echo ""

# Wait for all processes
wait
