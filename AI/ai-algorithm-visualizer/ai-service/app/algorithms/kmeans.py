"""
K-Means Clustering Implementation
"""
import numpy as np
from typing import Dict, Any

def run(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Run K-Means clustering
    
    Expected params:
    - X: data points
    - k: number of clusters
    - max_iterations: maximum iterations
    """
    X = np.array(params.get("X", [[1, 2], [1.5, 1.8], [5, 8], [8, 8], [1, 0.6], [9, 11]]))
    k = int(params.get("k", 2))
    max_iterations = int(params.get("max_iterations", 100))
    
    m, n = X.shape
    
    # Initialize centers randomly
    random_indices = np.random.choice(m, k, replace=False)
    centers = X[random_indices]
    
    steps = []
    
    for iteration in range(max_iterations):
        # Assign clusters
        distances = np.zeros((m, k))
        for j in range(k):
            distances[:, j] = np.sum((X - centers[j]) ** 2, axis=1)
        
        assignments = np.argmin(distances, axis=1)
        
        # Update centers
        new_centers = np.array([X[assignments == j].mean(axis=0) for j in range(k)])
        
        # Check for convergence
        if np.allclose(centers, new_centers):
            centers = new_centers
            steps.append({
                "iteration": iteration,
                "centers": centers.tolist(),
                "assignments": assignments.tolist(),
                "converged": True,
            })
            break
        
        centers = new_centers
        
        # Calculate inertia
        inertia = sum(np.sum((X[assignments == j] - centers[j]) ** 2) for j in range(k))
        
        steps.append({
            "iteration": iteration,
            "centers": centers.tolist(),
            "assignments": assignments.tolist(),
            "inertia": float(inertia),
        })
    
    return {
        "centers": centers.tolist(),
        "assignments": assignments.tolist(),
        "steps": steps,
        "iterations": len(steps),
        "complexity": {
            "time": "O(n*k*d*i)",
            "space": "O(n*d)"
        }
    }
