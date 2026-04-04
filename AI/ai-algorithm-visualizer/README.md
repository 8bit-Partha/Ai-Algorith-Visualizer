# AI Algorithm Visualizer - Production-Ready Application

A comprehensive interactive web platform for visualizing and learning AI and ML algorithms step-by-step.

**Live Demo**: [Coming Soon]  
**Documentation**: See [docs/](./docs/) folder

## ✨ Key Features

### 🎨 Interactive Visualization
- Step-by-step algorithm execution
- Real-time parameter control
- Playback speed adjustment
- Manual step navigation

### 📚 Comprehensive Algorithm Library
- **Search**: BFS, DFS, A*
- **ML**: Linear Regression, Logistic Regression, K-Means, Decision Trees
- **Deep Learning**: Neural Networks with backpropagation
- **RL**: Q-Learning

### 🎯 Educational Features
- Algorithm complexity analysis
- Mathematical formula display
- Step-by-step explanations
- Interactive parameter tuning

### 🏗️ Production Architecture
- React + Vite frontend
- Express backend
- Python FastAPI AI service
- Scalable microservices design

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+

### Installation (3 Steps)

**1. Backend:**
```bash
cd backend
npm install
npm run dev
```

**2. AI Service:**
```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app/main.py
```

**3. Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

## 📊 System Overview

```
┌─────────────────────────────────────────┐
│   React Frontend (Vite)                 │
│   http://localhost:5173                 │
└─────────┬───────────────────────────────┘
          │ API Calls
┌─────────▼───────────────────────────────┐
│   Express Backend                       │
│   http://localhost:5000                 │
└─────────┬───────────────────────────────┘
          │ HTTP
┌─────────▼───────────────────────────────┐
│   FastAPI AI Service                    │
│   http://localhost:8000                 │
└─────────────────────────────────────────┘
```

## 🛠️ Technology Stack

### Frontend
- React 18 - UI Framework
- Vite - Build tool
- TailwindCSS - Styling
- Zustand - State management
- D3.js - Visualizations
- Axios - HTTP client

### Backend
- Express.js - Web framework
- Node.js - Runtime
- Morgan - Logging
- Helmet - Security

### AI Service
- FastAPI - Web framework
- Python 3.8+ - Runtime
- NumPy - Numerical computing
- Scikit-learn - ML utilities

## 📁 Project Structure

```
ai-algorithm-visualizer/
├── frontend/                # React application
├── backend/                 # Express API
├── ai-service/              # Python algorithms
├── docs/                    # Documentation
│   ├── README.md           # Full documentation
│   ├── SETUP.md            # Setup guide
│   ├── API.md              # API reference
│   └── ALGORITHMS.md       # Algorithm details
└── README.md               # This file
```

## 📖 Documentation

- **[Setup Guide](./docs/SETUP.md)** - Detailed installation steps
- **[API Reference](./docs/API.md)** - Complete API documentation
- **[Algorithm Guide](./docs/ALGORITHMS.md)** - Technical details of algorithms
- **[Full README](./docs/README.md)** - Comprehensive documentation

## 🎮 Usage Examples

### Run BFS Algorithm
```javascript
POST /api/algorithms/run
{
  "algorithm": "bfs",
  "params": {
    "graph": {"A": ["B", "C"], "B": ["D"], ...},
    "start": "A"
  }
}
```

### Train Neural Network
```javascript
POST /api/algorithms/run
{
  "algorithm": "neural_network",
  "params": {
    "X": [[0, 0], [0, 1], [1, 0], [1, 1]],
    "y": [0, 1, 1, 0],
    "hidden_size": 4,
    "learning_rate": 0.5,
    "iterations": 100
  }
}
```

### K-Means Clustering
```javascript
POST /api/algorithms/run
{
  "algorithm": "kmeans",
  "params": {
    "X": [[1, 2], [1.5, 1.8], [5, 8], ...],
    "k": 2,
    "max_iterations": 100
  }
}
```

## ✅ Verification

### Check Services
```bash
# Backend
curl http://localhost:5000/api/health

# AI Service
curl http://localhost:8000/health

# Available Algorithms
curl http://localhost:5000/api/algorithms
```

## 🔌 Integration Points

### Frontend ↔ Backend
- REST API calls via Axios
- Session management
- User preferences

### Backend ↔ AI Service
- Algorithm execution requests
- Step-by-step state retrieval
- Result aggregation

## 📊 Algorithms Implemented

| Algorithm | Category | Complexity | Implementation |
|-----------|----------|-----------|-----------------|
| BFS | Search | O(V+E) | ✅ Complete |
| DFS | Search | O(V+E) | ✅ Complete |
| A* | Search | O(b^d) | ✅ Complete |
| Linear Regression | ML | O(m·n) | ✅ Complete |
| Logistic Regression | ML | O(m·n) | ✅ Complete |
| K-Means | ML | O(n·k·d) | ✅ Complete |
| Decision Trees | ML | O(n·log(n)) | ✅ Complete |
| Neural Network | DL | O(m·n·h) | ✅ Complete |
| Q-Learning | RL | O(episodes·steps) | ✅ Complete |

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Run Health Checks
```bash
# All services
./health-check.sh
```

## 🐳 Docker Deployment

```bash
docker-compose up -d
```

Services will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- AI Service: http://localhost:8000

## 🚀 Production Deployment

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

### Backend
```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

### AI Service
```bash
cd ai-service
pip install -r requirements.txt
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port
lsof -i :5000  # Find
kill <PID>     # Kill
```

### CORS Errors
- Check CORS_ORIGIN in backend .env
- Ensure all services are running

### Module Not Found
- Verify virtual environment is activated
- Run `pip install -r requirements.txt`

## 📚 Learning Resources

- [Algorithm Complexity Reference](./docs/ALGORITHMS.md)
- [Machine Learning Basics](./docs/ALGORITHMS.md#machine-learning-algorithms)
- [API Usage Guide](./docs/API.md)

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create pull request

## 📋 Roadmap

- [ ] Real-time WebSocket updates
- [ ] Export visualizations as GIF
- [ ] Algorithm comparison tool
- [ ] GPU acceleration
- [ ] Mobile application
- [ ] Advanced algorithms
- [ ] Performance benchmarking
- [ ] Collaborative sessions

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support & Issues

- **Documentation**: [docs/](./docs/)
- **Setup Help**: [docs/SETUP.md](./docs/SETUP.md)
- **API Issues**: [docs/API.md](./docs/API.md)

## 👨‍💻 Author

Built as a production-ready AI Algorithm Visualizer platform.

---

**Built with ❤️ for learning and visualization of AI algorithms**
