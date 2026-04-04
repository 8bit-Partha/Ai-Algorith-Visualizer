# Algorithm Details

## Search Algorithms

### Breadth First Search (BFS)

**Category**: Graph Search  
**Time Complexity**: O(V + E) where V is vertices, E is edges  
**Space Complexity**: O(V)  
**Use Cases**: Shortest path in unweighted graphs, level-order traversal

**How It Works**:
1. Start at a source node
2. Visit all immediate neighbors (distance 1)
3. Then visit all neighbors at distance 2
4. Continue until all reachable nodes are visited

**Algorithm**:
```
BFS(graph, start):
  queue = [start]
  visited = {start}
  
  while queue not empty:
    node = queue.pop()
    
    for neighbor in graph[node]:
      if neighbor not in visited:
        visited.add(neighbor)
        queue.append(neighbor)
```

**Example Input**:
```json
{
  "graph": {
    "A": ["B", "C"],
    "B": ["A", "D", "E"],
    "C": ["A", "F"],
    "D": ["B"],
    "E": ["B", "F"],
    "F": ["C", "E"]
  },
  "start": "A"
}
```

**Expected Output**:
```json
{
  "traversal_order": ["A", "B", "C", "D", "E", "F"],
  "steps": [...]
}
```

---

### Depth First Search (DFS)

**Category**: Graph Search  
**Time Complexity**: O(V + E)  
**Space Complexity**: O(V) for recursion stack  
**Use Cases**: Topological sort, detecting cycles, connected components

**How It Works**:
1. Start at a source node
2. Go as deep as possible along each branch
3. Backtrack when hitting a dead end
4. Continue with unexplored branches

**Algorithm**:
```
DFS(graph, node, visited):
  visited.add(node)
  
  for neighbor in graph[node]:
    if neighbor not in visited:
      DFS(graph, neighbor, visited)
```

**Key Differences from BFS**:
- DFS uses stack (implicit via recursion)
- BFS uses queue
- DFS explores deeper, BFS explores broader

---

### A* Search

**Category**: Informed Graph Search  
**Time Complexity**: O(b^d) where b is branching factor, d is depth  
**Space Complexity**: O(b^d)  
**Use Cases**: Pathfinding in games, robotics, GPS navigation

**How It Works**:
1. Evaluate nodes using f(n) = g(n) + h(n)
   - g(n): Cost from start to node n
   - h(n): Heuristic estimate from n to goal
2. Always expand node with lowest f(n)
3. Continue until goal is reached

**Algorithm**:
```
A*(graph, start, goal, heuristic):
  open_set = {start}
  g_score = {start: 0}
  f_score = {start: heuristic(start, goal)}
  
  while open_set not empty:
    current = node in open_set with lowest f_score(node)
    
    if current == goal:
      return reconstruct_path(current)
    
    for neighbor in graph[current]:
      tentative_g = g_score[current] + cost(current, neighbor)
      
      if neighbor not in g_score or tentative_g < g_score[neighbor]:
        g_score[neighbor] = tentative_g
        f_score[neighbor] = g_score[neighbor] + heuristic(neighbor, goal)
        open_set.add(neighbor)
```

**Heuristic Function** (Manhattan Distance):
```
h(node) = |node.x - goal.x| + |node.y - goal.y|
```

---

## Machine Learning Algorithms

### Linear Regression

**Category**: Supervised Learning - Regression  
**Time Complexity**: O(m*n) per iteration  
**Space Complexity**: O(n)  
**Use Cases**: Price prediction, trend analysis, continuous value prediction

**Mathematical Formula**:
```
ŷ = θ₀ + θ₁x₁ + θ₂x₂ + ... + θₙxₙ

Cost Function: J(θ) = (1/2m) Σ(ŷᵢ - yᵢ)²

Gradient: ∂J/∂θⱼ = (1/m) Σ(ŷᵢ - yᵢ)xⱼ

Update: θⱼ := θⱼ - α * ∂J/∂θⱼ
```

**Algorithm Steps**:
1. Initialize weights θ to small random values
2. For each iteration:
   - Calculate predictions: ŷ = X·θ
   - Calculate error: ŷ - y
   - Calculate gradient
   - Update weights: θ := θ - α·∇J
3. Repeat until convergence

**Key Parameters**:
- **Learning Rate (α)**: Step size for weight updates, typically 0.01-0.1
- **Iterations**: Number of update cycles, typically 100-1000
- **Convergence**: When cost changes < threshold

---

### Logistic Regression

**Category**: Supervised Learning - Classification  
**Time Complexity**: O(m*n)  
**Space Complexity**: O(n)  
**Use Cases**: Binary classification, spam detection, disease diagnosis

**Mathematical Formula**:
```
Sigmoid Function: σ(z) = 1 / (1 + e^(-z))

Hypothesis: hθ(x) = σ(θ^T·x)

Cost Function: J(θ) = -(1/m) Σ[yᵢ·log(hθ(xᵢ)) + (1-yᵢ)·log(1-hθ(xᵢ))]

Decision Boundary: y = 1 if hθ(x) ≥ 0.5, else y = 0
```

**Algorithm Steps**:
1. Initialize weights θ
2. For each iteration:
   - Calculate predictions using sigmoid
   - Calculate log loss
   - Update weights using gradient descent
3. Make predictions by applying threshold (0.5)

---

### K-Means Clustering

**Category**: Unsupervised Learning - Clustering  
**Time Complexity**: O(n*k*d*i) where i is iterations  
**Space Complexity**: O(n*d)  
**Use Cases**: Customer segmentation, image compression, pattern discovery

**Algorithm Steps**:
```
K-Means(X, k, max_iterations):
  1. Randomly initialize k centroids
  
  2. For each iteration:
     a. Assign each point to nearest centroid
     b. Calculate new centroids as cluster mean
     c. If centroids converged, stop
  
  3. Return cluster assignments
```

**Key Metrics**:
```
Inertia: Σ ||xⱼ - cᵢ||² (sum of squared distances)

Silhouette Score: (b - a) / max(a, b)
  - a: avg distance to points in same cluster
  - b: avg distance to points in nearest cluster
```

**Choosing k**:
- Elbow method: Plot inertia vs k, look for "elbow"
- Silhouette analysis: Look for highest average silhouette score
- Domain knowledge: Use problem context

---

### Decision Trees

**Category**: Supervised Learning - Classification/Regression  
**Time Complexity**: O(n·log(n)·d) for training  
**Space Complexity**: O(log(n))  
**Use Cases**: Credit approval, medical diagnosis, feature importance

**How It Works**:
1. Start with all data at root
2. For each node, find best split:
   - Information Gain: IG = Entropy(parent) - Σ(weighted entropy of children)
   - Entropy: H(S) = -Σ pᵢ·log₂(pᵢ)
3. Recursively split until:
   - All samples same class
   - Max depth reached
   - Min samples threshold met

**Algorithm**:
```
BuildTree(X, y, depth):
  if stopping_criteria_met:
    return LeafNode(class=majority_class(y))
  
  best_split = find_best_split(X, y)
  
  if no_split_improves_gain:
    return LeafNode(class=majority_class(y))
  
  left_node = BuildTree(X_left, y_left, depth+1)
  right_node = BuildTree(X_right, y_right, depth+1)
  
  return DecisionNode(feature, threshold, left_node, right_node)
```

---

## Deep Learning

### Feedforward Neural Network

**Category**: Deep Learning - Supervised Learning  
**Architecture**: Input → Hidden Layers → Output  
**Time Complexity**: O(m*n*h*i) where h is hidden size  
**Space Complexity**: O(n*h + h*o)  
**Use Cases**: Image recognition, natural language processing, complex patterns

**Network Components**:
```
Layer 1: z¹ = W¹·x + b¹
         a¹ = σ(z¹)

Layer 2: z² = W²·a¹ + b²
         ŷ = σ(z²)

Activation: σ(z) = 1 / (1 + e^(-z)) [Sigmoid]
```

**Backpropagation Algorithm**:
```
1. Forward Pass: Calculate outputs for all layers

2. Calculate Loss: L = -Σ[yᵢ·log(ŷᵢ) + (1-yᵢ)·log(1-ŷᵢ)]

3. Backward Pass:
   - ∂L/∂W² = a¹^T · (ŷ - y)
   - ∂L/∂W¹ = x^T · (∂L/∂a¹)
   
4. Update Weights:
   - W := W - α·∂L/∂W
   - b := b - α·∂L/∂b
```

**Key Parameters**:
- **Hidden Size**: Number of neurons in hidden layer
- **Learning Rate**: Gradient descent step size
- **Iterations**: Training epochs
- **Activation Function**: Non-linearity (sigmoid, ReLU, tanh)

---

## Reinforcement Learning

### Q-Learning

**Category**: Reinforcement Learning - Model-free  
**Time Complexity**: O(episodes * steps * actions)  
**Space Complexity**: O(states * actions)  
**Use Cases**: Game AI, robot control, autonomous navigation

**Q-Value Update Rule**:
```
Q(s,a) := Q(s,a) + α[r + γ·max(Q(s',a')) - Q(s,a)]

Where:
- s: Current state
- a: Action taken
- r: Reward received
- s': Next state
- α: Learning rate (0 < α ≤ 1)
- γ: Discount factor (0 ≤ γ ≤ 1)
```

**Algorithm Steps**:
```
Q-Learning(environment, episodes):
  Initialize Q-table with zeros
  
  For each episode:
    state = initial_state
    
    For each step in episode:
      if random < ε:
        action = random_action()  // Exploration
      else:
        action = argmax(Q[state])  // Exploitation
      
      reward, next_state = environment.step(action)
      
      Q[state, action] := Q[state, action] + 
                         α[reward + γ·max(Q[next_state]) - Q[state, action]]
      
      state = next_state
```

**Epsilon-Greedy Strategy**:
- With probability ε: Explore (random action)
- With probability 1-ε: Exploit (best known action)
- ε starts high, gradually decreases during training

**Convergence Criteria**:
- Q-values stabilize
- Average reward increases
- Policy becomes deterministic

---

## Complexity Comparison

| Algorithm | Time | Space | Type |
|-----------|------|-------|------|
| BFS | O(V+E) | O(V) | Graph Search |
| DFS | O(V+E) | O(V) | Graph Search |
| A* | O(b^d) | O(b^d) | Informed Search |
| Linear Reg | O(m·n) | O(n) | ML - Regression |
| Logistic Reg | O(m·n) | O(n) | ML - Classification |
| K-Means | O(n·k·d·i) | O(n·d) | ML - Clustering |
| Decision Tree | O(n·log(n)·d) | O(log(n)) | ML - Tree |
| Neural Network | O(m·n·h·i) | O(n·h+h·o) | DL |
| Q-Learning | O(e·s·a) | O(s·a) | RL |

## Parameter Tuning Guide

### Learning Rate
- **Too high**: Diverges, overshoots optimum
- **Too low**: Converges slowly
- **Good range**: 0.001 - 0.1

### Epsilon (Exploration)
- **Start**: 1.0 (full exploration)
- **Decay**: ε := ε * decay_factor
- **End**: 0.01 - 0.1 (mostly exploitation)

### Discount Factor (Gamma)
- **0**: Only consider immediate rewards
- **1**: Consider all future rewards equally
- **Default**: 0.9 - 0.99

## Convergence Indicators

1. **Loss Function**:
   - Decreases monotonically
   - Reaches plateau
   - Very small changes between iterations

2. **Accuracy**:
   - Increases over time
   - Stabilizes
   - No improvement over N iterations

3. **Q-Values**:
   - Changes become smaller
   - Patterns emerge in policy
   - Consistent behavior
