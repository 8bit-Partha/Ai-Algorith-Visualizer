"""
Unit tests for algorithms
"""
import sys
sys.path.insert(0, '../')

from app.algorithms import bfs, dfs, a_star
from app.algorithms import linear_regression, logistic_regression, kmeans
from app.algorithms import neural_network, q_learning

def test_bfs():
    """Test BFS algorithm"""
    params = {
        "graph": {"A": ["B", "C"], "B": ["D"], "C": ["E"], "D": [], "E": []},
        "start": "A"
    }
    result = bfs.run(params)
    
    assert "traversal_order" in result
    assert result["traversal_order"][0] == "A"
    assert len(result["steps"]) > 0
    assert result["complexity"]["time"] == "O(V + E)"

def test_dfs():
    """Test DFS algorithm"""
    params = {
        "graph": {"A": ["B", "C"], "B": ["D"], "C": ["E"], "D": [], "E": []},
        "start": "A"
    }
    result = dfs.run(params)
    
    assert "traversal_order" in result
    assert result["traversal_order"][0] == "A"
    assert len(result["steps"]) > 0

def test_a_star():
    """Test A* algorithm"""
    params = {
        "grid_size": 5,
        "start": [0, 0],
        "goal": [4, 4],
        "obstacles": [[2, 2]]
    }
    result = a_star.run(params)
    
    assert "path" in result
    assert "steps" in result
    assert "visited_count" in result

def test_linear_regression():
    """Test Linear Regression"""
    params = {
        "X": [[1], [2], [3], [4], [5]],
        "y": [2, 4, 5, 4, 5],
        "learning_rate": 0.01,
        "iterations": 10
    }
    result = linear_regression.run(params)
    
    assert "final_theta" in result
    assert "costs" in result
    assert len(result["costs"]) == 10
    assert result["costs"][-1] < result["costs"][0]  # Cost should decrease

def test_logistic_regression():
    """Test Logistic Regression"""
    params = {
        "X": [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
        "y": [0, 0, 1, 1, 1],
        "learning_rate": 0.01,
        "iterations": 10
    }
    result = logistic_regression.run(params)
    
    assert "final_theta" in result
    assert "costs" in result
    assert len(result["costs"]) == 10

def test_kmeans():
    """Test K-Means Clustering"""
    params = {
        "X": [[1, 2], [1.5, 1.8], [5, 8], [8, 8], [1, 0.6], [9, 11]],
        "k": 2,
        "max_iterations": 10
    }
    result = kmeans.run(params)
    
    assert "centers" in result
    assert "assignments" in result
    assert len(result["centers"]) == 2
    assert len(result["assignments"]) == 6

def test_neural_network():
    """Test Neural Network"""
    params = {
        "X": [[0, 0], [0, 1], [1, 0], [1, 1]],
        "y": [0, 1, 1, 0],
        "hidden_size": 4,
        "learning_rate": 0.5,
        "iterations": 10
    }
    result = neural_network.run(params)
    
    assert "final_loss" in result
    assert "losses" in result
    assert "predictions" in result
    assert "accuracy" in result
    assert len(result["losses"]) == 10

def test_q_learning():
    """Test Q-Learning"""
    params = {
        "grid_size": 5,
        "start": [0, 0],
        "goal": [4, 4],
        "learning_rate": 0.1,
        "discount_factor": 0.9,
        "episodes": 5
    }
    result = q_learning.run(params)
    
    assert "q_table_shape" in result
    assert "rewards" in result
    assert len(result["rewards"]) == 5
    assert "average_reward" in result

if __name__ == "__main__":
    test_bfs()
    test_dfs()
    test_a_star()
    test_linear_regression()
    test_logistic_regression()
    test_kmeans()
    test_neural_network()
    test_q_learning()
    
    print("✅ All tests passed!")
