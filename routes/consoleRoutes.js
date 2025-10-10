const express = require('express');
const router = express.Router();
const consoleController = require('../controllers/consoleController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes pour gérer les consoles (protégées par JWT)
router.post('/', authenticateToken, consoleController.createConsole);
router.get('/', authenticateToken, consoleController.getAllConsoles);
router.get('/:id', authenticateToken, consoleController.getConsoleById);
router.put('/:id', authenticateToken, consoleController.updateConsole);
router.delete('/:id', authenticateToken, consoleController.deleteConsole);

module.exports = router;
