# AI Algorithm Visualizer

A production-ready web application for visualizing and understanding AI and ML algorithms step-by-step.

## 📊 Features

### Algorithm Categories

#### Search Algorithms
- **Breadth First Search (BFS)**: Level-by-level graph exploration
- **Depth First Search (DFS)**: Deep-first graph exploration
- **A* Search**: Heuristic-based pathfinding

#### Machine Learning Algorithms
- **Linear Regression**: Predict continuous values
- **Logistic Regression**: Binary classification
- **K-Means Clustering**: Unsupervised clustering
- **Decision Trees**: Tree-based classification

#### Deep Learning
- **Neural Network**: Simple feedforward network with backpropagation
- Visualization of weight updates and gradient descent

#### Reinforcement Learning
- **Q-Learning**: Model-free RL on grid world

### UI Features
- ✨ Modern, responsive dashboard layout
- 🌓 Dark/Light mode support
- ⏱️ Speed-adjustable animation playback
- 🔄 Manual step-by-step navigation
- 📊 Real-time parameter controls
- 📈 Algorithm complexity analysis
- 💻 Mathematical formula display
- 🎨 Interactive visualizations

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│            Vite + TailwindCSS + D3.js                   │
│  Port: 5173                                              │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/API
┌────────────────────▼────────────────────────────────────┐
│              Backend (Express.js)                        │
│           REST API + Session Management                 │
│  Port: 5000                                              │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/API
┌────────────────────▼────────────────────────────────────┐
│         AI Service (Python + FastAPI)                   │
│         Algorithm Implementations                       │
│  Port: 8000                                              │
└─────────────────────────────────────────────────────────┘
```

## 📁 Folder Structure

```
ai-algorithm-visualizer/
├── frontend/                    # React + Vite application
│   ├── src/
│   │   ├── components/          # UI components
│   │   ├── pages/               # Page components
│   │   ├── store/               # Zustand state management
│   │   ├── utils/               # API utilities
│   │   ├── App.jsx              # Root component
│   │   └── main.jsx             # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                     # Express.js server
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   ├── controllers/         # Business logic
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Express middleware
│   │   ├── models/              # Data models
│   │   ├── utils/               # Utilities
│   │   └── server.js            # Entry point
│   ├── package.json
│   └── .env.example
│
├── ai-service/                  # Python FastAPI service
│   ├── app/
│   │   ├── algorithms/          # Algorithm implementations
│   │   │   ├── bfs.py
│   │   │   ├── dfs.py
│   │   │   ├── a_star.py
│   │   │   ├── linear_regression.py
│   │   │   ├── logistic_regression.py
│   │   │   ├── kmeans.py
│   │   │   ├── decision_tree.py
│   │   │   ├── neural_network.py
│   │   │   └── q_learning.py
│   │   ├── routes/              # API routes
│   │   └── main.py              # FastAPI app entry
│   ├── requirements.txt
│   └── .env.example
│
├── docs/                        # Documentation
│   ├── SETUP.md                 # Setup instructions
│   ├── API.md                   # API documentation
│   └── ALGORITHMS.md            # Algorithm details
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+
- npm or yarn

### Installation & Running

#### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

#### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```

#### 3. AI Service Setup
```bash
cd ai-service
python -m venv venv
# On Windows:
venv\\Scripts\\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python app/main.py
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **AI Service**: http://localhost:8000

## 📚 API Documentation

### Algorithm Endpoints

**List all algorithms:**
```
GET /api/algorithms
```

**Get algorithm details:**
```
GET /api/algorithms/:name
```

**Run an algorithm:**
```
POST /api/algorithms/run
Content-Type: application/json

{
  "algorithm": "bfs",
  "params": {
    "graph": {"A": ["B", "C"], ...},
    "start": "A"
  }
}
```

**Get algorithm steps:**
```
GET /api/algorithms/:algorithm/steps?params=...
```

### Session Endpoints

**Save session:**
```
POST /api/sessions
```

**Get all sessions:**
```
GET /api/sessions
```

**Get session by ID:**
```
GET /api/sessions/:id
```

## 🎯 Algorithm Implementations

### Search Algorithms

#### BFS (Breadth First Search)
- **Complexity**: O(V + E)
- **Use Case**: Finding shortest path in unweighted graphs
- **Input**: Graph adjacency list, start node

#### DFS (Depth First Search)
- **Complexity**: O(V + E)
- **Use Case**: Topological sorting, connected components
- **Input**: Graph adjacency list, start node

#### A* Search
- **Complexity**: O(b^d) where b is branching factor, d is depth
- **Use Case**: Shortest path with heuristics
- **Input**: Grid size, start, goal, obstacles

### Machine Learning Algorithms

#### Linear Regression
- **Complexity**: O(m*n) where m is samples, n is features
- **Formula**: ŷ = θ₀ + θ₁x₁ + ... + θₙxₙ
- **Learning**: Gradient descent optimization

#### Logistic Regression
- **Complexity**: O(m*n)
- **Formula**: P(y=1|x) = 1/(1 + e^(-z))
- **Use Case**: Binary classification

#### K-Means Clustering
- **Complexity**: O(n*k*d*i) where i is iterations
- **Algorithm**: Iterative centroid update
- **Parameters**: Number of clusters k

#### Decision Trees
- **Complexity**: O(n*log(n)*d)
- **Criterion**: Information gain (entropy)
- **Use Case**: Classification and regression

### Neural Networks

#### Feedforward Network
- **Architecture**: Input → Hidden → Output
- **Activation**: Sigmoid function
- **Learning**: Backpropagation
- **Loss**: Binary cross-entropy

### Reinforcement Learning

#### Q-Learning
- **Complexity**: O(episodes * max_steps * actions)
- **Formula**: Q(s,a) ← Q(s,a) + α[r + γ*max(Q(s',a')) - Q(s,a)]
- **Environment**: Grid world with goal state

## 🛠️ Technology Stack

### Frontend
- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **TailwindCSS**: Utility-first CSS
- **Zustand**: Lightweight state management
- **D3.js**: Data visualization
- **Recharts**: Chart library
- **Axios**: HTTP client

### Backend
- **Express.js**: Web framework
- **Node.js**: Runtime
- **Morgan**: Logging middleware
- **Helmet**: Security middleware
- **Cors**: Cross-origin resource sharing

### AI Service
- **FastAPI**: Modern Python web framework
- **Uvicorn**: ASGI server
- **NumPy**: Numerical computations
- **Scikit-learn**: ML algorithms
- **Matplotlib**: Visualization

## 📊 Example Usage

### Running BFS Algorithm
```javascript
const result = await algorithmAPI.runAlgorithm('bfs', {
  graph: {
    A: ['B', 'C'],
    B: ['A', 'D'],
    C: ['A', 'E'],
    D: ['B'],
    E: ['C']
  },
  start: 'A'
})

// Result:
{
  traversal_order: ['A', 'B', 'C', 'D', 'E'],
  steps: [
    { node: 'A', visited: ['A'], ... },
    { node: 'B', visited: ['A', 'B'], ... },
    ...
  ],
  total_nodes: 5,
  complexity: { time: 'O(V + E)', space: 'O(V)' }
}
```

### Training Neural Network
```javascript
const result = await algorithmAPI.runAlgorithm('neural_network', {
  X: [[0, 0], [0, 1], [1, 0], [1, 1]],
  y: [0, 1, 1, 0],
  hidden_size: 4,
  learning_rate: 0.5,
  iterations: 100
})

// Result includes:
{
  final_loss: 0.023,
  losses: [0.69, 0.65, 0.54, ...],
  predictions: [0.02, 0.98, 0.97, 0.03],
  accuracy: 1.0,
  steps: [...]
}
```

## 🧪 Testing & Verification

### Backend Tests
```bash
cd backend
npm test
```

### Run Health Checks
```bash
# Frontend
curl http://localhost:5173

# Backend
curl http://localhost:5000/api/health

# AI Service
curl http://localhost:8000/health
```

## 🐛 Troubleshooting

### Frontend won't connect to backend
- Check that backend is running on port 5000
- Verify CORS is enabled in backend server.js
- Check proxy configuration in vite.config.js

### AI service errors
- Verify Python environment is activated
- Install all requirements: `pip install -r requirements.txt`
- Check port 8000 is not in use

### Algorithm not running
- Check error messages in browser console
- Verify all parameters are in correct format
- Check AI service logs for detailed errors

## 🔮 Future Enhancements

- [ ] Real-time collaboration with WebSockets
- [ ] Export visualizations as GIF/PNG
- [ ] Algorithm performance benchmarking
- [ ] Custom graph drawing tool
- [ ] Interactive neural network architecture builder
- [ ] More algorithms (bubble sort, quicksort, etc.)
- [ ] Advanced ML algorithms (SVM, Random Forest)
- [ ] GPU acceleration for large datasets
- [ ] Mobile app version
- [ ] Algorithm comparison tool

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.

## 📞 Support

For issues and questions, please create an issue in the GitHub repository.
