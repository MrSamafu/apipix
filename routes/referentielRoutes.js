const express = require('express');
const router = express.Router();
const referentielController = require('../controllers/referentielController');
const authenticateToken = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Routes pour le référentiel
router.post('/', authenticateToken, adminMiddleware, referentielController.createReferentiel);
router.get('/', authenticateToken, referentielController.getAllReferentiels);
router.get('/:id', authenticateToken, referentielController.getReferentielById);
router.put('/:id', authenticateToken, adminMiddleware, referentielController.updateReferentiel);
router.delete('/:id', authenticateToken, adminMiddleware, referentielController.deleteReferentiel);

module.exports = router;
