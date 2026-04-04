"""
Neural Network Implementation
"""
import numpy as np
from typing import Dict, Any

def sigmoid(z):
    return 1 / (1 + np.exp(-np.clip(z, -500, 500)))

def sigmoid_derivative(z):
    s = sigmoid(z)
    return s * (1 - s)

def run(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Run simple feedforward neural network
    
    Expected params:
    - X: input data
    - y: target output
    - hidden_size: number of hidden nodes
    - learning_rate: learning rate
    - iterations: training iterations
    """
    X = np.array(params.get("X", [[0, 0], [0, 1], [1, 0], [1, 1]]))
    y = np.array(params.get("y", [0, 1, 1, 0]))
    hidden_size = int(params.get("hidden_size", 4))
    learning_rate = float(params.get("learning_rate", 0.5))
    iterations = int(params.get("iterations", 100))
    
    m, input_size = X.shape
    output_size = 1
    
    # Initialize weights and biases
    W1 = np.random.randn(input_size, hidden_size) * 0.01
    b1 = np.zeros((1, hidden_size))
    W2 = np.random.randn(hidden_size, output_size) * 0.01
    b2 = np.zeros((1, output_size))
    
    losses = []
    steps = []
    
    for iteration in range(iterations):
        # Forward propagation
        z1 = X.dot(W1) + b1
        a1 = sigmoid(z1)
        z2 = a1.dot(W2) + b2
        a2 = sigmoid(z2)
        
        # Calculate loss
        loss = -np.mean(y * np.log(a2 + 1e-8) + (1 - y) * np.log(1 - a2 + 1e-8))
        losses.append(float(loss))
        
        # Backward propagation
        dz2 = a2 - y.reshape(-1, 1)
        dW2 = a1.T.dot(dz2) / m
        db2 = np.sum(dz2, axis=0, keepdims=True) / m
        
        da1 = dz2.dot(W2.T)
        dz1 = da1 * sigmoid_derivative(z1)
        dW1 = X.T.dot(dz1) / m
        db1 = np.sum(dz1, axis=0, keepdims=True) / m
        
        # Update weights
        W1 -= learning_rate * dW1
        b1 -= learning_rate * db1
        W2 -= learning_rate * dW2
        b2 -= learning_rate * db2
        
        if iteration % 10 == 0:
            steps.append({
                "iteration": iteration,
                "loss": float(loss),
                "accuracy": float(np.mean((a2 > 0.5).reshape(-1) == y)),
                "weights_w1_norm": float(np.linalg.norm(W1)),
                "weights_w2_norm": float(np.linalg.norm(W2)),
            })
    
    # Make predictions
    z1 = X.dot(W1) + b1
    a1 = sigmoid(z1)
    z2 = a1.dot(W2) + b2
    predictions = sigmoid(z2)
    
    return {
        "final_loss": float(losses[-1]),
        "losses": losses,
        "steps": steps,
        "predictions": predictions.flatten().tolist(),
        "accuracy": float(np.mean((predictions > 0.5).reshape(-1) == y)),
        "network_structure": {
            "input_size": input_size,
            "hidden_size": hidden_size,
            "output_size": output_size,
        },
        "complexity": {
            "time": "O(m*n*h*i)",
            "space": "O(n*h + h*o)"
        }
    }
