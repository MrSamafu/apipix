const express = require('express');
const router = express.Router();
const accessoireController = require('../controllers/accessoireController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes pour gérer les accessoires (protégées par JWT)
router.post('/', authenticateToken, accessoireController.createAccessoire);
router.get('/', authenticateToken, accessoireController.getAllAccessoires);
router.get('/:id', authenticateToken, accessoireController.getAccessoireById);
router.put('/:id', authenticateToken, accessoireController.updateAccessoire);
router.delete('/:id', authenticateToken, accessoireController.deleteAccessoire);

module.exports = router;
