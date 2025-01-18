const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/', utilisateurController.creerUtilisateur);
router.post('/login', utilisateurController.login);
router.get('/', authenticateToken, utilisateurController.getUtilisateurs);
router.get('/:id', authenticateToken, utilisateurController.getUtilisateurById);
router.put('/:id', authenticateToken, utilisateurController.updateUtilisateur);
router.delete('/:id', authenticateToken, utilisateurController.deleteUtilisateur);

module.exports = router;
