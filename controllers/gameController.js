const Game = require('../models/game');

// Ajouter un jeu
exports.createGame = (req, res) => {
    Game.addGame(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Jeu ajouté avec succès', id: result.insertId });
    });
};

// Récupérer tous les jeux
exports.getAllGames = (req, res) => {
    Game.getAllGames((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Récupérer un jeu par ID
exports.getGameById = (req, res) => {
    Game.getGameById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Jeu non trouvé' });
        res.json(results[0]);
    });
};

// Mettre à jour un jeu
exports.updateGame = (req, res) => {
    Game.updateGame(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Jeu mis à jour avec succès' });
    });
};

// Supprimer un jeu
exports.deleteGame = (req, res) => {
    Game.deleteGame(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Jeu supprimé avec succès' });
    });
};
