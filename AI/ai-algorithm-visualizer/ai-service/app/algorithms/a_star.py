"""
A* Search Algorithm Implementation
Heuristic-based pathfinding
"""
import heapq
from typing import Dict, Any, Tuple

def run(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Run A* algorithm on a grid
    
    Expected params:
    - grid_size: size of grid
    - start: (x, y) start position
    - goal: (x, y) goal position
    - obstacles: list of (x, y) obstacle positions
    """
    grid_size = params.get("grid_size", 10)
    start = tuple(params.get("start", (0, 0)))
    goal = tuple(params.get("goal", (9, 9)))
    obstacles = set(tuple(obs) for obs in params.get("obstacles", []))
    
    def heuristic(pos: Tuple[int, int]) -> int:
        """Manhattan distance heuristic"""
        return abs(pos[0] - goal[0]) + abs(pos[1] - goal[1])
    
    def get_neighbors(pos: Tuple[int, int]):
        """Get valid neighbors"""
        x, y = pos
        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < grid_size and 0 <= ny < grid_size and (nx, ny) not in obstacles:
                yield (nx, ny)
    
    open_set = [(heuristic(start), 0, start)]
    came_from = {}
    g_score = {start: 0}
    visited = set()
    steps = []
    
    while open_set:
        _, current_g, current = heapq.heappop(open_set)
        
        if current in visited:
            continue
        
        visited.add(current)
        steps.append({
            "current": current,
            "visited": list(visited),
            "g_score": dict((str(k), v) for k, v in g_score.items()),
        })
        
        if current == goal:
            path = []
            node = goal
            while node in came_from:
                path.append(node)
                node = came_from[node]
            path.append(start)
            path.reverse()
            
            return {
                "path": path,
                "path_length": len(path),
                "steps": steps,
                "visited_count": len(visited),
                "complexity": {
                    "time": "O(b^d)",
                    "space": "O(b^d)"
                }
            }
        
        for neighbor in get_neighbors(current):
            tentative_g = g_score[current] + 1
            
            if neighbor not in g_score or tentative_g < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f_score = tentative_g + heuristic(neighbor)
                heapq.heappush(open_set, (f_score, tentative_g, neighbor))
    
    return {
        "path": [],
        "path_length": 0,
        "steps": steps,
        "visited_count": len(visited),
        "message": "No path found"
    }
