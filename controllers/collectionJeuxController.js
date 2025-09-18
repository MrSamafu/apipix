const CollectionJeux = require('../models/collectionJeux');

// Ajouter un jeu à la collection d'un utilisateur
exports.addGameToCollection = async (req, res) => {
    const { jeu_id, quantite } = req.body;
    const userId = req.user.id;
    try {
        const [result] = await CollectionJeux.addGameToCollection(userId, jeu_id, quantite);
        res.status(201).json({ message: 'Jeu ajouté à la collection', id: result.insertId });
    } catch (err) {
        console.error('Erreur SQL addGameToCollection:', err);
        res.status(500).json({ error: err.message });
    }
};

// Modifier la quantité d’un jeu dans la collection
exports.updateGameQuantity = async (req, res) => {
    const { jeu_id, quantite } = req.body;
    const userId = req.user.id;
    try {
        await CollectionJeux.updateGameQuantity(userId, jeu_id, quantite);
        res.json({ message: 'Quantité mise à jour' });
    } catch (err) {
        console.error('Erreur SQL updateGameQuantity:', err);
        res.status(500).json({ error: err.message });
    }
};

// Supprimer un jeu de la collection
exports.removeGameFromCollection = async (req, res) => {
    const { jeu_id } = req.body;
    const userId = req.user.id;
    try {
        await CollectionJeux.removeGameFromCollection(userId, jeu_id);
        res.json({ message: 'Jeu retiré de la collection' });
    } catch (err) {
        console.error('Erreur SQL removeGameFromCollection:', err);
        res.status(500).json({ error: err.message });
    }
};

// Récupérer tous les jeux de la collection d'un utilisateur
exports.getUserGameCollection = async (req, res) => {
    const userId = req.user.id;
    try {
        const [results] = await CollectionJeux.getUserGameCollection(userId);
        res.json(results);
    } catch (err) {
        console.error('Erreur SQL getUserGameCollection:', err);
        res.status(500).json({ error: err.message });
    }
};

// Vérifier si un utilisateur possède un jeu
exports.checkUserHasGame = async (req, res) => {
    const { jeu_id } = req.body;
    const userId = req.user.id;
    try {
        const [results] = await CollectionJeux.checkUserHasGame(userId, jeu_id);
        if (results.length === 0) return res.json({ hasGame: false });
        res.json({ hasGame: true, quantite: results[0].quantite });
    } catch (err) {
        console.error('Erreur SQL checkUserHasGame:', err);
        res.status(500).json({ error: err.message });
    }
};
