const express = require('express');
const router = express.Router();
const consoleController = require('../controllers/consoleController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes pour gérer les consoles (protégées par JWT)
router.post('/consoles', authenticateToken, consoleController.createConsole);
router.get('/consoles', authenticateToken, consoleController.getAllConsoles);
router.get('/consoles/:id', authenticateToken, consoleController.getConsoleById);
router.put('/consoles/:id', authenticateToken, consoleController.updateConsole);
router.delete('/consoles/:id', authenticateToken, consoleController.deleteConsole);

module.exports = router;
