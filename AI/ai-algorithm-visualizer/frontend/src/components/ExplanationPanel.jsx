import React from 'react'

const ALGORITHM_EXPLANATIONS = {
  bfs: {
    name: 'Breadth First Search',
    description: 'Explores all neighbors at the current depth level before moving to vertices at the next depth level.',
    complexity: 'Time: O(V + E), Space: O(V)',
    formula: '$Q = [start]$',
    steps: [
      'Initialize queue with start node',
      'While queue is not empty:',
      '  - Dequeue a node',
      '  - Explore all unvisited neighbors',
      '  - Enqueue unvisited neighbors',
    ],
  },
  dfs: {
    name: 'Depth First Search',
    description: 'Explores as far as possible along each branch before backtracking.',
    complexity: 'Time: O(V + E), Space: O(V)',
    formula: '$S = [start]$',
    steps: [
      'Initialize stack with start node',
      'While stack is not empty:',
      '  - Pop a node',
      '  - Recursively visit unvisited neighbors',
    ],
  },
  a_star: {
    name: 'A* Search',
    description: 'Uses heuristics to find the shortest path efficiently.',
    complexity: 'Time: O(b^d), Space: O(b^d)',
    formula: '$f(n) = g(n) + h(n)$',
    steps: [
      'Initialize open set with start',
      'While open set not empty:',
      '  - Select node with lowest f-score',
      '  - If goal, return path',
      '  - Explore neighbors and update scores',
    ],
  },
}

export default function ExplanationPanel({ algorithm = 'bfs' }) {
  const explanation = ALGORITHM_EXPLANATIONS[algorithm] || ALGORITHM_EXPLANATIONS.bfs

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">{explanation.name}</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-sm mb-2">Description</h3>
          <p className="text-sm text-gray-700">{explanation.description}</p>
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-2">Complexity</h3>
          <p className="text-sm text-gray-700 font-mono">{explanation.complexity}</p>
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-2">Formula</h3>
          <div className="bg-gray-50 p-3 rounded text-sm font-mono text-gray-800">
            {explanation.formula}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-2">Algorithm Steps</h3>
          <ol className="text-sm space-y-1 text-gray-700">
            {explanation.steps.map((step, idx) => (
              <li key={idx} className="ml-4">
                {idx + 1}. {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
