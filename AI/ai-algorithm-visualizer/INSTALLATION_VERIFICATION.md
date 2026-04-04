# AI Algorithm Visualizer - Complete Installation & Verification Guide

## 📋 Pre-Installation Checklist

- [ ] Node.js v16+ installed
- [ ] Python 3.8+ installed
- [ ] npm/yarn available
- [ ] pip available
- [ ] Git installed (optional)
- [ ] ~500MB disk space available

### Verify installations (Windows/Mac/Linux):
```bash
node --version
npm --version
python --version
pip --version
```

---

## 🚀 Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd c:/Users/Admin/OneDrive/Desktop/AI/ai-algorithm-visualizer
```

### Step 2: Run Setup Script

**Windows:**
```bash
setup.bat
```

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**Manual Setup:**

**Backend:**
```bash
cd backend
npm install
```

**AI Service:**
```bash
cd ../ai-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Frontend:**
```bash
cd ../frontend
npm install
```

---

## ▶️ Running the Application

### Option 1: Run All Services at Once (Unix/macOS/Linux)
```bash
./start-all.sh
```

### Option 2: Run Each Service in Separate Terminal

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
```

**Terminal 2 - AI Service:**
```bash
cd ai-service
source venv/bin/activate  # Windows: venv\Scripts\activate
python app/main.py
```

Expected output:
```
Uvicorn running on http://0.0.0.0:8000
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v4.4.9  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Option 3: Docker Compose
```bash
docker-compose up -d
```

---

## ✅ Verification Steps

### 1. Check All Services Are Running

**Backend Health:**
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"ok","timestamp":"2024-01-15T10:30:00.000Z"}
```

**AI Service Health:**
```bash
curl http://localhost:8000/health
```

Expected response:
```json
{"status":"ok","timestamp":"2024-01-15T10:30:00.000Z"}
```

**Frontend:**
- Open http://localhost:5173 in browser
- You should see the "Algorithm Visualizer" interface

### 2. List Available Algorithms

```bash
curl http://localhost:5000/api/algorithms
```

Expected response includes algorithms like BFS, DFS, A*, etc.

### 3. Test Single Algorithm Execution

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

Expected response should include:
```json
{
  "success": true,
  "algorithm": "bfs",
  "result": {
    "traversal_order": ["A", "B", "C", "D", "E"],
    ...
  }
}
```

### 4. Test Frontend UI

1. Open http://localhost:5173
2. Verify you see the Dashboard with:
   - Left sidebar with algorithm list
   - Algorithm selector
   - Parameter panel
   - Control panel
   - Visualization area
   - Explanation panel

3. Click on an algorithm (e.g., "Breadth First Search")
4. Click "Run Algorithm" button
5. Verify visualization updates and steps appear

### 5. Run Automated Health Check

```bash
./health-check.sh
```

Expected output:
```
✅ Backend: OK
✅ AI Service: OK
✅ Frontend: OK
✅ Algorithm Execution: OK
```

---

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### AI Service Tests
```bash
cd ai-service
python tests.py
```

Both should show "✅ All tests passed!"

---

## 🐛 Troubleshooting

### Issue: Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process on port
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or use different port
PORT=5001 npm run dev
```

### Issue: Module Not Found (Frontend)

**Error:** `Module not found: axios`

**Solution:**
```bash
cd frontend
npm install
npm run dev
```

### Issue: Python Virtual Environment Not Activating

**Error:** `python: command not found` or `ModuleNotFoundError`

**Solution:**
```bash
cd ai-service
# Delete old venv
rm -rf venv  # macOS/Linux
rmdir /s /q venv  # Windows

# Create fresh venv
python3 -m venv venv  # macOS/Linux
python -m venv venv   # Windows

# Activate
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate      # Windows

# Install packages
pip install -r requirements.txt
```

### Issue: CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Verify CORS_ORIGIN in backend/.env matches frontend URL
- Check backend is running on correct port
- Verify CORS middleware is enabled in server.js

### Issue: Frontend Can't Connect to Backend

**Error:** `Failed to fetch algorithms` or network errors in console

**Solution:**
1. Verify backend is running: `curl http://localhost:5000/api/health`
2. Check VITE proxy in vite.config.js
3. Verify firewall isn't blocking port 5000
4. Check console errors for specific message

### Issue: AI Service Errors

**Error:** Algorithm execution fails

**Solution:**
1. Verify AI service is running: `curl http://localhost:8000/health`
2. Check AI service logs for errors
3. Verify NumPy/SciPy are installed: `pip list | grep numpy`
4. Re-install requirements: `pip install -r requirements.txt --force-reinstall`

---

## 📚 File Structure Verification

Verify all files are created:

```
✓ frontend/
  ✓ src/
    ✓ components/
    ✓ pages/
    ✓ store/
    ✓ utils/
  ✓ package.json
  ✓ vite.config.js

✓ backend/
  ✓ src/
    ✓ config/
    ✓ controllers/
    ✓ routes/
  ✓ package.json
  ✓ .env

✓ ai-service/
  ✓ app/
    ✓ algorithms/
    ✓ main.py
  ✓ requirements.txt
  ✓ .env

✓ docs/
  ✓ README.md
  ✓ SETUP.md
  ✓ API.md
  ✓ ALGORITHMS.md
```

---

## 🎯 First Algorithm Test

### In Frontend UI:

1. **Select Algorithm**: Click "Breadth First Search" in left sidebar
2. **Set Parameters**: 
   - Grid Size: 10
   - Learning Rate: 0.01
   - Iterations: 100
3. **Run**: Click "Run Algorithm" button
4. **Verify**:
   - No errors in console
   - Visualization shows steps
   - Steps shown at bottom
   - Can navigate with slider

### Via cURL:

```bash
curl -X POST http://localhost:5000/api/algorithms/run \
  -H "Content-Type: application/json" \
  -d '{
    "algorithm": "linear_regression",
    "params": {
      "X": [[1], [2], [3], [4], [5]],
      "y": [2, 4, 5, 4, 5],
      "learning_rate": 0.01,
      "iterations": 10
    }
  }' | jq '.'
```

---

## 📊 Expected Services Status

All running:
```
✓ Backend:    http://localhost:5000    [Express]
✓ AI Service: http://localhost:8000    [FastAPI]
✓ Frontend:   http://localhost:5173    [React/Vite]
```

---

## 🔒 Security Notes

### Development vs Production

**Development (.env used):**
```
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Production (update before deploying):**
```
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

### Before Production
- [ ] Update all secrets/keys
- [ ] Enable HTTPS
- [ ] Setup authentication
- [ ] Configure rate limiting
- [ ] Enable logging
- [ ] Setup monitoring
- [ ] Configure database
- [ ] Review security headers

---

## 📈 Performance Tips

1. **Frontend**: Vite handles hot module reloading
2. **Backend**: Morgan logs HTTP requests efficiently
3. **AI Service**: Algorithm optimization is built-in
4. **Overall**: All services are optimized for development

---

## 🎓 Next Steps

1. ✅ **Setup Complete** - All services running
2. **Explore UI** - Click algorithms, run them
3. **Read Docs** - Check [docs/](../docs/) folder
4. **Modify Code** - Customize algorithms
5. **Deploy** - Use Docker or production builds
6. **Extend** - Add more algorithms

---

## 📝 Documentation Links

- **Main README**: [README.md](../README.md)
- **Setup Guide**: [docs/SETUP.md](../docs/SETUP.md)
- **API Reference**: [docs/API.md](../docs/API.md)
- **Algorithm Details**: [docs/ALGORITHMS.md](../docs/ALGORITHMS.md)
- **Progress Report**: [PROGRESS.md](../PROGRESS.md)

---

## 🆘 Getting Help

1. Check error messages in console
2. Review troubleshooting section above
3. Check documentation in [docs/](../docs/)
4. Verify all prerequisites are installed
5. Ensure all three services are running

---

## ✨ Success Indicators

You'll know everything is working when:

- ✅ Frontend loads at http://localhost:5173
- ✅ Algorithm list displays in UI
- ✅ Can select and run algorithms
- ✅ Results display in visualization
- ✅ No errors in console
- ✅ Smooth playback of algorithm steps
- ✅ Parameters update visualization
- ✅ Dark mode toggle works
- ✅ Can save sessions

---

**🎉 Congratulations! Your AI Algorithm Visualizer is ready to use!**

For detailed documentation, see the [docs](../docs/) folder.
