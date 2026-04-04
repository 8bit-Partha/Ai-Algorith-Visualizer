"""
Logistic Regression Implementation
"""
import numpy as np
from typing import Dict, Any

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def run(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Run logistic regression
    
    Expected params:
    - X: feature matrix
    - y: binary target values
    - learning_rate: learning rate
    - iterations: number of iterations
    """
    X = np.array(params.get("X", [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]))
    y = np.array(params.get("y", [0, 0, 1, 1, 1]))
    learning_rate = float(params.get("learning_rate", 0.01))
    iterations = int(params.get("iterations", 100))
    
    m, n = X.shape
    theta = np.zeros((n + 1, 1))
    costs = []
    steps = []
    
    X = np.hstack([np.ones((m, 1)), X])
    
    for i in range(iterations):
        h = sigmoid(X.dot(theta))
        error = h - y.reshape(-1, 1)
        cost = -np.mean(y * np.log(h + 1e-8) + (1 - y) * np.log(1 - h + 1e-8))
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
