const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authenticateToken = require('../middlewares/authMiddleware');

// Routes pour gérer les jeux (protégées par JWT)
router.post('/', authenticateToken, gameController.createGame);
router.get('/', authenticateToken, gameController.getAllGames);
router.get('/:id', authenticateToken, gameController.getGameById);
router.put('/:id', authenticateToken, gameController.updateGame);
router.delete('/:id', authenticateToken, gameController.deleteGame);

module.exports = router;
