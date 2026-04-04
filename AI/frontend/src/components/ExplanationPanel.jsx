import React from 'react';
import { useAlgorithmStore } from '../store/algorithmStore';

const ExplanationPanel = () => {
  const results = useAlgorithmStore((state) => state.results);
  const selectedAlgorithm = useAlgorithmStore((state) => state.selectedAlgorithm);

  const explanations = {
    bfs: 'Breadth-First Search (BFS) explores all vertices at the present depth level before moving to vertices at the next depth level.',
    dfs: 'Depth-First Search (DFS) explores as far as possible along each branch before backtracking.',
    a_star: 'A* search algorithm combines the benefits of Dijkstra and heuristic search to find optimal paths efficiently.',
    kmeans: 'K-Means clustering partitions data into k clusters by minimizing within-cluster variance.',
    linear_regression: 'Linear Regression fits a linear model to predict continuous values based on input features.',
    logistic_regression: 'Logistic Regression is used for binary classification problems using a logistic function.',
    decision_tree: 'Decision Tree builds a tree-like model of decisions and their possible consequences.',
    neural_network: 'Neural Networks consist of interconnected layers of nodes that learn complex patterns.',
    q_learning: 'Q-Learning is a reinforcement learning algorithm that learns an optimal action-value function.'
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-lg font-semibold mb-2">Results & Explanation</h2>
      {selectedAlgorithm ? (
        <div>
          <p className="text-sm text-gray-600 mb-3">
            {explanations[selectedAlgorithm] || 'Select an algorithm to see its explanation.'}
          </p>
          {results && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
              <h3 className="font-semibold text-green-800">Algorithm Results</h3>
              <pre className="text-xs mt-2 overflow-auto max-h-40">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600">Select an algorithm to see its explanation.</p>
      )}
    </div>
  );
};

export default ExplanationPanel;