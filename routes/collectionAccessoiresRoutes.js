const express = require('express');
const router = express.Router();
const collectionAccessoiresController = require('../controllers/collectionAccessoiresController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes pour la gestion des collections d'accessoires
router.post('/', authenticateToken, collectionAccessoiresController.addAccessoireToCollection);
router.put('/', authenticateToken, collectionAccessoiresController.updateAccessoireQuantity);
router.delete('/', authenticateToken, collectionAccessoiresController.removeAccessoireFromCollection);
router.get('/', authenticateToken, collectionAccessoiresController.getUserAccessoireCollection);
router.post('/check', authenticateToken, collectionAccessoiresController.checkUserHasAccessoire);

module.exports = router;
