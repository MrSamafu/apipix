const express = require('express');
const router = express.Router();
const collectionJeuxController = require('../controllers/collectionJeuxController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes pour la gestion des collections de jeux
router.post('/', authenticateToken, collectionJeuxController.addGameToCollection);
router.put('/', authenticateToken, collectionJeuxController.updateGameQuantity);
router.delete('/', authenticateToken, collectionJeuxController.removeGameFromCollection);
router.get('/', authenticateToken, collectionJeuxController.getUserGameCollection);
router.post('/check', authenticateToken, collectionJeuxController.checkUserHasGame);

module.exports = router;
