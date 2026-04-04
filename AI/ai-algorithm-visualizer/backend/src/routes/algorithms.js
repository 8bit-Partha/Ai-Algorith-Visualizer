const router = require('express').Router();
const algorithmController = require('../controllers/algorithmController');

// GET all algorithms
router.get('/', algorithmController.getAlgorithms);

// GET algorithm details
router.get('/:name', algorithmController.getAlgorithmDetails);

// POST run algorithm
router.post('/run', algorithmController.runAlgorithm);

// GET steps for algorithm
router.get('/:algorithm/steps', algorithmController.getSteps);

module.exports = router;
