const express = require('express');
const router = express.Router();
const collectionConsolesController = require('../controllers/collectionConsolesController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes pour la gestion des collections de consoles
router.post('/collection/consoles', authenticateToken, collectionConsolesController.addConsoleToCollection);
router.put('/collection/consoles', authenticateToken, collectionConsolesController.updateConsoleQuantity);
router.delete('/collection/consoles', authenticateToken, collectionConsolesController.removeConsoleFromCollection);
router.get('/collection/consoles', authenticateToken, collectionConsolesController.getUserConsoleCollection);
router.post('/collection/consoles/check', authenticateToken, collectionConsolesController.checkUserHasConsole);

module.exports = router;
