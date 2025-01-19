const CollectionJeux = require('../models/collectionJeux');

// Ajouter un jeu à la collection d'un utilisateur
exports.addGameToCollection = (req, res) => {
    const { jeu_id, quantite } = req.body;
    const userId = req.user.id;

    CollectionJeux.addGameToCollection(userId, jeu_id, quantite, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Jeu ajouté à la collection', id: result.insertId });
    });
};

// Modifier la quantité d’un jeu dans la collection
exports.updateGameQuantity = (req, res) => {
    const { jeu_id, quantite } = req.body;
    const userId = req.user.id;

    CollectionJeux.updateGameQuantity(userId, jeu_id, quantite, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Quantité mise à jour' });
    });
};

// Supprimer un jeu de la collection
exports.removeGameFromCollection = (req, res) => {
    const { jeu_id } = req.body;
    const userId = req.user.id;

    CollectionJeux.removeGameFromCollection(userId, jeu_id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Jeu retiré de la collection' });
    });
};

// Récupérer tous les jeux de la collection d'un utilisateur
exports.getUserGameCollection = (req, res) => {
    const userId = req.user.id;

    CollectionJeux.getUserGameCollection(userId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Vérifier si un utilisateur possède un jeu
exports.checkUserHasGame = (req, res) => {
    const { jeu_id } = req.body;
    const userId = req.user.id;

    CollectionJeux.checkUserHasGame(userId, jeu_id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.json({ hasGame: false });
        res.json({ hasGame: true, quantite: results[0].quantite });
    });
};
