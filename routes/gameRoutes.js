const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes pour gérer les jeux (protégées par JWT)
router.post('/jeux', authenticateToken, gameController.createGame);
router.get('/jeux', authenticateToken, gameController.getAllGames);
router.get('/jeux/:id', authenticateToken, gameController.getGameById);
router.put('/jeux/:id', authenticateToken, gameController.updateGame);
router.delete('/jeux/:id', authenticateToken, gameController.deleteGame);

module.exports = router;
