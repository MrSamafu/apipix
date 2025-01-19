const express = require('express');
const router = express.Router();
const collectionAccessoiresController = require('../controllers/collectionAccessoiresController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes pour la gestion des collections d'accessoires
router.post('/collection/accessoires', authenticateToken, collectionAccessoiresController.addAccessoireToCollection);
router.put('/collection/accessoires', authenticateToken, collectionAccessoiresController.updateAccessoireQuantity);
router.delete('/collection/accessoires', authenticateToken, collectionAccessoiresController.removeAccessoireFromCollection);
router.get('/collection/accessoires', authenticateToken, collectionAccessoiresController.getUserAccessoireCollection);
router.post('/collection/accessoires/check', authenticateToken, collectionAccessoiresController.checkUserHasAccessoire);

module.exports = router;
