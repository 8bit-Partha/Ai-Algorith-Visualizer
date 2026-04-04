from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import numpy as np
from datetime import datetime
import logging

from app.algorithms import (
    bfs, dfs, a_star,
    linear_regression, logistic_regression, kmeans,
    decision_tree, neural_network, q_learning
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="AI Algorithm Visualizer Service")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class AlgorithmParams(BaseModel):
    params: Dict[str, Any]

class AlgorithmRun(BaseModel):
    algorithm: str
    params: Dict[str, Any]

# Algorithm registry
ALGORITHM_REGISTRY = {
    "bfs": {
        "name": "Breadth First Search",
        "category": "Search",
        "description": "Explores graph level by level",
        "handler": bfs.run,
    },
    "dfs": {
        "name": "Depth First Search",
        "category": "Search",
        "description": "Explores graph by going deep first",
        "handler": dfs.run,
    },
    "a_star": {
        "name": "A* Search",
        "category": "Search",
        "description": "Heuristic-based pathfinding algorithm",
        "handler": a_star.run,
    },
    "linear_regression": {
        "name": "Linear Regression",
        "category": "Machine Learning",
        "description": "Fits a linear model to data",
        "handler": linear_regression.run,
    },
    "logistic_regression": {
        "name": "Logistic Regression",
        "category": "Machine Learning",
        "description": "Binary classification using logistic function",
        "handler": logistic_regression.run,
    },
    "kmeans": {
        "name": "K-Means Clustering",
        "category": "Machine Learning",
        "description": "Clusters data into K groups",
        "handler": kmeans.run,
    },
    "decision_tree": {
        "name": "Decision Tree",
        "category": "Machine Learning",
        "description": "Tree-based classification algorithm",
        "handler": decision_tree.run,
    },
    "neural_network": {
        "name": "Neural Network",
        "category": "Deep Learning",
        "description": "Simple feedforward neural network",
        "handler": neural_network.run,
    },
    "q_learning": {
        "name": "Q-Learning",
        "category": "Reinforcement Learning",
        "description": "Model-free RL algorithm",
        "handler": q_learning.run,
    },
}

@app.get("/health")
async def health_check():
    return {"status": "ok", "timestamp": datetime.now().isoformat()}

@app.get("/algorithms")
async def list_algorithms():
    """List all available algorithms"""
    algorithms = []
    for key, value in ALGORITHM_REGISTRY.items():
        algorithms.append({
            "id": key,
            "name": value["name"],
            "category": value["category"],
            "description": value["description"],
        })
    return {"algorithms": algorithms}

@app.get("/algorithm/{algorithm_name}")
async def get_algorithm_details(algorithm_name: str):
    """Get detailed information about an algorithm"""
    if algorithm_name not in ALGORITHM_REGISTRY:
        raise HTTPException(status_code=404, detail="Algorithm not found")
    
    algo = ALGORITHM_REGISTRY[algorithm_name]
    return {
        "id": algorithm_name,
        "name": algo["name"],
        "category": algo["category"],
        "description": algo["description"],
    }

@app.post("/run/{algorithm_name}")
async def run_algorithm(algorithm_name: str, request: AlgorithmParams):
    """Run an algorithm with given parameters"""
    try:
        if algorithm_name not in ALGORITHM_REGISTRY:
            raise HTTPException(status_code=404, detail="Algorithm not found")
        
        logger.info(f"Running {algorithm_name} with params: {request.params}")
        
        handler = ALGORITHM_REGISTRY[algorithm_name]["handler"]
        result = handler(request.params)
        
        return {
            "success": True,
            "algorithm": algorithm_name,
            "result": result,
            "timestamp": datetime.now().isoformat(),
        }
    except Exception as e:
        logger.error(f"Error running {algorithm_name}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/steps/{algorithm_name}")
async def get_algorithm_steps(algorithm_name: str):
    """Get step-by-step execution details"""
    if algorithm_name not in ALGORITHM_REGISTRY:
        raise HTTPException(status_code=404, detail="Algorithm not found")
    
    # Placeholder implementation
    return {
        "algorithm": algorithm_name,
        "steps": [
            {"step": 0, "description": "Initialize data structures"},
            {"step": 1, "description": "Begin algorithm execution"},
            {"step": 2, "description": "Process iterations"},
        ],
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
