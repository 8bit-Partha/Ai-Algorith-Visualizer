"""
Breadth First Search (BFS) Algorithm Implementation
Explores graph level by level
"""
from collections import deque
from typing import Dict, List, Any

def run(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Run BFS algorithm
    
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
    queue = deque([start])
    visited.add(start)
    order = [start]
    steps = [{"node": start, "visited": list(visited), "queue": list(queue), "action": "Start"}]
    
    while queue:
        node = queue.popleft()
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
                order.append(neighbor)
                steps.append({
                    "node": neighbor,
                    "parent": node,
                    "visited": list(visited),
                    "queue": list(queue),
                    "action": f"Visit {neighbor} from {node}"
                })
    
    return {
        "traversal_order": order,
        "steps": steps,
        "total_nodes": len(visited),
        "complexity": {
            "time": "O(V + E)",
            "space": "O(V)"
        }
    }
