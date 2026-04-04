# API Documentation

## Base URLs

- **Backend**: `http://localhost:5000/api`
- **AI Service**: `http://localhost:8000`

## Response Format

All responses are in JSON format.

### Success Response
```json
{
  "data": {},
  "message": "Success",
  "status": "ok"
}
```

### Error Response
```json
{
  "error": "Error message",
  "status": 400,
  "details": "Additional details"
}
```

## Algorithms API

### List All Algorithms

**Endpoint**: `GET /api/algorithms`

**Description**: Get list of all available algorithms

**Response**:
```json
{
  "algorithms": [
    {
      "id": "bfs",
      "name": "Breadth First Search",
      "category": "Search",
      "description": "Explores graph level by level"
    },
    {
      "id": "dfs",
      "name": "Depth First Search",
      "category": "Search",
      "description": "Explores graph by going deep first"
    }
  ]
}
```

### Get Algorithm Details

**Endpoint**: `GET /api/algorithms/:name`

**Description**: Get detailed information about a specific algorithm

**Parameters**:
- `name` (string, required): Algorithm identifier (e.g., "bfs", "kmeans")

**Response**:
```json
{
  "id": "bfs",
  "name": "Breadth First Search",
  "category": "Search",
  "description": "Explores graph level by level",
  "complexity": {
    "time": "O(V + E)",
    "space": "O(V)"
  },
  "parameters": {
    "graph": {
      "type": "object",
      "description": "Adjacency list representation"
    },
    "start": {
      "type": "string",
      "description": "Starting node"
    }
  }
}
```

### Run Algorithm

**Endpoint**: `POST /api/algorithms/run`

**Description**: Execute an algorithm with given parameters

**Request Body**:
```json
{
  "algorithm": "bfs",
  "params": {
    "graph": {
      "A": ["B", "C"],
      "B": ["A", "D"],
      "C": ["A", "E"],
      "D": ["B"],
      "E": ["C"]
    },
    "start": "A"
  }
}
```

**Response**:
```json
{
  "success": true,
  "algorithm": "bfs",
  "result": {
    "traversal_order": ["A", "B", "C", "D", "E"],
    "steps": [
      {
        "node": "A",
        "visited": ["A"],
        "queue": ["B", "C"],
        "action": "Start"
      }
    ],
    "total_nodes": 5,
    "complexity": {
      "time": "O(V + E)",
      "space": "O(V)"
    }
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Error Response** (400):
```json
{
  "error": "Algorithm name is required",
  "status": 400
}
```

### Get Algorithm Steps

**Endpoint**: `GET /api/algorithms/:algorithm/steps`

**Description**: Get step-by-step execution breakdown

**Query Parameters**:
- `params` (JSON string, optional): Algorithm parameters

**Response**:
```json
{
  "algorithm": "bfs",
  "steps": [
    {
      "step": 0,
      "node": "A",
      "visited": ["A"],
      "action": "Initialize with start node"
    },
    {
      "step": 1,
      "node": "B",
      "parent": "A",
      "visited": ["A", "B"],
      "action": "Visit B from A"
    }
  ]
}
```

## Algorithm Examples

### Linear Regression

**Request**:
```bash
curl -X POST http://localhost:5000/api/algorithms/run \
  -H "Content-Type: application/json" \
  -d '{
    "algorithm": "linear_regression",
    "params": {
      "X": [[1], [2], [3], [4], [5]],
      "y": [2, 4, 5, 4, 5],
      "learning_rate": 0.01,
      "iterations": 100
    }
  }'
```

**Response**:
```json
{
  "success": true,
  "algorithm": "linear_regression",
  "result": {
    "final_theta": [0.5, 0.8],
    "costs": [0.69, 0.65, 0.54, ...],
    "steps": [
      {
        "iteration": 0,
        "cost": 0.69,
        "theta": [0.01, 0.02]
      }
    ],
    "final_cost": 0.23,
    "complexity": {
      "time": "O(m*n)",
      "space": "O(n)"
    }
  }
}
```

### K-Means Clustering

**Request**:
```bash
curl -X POST http://localhost:5000/api/algorithms/run \
  -H "Content-Type: application/json" \
  -d '{
    "algorithm": "kmeans",
    "params": {
      "X": [[1, 2], [1.5, 1.8], [5, 8], [8, 8], [1, 0.6], [9, 11]],
      "k": 2,
      "max_iterations": 100
    }
  }'
```

**Response**:
```json
{
  "success": true,
  "algorithm": "kmeans",
  "result": {
    "centers": [[1.2, 1.5], [7.3, 9.0]],
    "assignments": [0, 0, 1, 1, 0, 1],
    "steps": [
      {
        "iteration": 0,
        "centers": [[2.1, 2.5], [6.8, 9.0]],
        "assignments": [0, 0, 1, 1, 0, 1],
        "inertia": 15.67
      }
    ],
    "iterations": 5,
    "complexity": {
      "time": "O(n*k*d*i)",
      "space": "O(n*d)"
    }
  }
}
```

### Neural Network

**Request**:
```bash
curl -X POST http://localhost:5000/api/algorithms/run \
  -H "Content-Type: application/json" \
  -d '{
    "algorithm": "neural_network",
    "params": {
      "X": [[0, 0], [0, 1], [1, 0], [1, 1]],
      "y": [0, 1, 1, 0],
      "hidden_size": 4,
      "learning_rate": 0.5,
      "iterations": 100
    }
  }'
```

**Response**:
```json
{
  "success": true,
  "algorithm": "neural_network",
  "result": {
    "final_loss": 0.023,
    "losses": [0.69, 0.65, 0.54, ...],
    "steps": [
      {
        "iteration": 0,
        "loss": 0.69,
        "accuracy": 0.5,
        "weights_w1_norm": 0.45,
        "weights_w2_norm": 0.32
      }
    ],
    "predictions": [0.02, 0.98, 0.97, 0.03],
    "accuracy": 1.0,
    "network_structure": {
      "input_size": 2,
      "hidden_size": 4,
      "output_size": 1
    }
  }
}
```

### Q-Learning

**Request**:
```bash
curl -X POST http://localhost:5000/api/algorithms/run \
  -H "Content-Type: application/json" \
  -d '{
    "algorithm": "q_learning",
    "params": {
      "grid_size": 5,
      "start": [0, 0],
      "goal": [4, 4],
      "learning_rate": 0.1,
      "discount_factor": 0.9,
      "epsilon": 0.1,
      "episodes": 100
    }
  }'
```

**Response**:
```json
{
  "success": true,
  "algorithm": "q_learning",
  "result": {
    "q_table_shape": [25, 4],
    "total_episodes": 100,
    "rewards": [45, 52, 58, ...],
    "episodes_data": [
      {
        "episode": 0,
        "total_reward": 45,
        "steps_count": 8
      }
    ],
    "average_reward": 75.5,
    "complexity": {
      "time": "O(episodes * max_steps * actions)",
      "space": "O(states * actions)"
    }
  }
}
```

## Sessions API

### Save Session

**Endpoint**: `POST /api/sessions`

**Description**: Save an algorithm execution session

**Request Body**:
```json
{
  "name": "My BFS Exploration",
  "algorithm": "bfs",
  "params": {
    "graph": {...},
    "start": "A"
  },
  "results": [...]
}
```

**Response** (201):
```json
{
  "sessionId": "1705315800000",
  "message": "Session saved successfully"
}
```

### Get All Sessions

**Endpoint**: `GET /api/sessions`

**Description**: Retrieve all saved sessions

**Response**:
```json
[
  {
    "id": "1705315800000",
    "name": "My BFS Exploration",
    "algorithm": "bfs",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Get Session by ID

**Endpoint**: `GET /api/sessions/:id`

**Description**: Get details of a specific session

**Parameters**:
- `id` (string, required): Session ID

**Response**:
```json
{
  "id": "1705315800000",
  "name": "My BFS Exploration",
  "algorithm": "bfs",
  "params": {...},
  "results": [...],
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### Delete Session

**Endpoint**: `DELETE /api/sessions/:id`

**Description**: Delete a specific session

**Response**:
```json
{
  "message": "Session deleted successfully"
}
```

## Health Check

**Endpoint**: `GET /api/health`

**Description**: Check backend service health

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 200 | OK | Successful request |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid parameters |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server-side error |
| 503 | Service Unavailable | AI service not responding |

## Rate Limiting

Currently not implemented. Can be added using express-rate-limit middleware.

## Authentication

Currently not implemented. Production setup should include:
- JWT token authentication
- API key management
- Session-based access control

## Example Usage with Axios

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
})

// List algorithms
const algorithms = await api.get('/algorithms')

// Run algorithm
const result = await api.post('/algorithms/run', {
  algorithm: 'bfs',
  params: { graph: {...}, start: 'A' }
})

// Save session
const session = await api.post('/sessions', {
  name: 'My Session',
  algorithm: 'bfs',
  params: {...},
  results: {...}
})
```

## WebSocket Support (Future)

For real-time algorithm execution streaming:

```javascript
const ws = new WebSocket('ws://localhost:5000/ws/algorithm/run')

ws.onmessage = (event) => {
  const step = JSON.parse(event.data)
  // Update visualization in real-time
}

ws.send(JSON.stringify({
  algorithm: 'bfs',
  params: {...}
}))
```
