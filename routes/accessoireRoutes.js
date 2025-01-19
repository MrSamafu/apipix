const express = require('express');
const router = express.Router();
const accessoireController = require('../controllers/accessoireController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes pour gérer les accessoires (protégées par JWT)
router.post('/accessoires', authenticateToken, accessoireController.createAccessoire);
router.get('/accessoires', authenticateToken, accessoireController.getAllAccessoires);
router.get('/accessoires/:id', authenticateToken, accessoireController.getAccessoireById);
router.put('/accessoires/:id', authenticateToken, accessoireController.updateAccessoire);
router.delete('/accessoires/:id', authenticateToken, accessoireController.deleteAccessoire);

module.exports = router;
