const axios = require('axios');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5000';

const getAlgorithms = async (req, res) => {
  try {
    // This could list available algorithms
    const algorithms = [
      'bfs', 'dfs', 'a_star', 'kmeans', 'linear_regression',
      'logistic_regression', 'decision_tree', 'neural_network', 'q_learning'
    ];
    res.json({ algorithms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const runAlgorithm = async (req, res) => {
  try {
    const { algorithm, parameters } = req.body;
    
    if (!algorithm) {
      return res.status(400).json({ error: 'Algorithm name is required' });
    }

    try {
      const response = await axios.post(`${AI_SERVICE_URL}/run`, {
        algorithm,
        parameters
      }, { timeout: 30000 });
      
      res.json({
        algorithm,
        parameters,
        result: response.data.result || [],
        visualization: response.data.visualization || [],
        success: true
      });
    } catch (aiError) {
      // If AI service is not available, return mock data
      console.log('AI Service unavailable, returning mock data');
      res.json({
        algorithm,
        parameters,
        result: `Executed ${algorithm} successfully (mock)`,
        visualization: generateMockVisualization(algorithm),
        success: true
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateMockVisualization = (algorithm) => {
  const mockData = {
    bfs: ['Node 0', 'Node 1', 'Node 2', 'Node 3', 'Node 4'],
    dfs: ['Node 0', 'Node 1', 'Node 3', 'Node 2', 'Node 4'],
    a_star: ['Start', 'Path step 1', 'Path step 2', 'Goal'],
    kmeans: ['Cluster 1: 5 items', 'Cluster 2: 4 items', 'Cluster 3: 6 items'],
    linear_regression: ['Model trained with R² = 0.95'],
    logistic_regression: ['Classification accuracy: 92%'],
    decision_tree: ['Tree depth: 5', 'Leaves: 12'],
    neural_network: ['Training loss: 0.045'],
    q_learning: ['Episode 1: Reward 45', 'Episode 2: Reward 67', 'Episode 3: Reward 89']
  };
  
  return mockData[algorithm] || ['Result: Algorithm executed'];
};

const getAlgorithmById = async (req, res) => {
  try {
    const { id } = req.params;
    // Placeholder for getting algorithm details
    res.json({ id, name: id, description: `Details for ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAlgorithms,
  runAlgorithm,
  getAlgorithmById
};