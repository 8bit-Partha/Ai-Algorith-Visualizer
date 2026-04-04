"""
Linear Regression Implementation
"""
import numpy as np
from typing import Dict, Any

def run(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Run linear regression
    
    Expected params:
    - X: feature matrix
    - y: target values
    - learning_rate: learning rate
    - iterations: number of iterations
    """
    X = np.array(params.get("X", [[1], [2], [3], [4], [5]]))
    y = np.array(params.get("y", [2, 4, 5, 4, 5]))
    learning_rate = float(params.get("learning_rate", 0.01))
    iterations = int(params.get("iterations", 100))
    
    m, n = X.shape
    theta = np.zeros((n, 1))
    costs = []
    steps = []
    
    # Add bias term
    X = np.hstack([np.ones((m, 1)), X])
    
    for i in range(iterations):
        h = X.dot(theta)
        error = h - y.reshape(-1, 1)
        cost = np.sum(error ** 2) / (2 * m)
        costs.append(float(cost))
        
        gradient = X.T.dot(error) / m
        theta -= learning_rate * gradient
        
        steps.append({
            "iteration": i,
            "cost": float(cost),
            "theta": [float(t) for t in theta.flatten()],
        })
    
    return {
        "final_theta": [float(t) for t in theta.flatten()],
        "costs": costs,
        "steps": steps,
        "final_cost": float(costs[-1]),
        "complexity": {
            "time": "O(m*n)",
            "space": "O(n)"
        }
    }
