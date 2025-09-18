const Game = require('../models/game');

// Ajouter un jeu
exports.createGame = async (req, res) => {
    try {
        const [result] = await Game.addGame(req.body);
        res.status(201).json({ message: 'Jeu ajouté avec succès', id: result.insertId });
    } catch (err) {
        console.error('Erreur SQL createGame:', err);
        res.status(500).json({ error: err.message });
    }
};

// Récupérer tous les jeux
exports.getAllGames = async (req, res) => {
    try {
        const [results] = await Game.getAllGames();
        res.json(results);
    } catch (err) {
        console.error('Erreur SQL getAllGames:', err);
        res.status(500).json({ error: err.message });
    }
};

// Récupérer un jeu par ID
exports.getGameById = async (req, res) => {
    try {
        const [results] = await Game.getGameById(req.params.id);
        if (results.length === 0) return res.status(404).json({ error: 'Jeu non trouvé' });
        res.json(results[0]);
    } catch (err) {
        console.error('Erreur SQL getGameById:', err);
        res.status(500).json({ error: err.message });
    }
};

// Mettre à jour un jeu
exports.updateGame = async (req, res) => {
    try {
        await Game.updateGame(req.params.id, req.body);
        res.json({ message: 'Jeu mis à jour avec succès' });
    } catch (err) {
        console.error('Erreur SQL updateGame:', err);
        res.status(500).json({ error: err.message });
    }
};

// Supprimer un jeu
exports.deleteGame = async (req, res) => {
    try {
        await Game.deleteGame(req.params.id);
        res.json({ message: 'Jeu supprimé avec succès' });
    } catch (err) {
        console.error('Erreur SQL deleteGame:', err);
        res.status(500).json({ error: err.message });
    }
};
