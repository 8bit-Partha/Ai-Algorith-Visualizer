const aiServiceClient = require('../config/aiService');

// List all available algorithms
exports.getAlgorithms = async (req, res) => {
  try {
    const response = await aiServiceClient.get('/algorithms');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch algorithms', details: error.message });
  }
};

// Run an algorithm with given parameters
exports.runAlgorithm = async (req, res) => {
  try {
    const { algorithm, params } = req.body;

    if (!algorithm) {
      return res.status(400).json({ error: 'Algorithm name is required' });
    }

    const response = await aiServiceClient.post(`/run/${algorithm}`, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to run algorithm', details: error.message });
  }
};

// Get step-by-step execution
exports.getSteps = async (req, res) => {
  try {
    const { algorithm, params } = req.query;

    if (!algorithm) {
      return res.status(400).json({ error: 'Algorithm name is required' });
    }

    const response = await aiServiceClient.get(`/steps/${algorithm}`, {
      params: { params },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch steps', details: error.message });
  }
};

// Get algorithm details and documentation
exports.getAlgorithmDetails = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ error: 'Algorithm name is required' });
    }

    const response = await aiServiceClient.get(`/algorithm/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch algorithm details', details: error.message });
  }
};
