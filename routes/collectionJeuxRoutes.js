const express = require('express');
const router = express.Router();
const collectionJeuxController = require('../controllers/collectionJeuxController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes pour la gestion des collections de jeux
router.post('/collection/jeux', authenticateToken, collectionJeuxController.addGameToCollection);
router.put('/collection/jeux', authenticateToken, collectionJeuxController.updateGameQuantity);
router.delete('/collection/jeux', authenticateToken, collectionJeuxController.removeGameFromCollection);
router.get('/collection/jeux', authenticateToken, collectionJeuxController.getUserGameCollection);
router.post('/collection/jeux/check', authenticateToken, collectionJeuxController.checkUserHasGame);

module.exports = router;
