const CollectionAccessoires = require('../models/collectionAccessoires');

// Ajouter un accessoire à la collection d'un utilisateur
exports.addAccessoireToCollection = (req, res) => {
    const { accessoire_id, quantite } = req.body;
    const userId = req.user.id;

    CollectionAccessoires.addAccessoireToCollection(userId, accessoire_id, quantite, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Accessoire ajouté à la collection', id: result.insertId });
    });
};

// Modifier la quantité d’un accessoire dans la collection
exports.updateAccessoireQuantity = (req, res) => {
    const { accessoire_id, quantite } = req.body;
    const userId = req.user.id;

    CollectionAccessoires.updateAccessoireQuantity(userId, accessoire_id, quantite, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Quantité mise à jour' });
    });
};

// Supprimer un accessoire de la collection
exports.removeAccessoireFromCollection = (req, res) => {
    const { accessoire_id } = req.body;
    const userId = req.user.id;

    CollectionAccessoires.removeAccessoireFromCollection(userId, accessoire_id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Accessoire retiré de la collection' });
    });
};

// Récupérer tous les accessoires de la collection d'un utilisateur
exports.getUserAccessoireCollection = (req, res) => {
    const userId = req.user.id;

    CollectionAccessoires.getUserAccessoireCollection(userId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Vérifier si un utilisateur possède un accessoire
exports.checkUserHasAccessoire = (req, res) => {
    const { accessoire_id } = req.body;
    const userId = req.user.id;

    CollectionAccessoires.checkUserHasAccessoire(userId, accessoire_id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.json({ hasAccessoire: false });
        res.json({ hasAccessoire: true, quantite: results[0].quantite });
    });
};
