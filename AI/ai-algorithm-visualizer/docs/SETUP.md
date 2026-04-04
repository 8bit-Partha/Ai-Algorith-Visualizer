# Setup Instructions

## 📋 Prerequisites

- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher
- **Python**: 3.8 or higher
- **pip**: Python package manager
- **Git**: Version control

### Verify Installations

```bash
node --version
npm --version
python --version
pip --version
```

## 🚀 Full Setup Guide

### Step 1: Clone/Download Project

```bash
cd path/to/desired/location
# If from git
git clone <repository-url>
cd ai-algorithm-visualizer
```

### Step 2: Setup Backend (Express.js)

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

The backend will start on **http://localhost:5000**

#### Backend Environment Variables (.env)

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ai-visualizer
AI_SERVICE_URL=http://localhost:8000
CORS_ORIGIN=http://localhost:5173
```

### Step 3: Setup AI Service (FastAPI + Python)

#### Option A: Using venv (Recommended)

```bash
cd ai-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the service
python app/main.py
```

#### Option B: Using virtualenv

```bash
cd ai-service

# Install virtualenv if not present
pip install virtualenv

# Create environment
virtualenv venv

# Activate
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate      # Windows

# Install packages
pip install -r requirements.txt

python app/main.py
```

The AI Service will start on **http://localhost:8000**

#### Python Environment Variables (.env)

```
PORT=8000
HOST=0.0.0.0
DEBUG=True
```

### Step 4: Setup Frontend (React + Vite)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at **http://localhost:5173**

## 🏃 Running All Services (Quick Start)

### Terminal 1: Backend
```bash
cd backend
npm install
npm run dev
```

### Terminal 2: AI Service
```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app/main.py
```

### Terminal 3: Frontend
```bash
cd frontend
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.

## ✅ Verification

### Check Backend Health
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status": "ok", "timestamp": "2024-01-15T10:30:00.000Z"}
```

### Check AI Service Health
```bash
curl http://localhost:8000/health
```

Expected response:
```json
{"status": "ok", "timestamp": "2024-01-15T10:30:00.000Z"}
```

### Check Available Algorithms
```bash
curl http://localhost:5000/api/algorithms
```

### Test Algorithm Execution
```bash
curl -X POST http://localhost:5000/api/algorithms/run \
  -H "Content-Type: application/json" \
  -d '{
    "algorithm": "bfs",
    "params": {
      "graph": {"A": ["B", "C"], "B": ["D"], "C": ["E"], "D": [], "E": []},
      "start": "A"
    }
  }'
```

## 🐳 Docker Setup (Optional)

### Create Dockerfile for Backend

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]
```

### Create Dockerfile for AI Service

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "app/main.py"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - AI_SERVICE_URL=http://ai-service:8000

  ai-service:
    build: ./ai-service
    ports:
      - "8000:8000"
    environment:
      - PORT=8000

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://localhost:5000
```

## 🛠️ Production Build

### Frontend Production Build

```bash
cd frontend
npm run build
npm run preview
```

### Backend Production Setup

```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

### AI Service Production Setup

```bash
cd ai-service
# Install only production dependencies
pip install -r requirements.txt

# Run with production ASGI server
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
```

## 📦 Dependency Installation Troubleshooting

### Node.js Issues

**Issue**: `npm install` fails
```bash
# Clear cache
npm cache clean --force

# Retry install
npm install
```

### Python Issues

**Issue**: `pip install` fails for numpy
```bash
# Install build tools first
pip install --upgrade pip setuptools wheel

# Then retry
pip install -r requirements.txt
```

**Issue**: Virtual environment issues
```bash
# Delete old environment
rm -rf venv  # or rmdir venv on Windows

# Create fresh environment
python -m venv venv

# Activate and install
source venv/bin/activate
pip install -r requirements.txt
```

## 🔧 Development Commands

### Backend
```bash
npm run dev      # Development server with hot reload
npm run build    # Build for production
npm start        # Production server
npm test         # Run tests
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Lint code
npm run test     # Run tests
```

### AI Service
```bash
# Development
python app/main.py

# With auto-reload
pip install watchdog
uvicorn app.main:app --reload

# Production
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
```

## 📝 Environment Configuration

### Development vs Production

**Development (.env)**
```
NODE_ENV=development
DEBUG=true
MONGODB_URI=mongodb://localhost:27017/ai-visualizer-dev
CORS_ORIGIN=http://localhost:5173
```

**Production (.env)**
```
NODE_ENV=production
DEBUG=false
MONGODB_URI=mongodb://production-server:27017/ai-visualizer
CORS_ORIGIN=https://yourdomain.com
```

## 🗄️ Database Setup (Optional)

### MongoDB Setup

**Local MongoDB:**
```bash
# Install MongoDB
# Then start service
mongod
```

**MongoDB Atlas (Cloud):**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in .env

## ✨ First Run Checklist

- [ ] All three services running
- [ ] Frontend accessible at localhost:5173
- [ ] Health checks pass on all services
- [ ] Can see algorithm list in frontend
- [ ] Can run an algorithm (e.g., BFS)
- [ ] Results display correctly

## 🆘 Common Issues

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or use different port
PORT=5001 npm run dev
```

### CORS Errors

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**: Check CORS_ORIGIN in backend .env matches frontend URL

### Algorithm Not Found

**Error**: `Algorithm xyz not found`

**Solution**: 
- Ensure AI service is running
- Check algorithm name spelling
- Verify in http://localhost:8000/algorithms

### Module Not Found

**Error**: `ModuleNotFoundError: No module named 'numpy'`

**Solution**:
```bash
# Activate Python environment first
source venv/bin/activate
pip install -r requirements.txt
```

## 📚 Next Steps

1. Read the main [README.md](../README.md)
2. Explore [API.md](./API.md) for API documentation
3. Check [ALGORITHMS.md](./ALGORITHMS.md) for algorithm details
4. Start building features!

## 🆘 Need Help?

1. Check the troubleshooting section above
2. Review error logs in console
3. Check GitHub issues
4. Create a new issue with error details
