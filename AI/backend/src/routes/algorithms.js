const express = require('express');
const router = express.Router();
const algorithmController = require('../controllers/algorithmController');

// Routes for algorithms
router.get('/', algorithmController.getAlgorithms);
router.post('/run', algorithmController.runAlgorithm);
router.get('/:id', algorithmController.getAlgorithmById);

module.exports = router;