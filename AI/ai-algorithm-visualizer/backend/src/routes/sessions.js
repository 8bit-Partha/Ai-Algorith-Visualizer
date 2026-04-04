const router = require('express').Router();

// Mock session storage (in production, use MongoDB)
let sessions = {};

// POST save session
router.post('/', (req, res) => {
  try {
    const { name, algorithm, params, results } = req.body;
    
    if (!name || !algorithm) {
      return res.status(400).json({ error: 'Session name and algorithm are required' });
    }

    const sessionId = Date.now().toString();
    sessions[sessionId] = {
      id: sessionId,
      name,
      algorithm,
      params,
      results,
      createdAt: new Date().toISOString(),
    };

    res.status(201).json({ sessionId, message: 'Session saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save session', details: error.message });
  }
});

// GET all sessions
router.get('/', (req, res) => {
  try {
    const sessionList = Object.values(sessions);
    res.json(sessionList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions', details: error.message });
  }
});

// GET session by ID
router.get('/:id', (req, res) => {
  try {
    const session = sessions[req.params.id];
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch session', details: error.message });
  }
});

// DELETE session
router.delete('/:id', (req, res) => {
  try {
    if (!sessions[req.params.id]) {
      return res.status(404).json({ error: 'Session not found' });
    }

    delete sessions[req.params.id];
    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete session', details: error.message });
  }
});

module.exports = router;
