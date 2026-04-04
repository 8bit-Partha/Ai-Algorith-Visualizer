"""
Decision Tree Implementation
"""
from typing import Dict, Any, List
import numpy as np

def run(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Run Decision Tree
    
    Expected params:
    - X: feature matrix
    - y: target values
    - max_depth: maximum tree depth
    """
    X = np.array(params.get("X", [[2.5], [3.5], [4.0], [5.0]]))
    y = np.array(params.get("y", [0, 0, 1, 1]))
    max_depth = int(params.get("max_depth", 5))
    
    class TreeNode:
        def __init__(self):
            self.feature = None
            self.threshold = None
            self.left = None
            self.right = None
            self.value = None
            self.samples = 0
    
    def build_tree(X, y, depth=0):
        node = TreeNode()
        node.samples = len(y)
        node.value = int(np.bincount(y).argmax())
        
        if depth >= max_depth or len(np.unique(y)) == 1 or len(y) < 2:
            return node
        
        best_gain = 0
        best_feature = None
        best_threshold = None
        
        for feature_idx in range(X.shape[1]):
            feature_values = X[:, feature_idx]
            thresholds = np.unique(feature_values)
            
            for threshold in thresholds:
                left_mask = feature_values < threshold
                right_mask = ~left_mask
                
                if sum(left_mask) == 0 or sum(right_mask) == 0:
                    continue
                
                # Calculate information gain
                left_y = y[left_mask]
                right_y = y[right_mask]
                
                p_left = len(left_y) / len(y)
                p_right = len(right_y) / len(y)
                
                entropy_left = -sum((np.bincount(left_y) / len(left_y)) * np.log2(np.bincount(left_y) / len(left_y) + 1e-10))
                entropy_right = -sum((np.bincount(right_y) / len(right_y)) * np.log2(np.bincount(right_y) / len(right_y) + 1e-10))
                
                weighted_entropy = p_left * entropy_left + p_right * entropy_right
                gain = entropy_left - weighted_entropy
                
                if gain > best_gain:
                    best_gain = gain
                    best_feature = feature_idx
                    best_threshold = threshold
        
        if best_feature is None:
            return node
        
        node.feature = best_feature
        node.threshold = best_threshold
        
        left_mask = X[:, best_feature] < best_threshold
        node.left = build_tree(X[left_mask], y[left_mask], depth + 1)
        node.right = build_tree(X[~left_mask], y[~left_mask], depth + 1)
        
        return node
    
    tree = build_tree(X, y)
    
    def tree_to_dict(node, depth=0):
        if node is None:
            return None
        
        return {
            "feature": node.feature,
            "threshold": float(node.threshold) if node.threshold else None,
            "value": node.value,
            "samples": node.samples,
            "depth": depth,
            "left": tree_to_dict(node.left, depth + 1),
            "right": tree_to_dict(node.right, depth + 1),
        }
    
    return {
        "tree": tree_to_dict(tree),
        "max_depth": max_depth,
        "samples": len(y),
        "complexity": {
            "time": "O(n*log(n)*d)",
            "space": "O(log(n))"
        }
    }
