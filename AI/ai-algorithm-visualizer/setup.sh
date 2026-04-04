#!/bin/bash
# Windows batch equivalent would be setup.bat
# This is for macOS/Linux

set -e

echo "🚀 Setting up AI Algorithm Visualizer..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Backend setup
echo -e "${BLUE}Setting up Backend...${NC}"
cd backend
cp .env.example .env 2>/dev/null || echo "  .env already exists"
npm install
echo -e "${GREEN}✓ Backend setup complete${NC}"

# AI Service setup
echo -e "${BLUE}Setting up AI Service...${NC}"
cd ../ai-service
cp .env.example .env 2>/dev/null || echo "  .env already exists"

if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt
echo -e "${GREEN}✓ AI Service setup complete${NC}"

# Frontend setup
echo -e "${BLUE}Setting up Frontend...${NC}"
cd ../frontend
npm install
echo -e "${GREEN}✓ Frontend setup complete${NC}"

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
echo ""
echo "Next steps:"
echo "1. Run: npm run dev (in each service folder)"
echo "2. Or run: ./start-all.sh"
echo ""
