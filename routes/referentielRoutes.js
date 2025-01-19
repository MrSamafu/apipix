const express = require('express');
const router = express.Router();
const referentielController = require('../controllers/referentielController');
const authenticateToken = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Routes pour le référentiel
router.post('/referentiels', authenticateToken, adminMiddleware, referentielController.createReferentiel);
router.get('/referentiels', authenticateToken, referentielController.getAllReferentiels);
router.get('/referentiels/:id', authenticateToken, referentielController.getReferentielById);
router.put('/referentiels/:id', authenticateToken, adminMiddleware, referentielController.updateReferentiel);
router.delete('/referentiels/:id', authenticateToken, adminMiddleware, referentielController.deleteReferentiel);

module.exports = router;
