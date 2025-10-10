const express = require('express');
const router = express.Router();
const collectionConsolesController = require('../controllers/collectionConsolesController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes pour la gestion des collections de consoles
router.post('/', authenticateToken, collectionConsolesController.addConsoleToCollection);
router.put('/', authenticateToken, collectionConsolesController.updateConsoleQuantity);
router.delete('/', authenticateToken, collectionConsolesController.removeConsoleFromCollection);
router.get('/', authenticateToken, collectionConsolesController.getUserConsoleCollection);
router.post('/check', authenticateToken, collectionConsolesController.checkUserHasConsole);

module.exports = router;
