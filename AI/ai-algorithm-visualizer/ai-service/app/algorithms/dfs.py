"""
Depth First Search (DFS) Algorithm Implementation
Explores graph by going deep first
"""
from typing import Dict, List, Any, Set

def run(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Run DFS algorithm
    
    Expected params:
    - graph: adjacency list representation
    - start: starting node
    """
    graph = params.get("graph", {
        "A": ["B", "C"],
        "B": ["A", "D", "E"],
        "C": ["A", "F"],
        "D": ["B"],
        "E": ["B", "F"],
        "F": ["C", "E"]
    })
    start = params.get("start", "A")
    
    visited = set()
    order = []
    steps = []
    
    def dfs_recursive(node: str):
        visited.add(node)
        order.append(node)
        steps.append({
            "node": node,
            "visited": list(visited),
            "action": f"Visit {node}"
        })
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                dfs_recursive(neighbor)
    
    dfs_recursive(start)
    
    return {
        "traversal_order": order,
        "steps": steps,
        "total_nodes": len(visited),
        "complexity": {
            "time": "O(V + E)",
            "space": "O(V)"
        }
    }
