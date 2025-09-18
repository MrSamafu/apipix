const CollectionAccessoires = require('../models/collectionAccessoires');

// Ajouter un accessoire à la collection d'un utilisateur
exports.addAccessoireToCollection = async (req, res) => {
    const { accessoire_id, quantite } = req.body;
    const userId = req.user.id;
    try {
        const [result] = await CollectionAccessoires.addAccessoireToCollection(userId, accessoire_id, quantite);
        res.status(201).json({ message: 'Accessoire ajouté à la collection', id: result.insertId });
    } catch (err) {
        console.error('Erreur SQL addAccessoireToCollection:', err);
        res.status(500).json({ error: err.message });
    }
};

// Modifier la quantité d’un accessoire dans la collection
exports.updateAccessoireQuantity = async (req, res) => {
    const { accessoire_id, quantite } = req.body;
    const userId = req.user.id;
    try {
        await CollectionAccessoires.updateAccessoireQuantity(userId, accessoire_id, quantite);
        res.json({ message: 'Quantité mise à jour' });
    } catch (err) {
        console.error('Erreur SQL updateAccessoireQuantity:', err);
        res.status(500).json({ error: err.message });
    }
};

// Supprimer un accessoire de la collection
exports.removeAccessoireFromCollection = async (req, res) => {
    const { accessoire_id } = req.body;
    const userId = req.user.id;
    try {
        await CollectionAccessoires.removeAccessoireFromCollection(userId, accessoire_id);
        res.json({ message: 'Accessoire retiré de la collection' });
    } catch (err) {
        console.error('Erreur SQL removeAccessoireFromCollection:', err);
        res.status(500).json({ error: err.message });
    }
};

// Récupérer tous les accessoires de la collection d'un utilisateur
exports.getUserAccessoireCollection = async (req, res) => {
    const userId = req.user.id;
    try {
        const [results] = await CollectionAccessoires.getUserAccessoireCollection(userId);
        res.json(results);
    } catch (err) {
        console.error('Erreur SQL getUserAccessoireCollection:', err);
        res.status(500).json({ error: err.message });
    }
};

// Vérifier si un utilisateur possède un accessoire
exports.checkUserHasAccessoire = async (req, res) => {
    const { accessoire_id } = req.body;
    const userId = req.user.id;
    try {
        const [results] = await CollectionAccessoires.checkUserHasAccessoire(userId, accessoire_id);
        if (results.length === 0) return res.json({ hasAccessoire: false });
        res.json({ hasAccessoire: true, quantite: results[0].quantite });
    } catch (err) {
        console.error('Erreur SQL checkUserHasAccessoire:', err);
        res.status(500).json({ error: err.message });
    }
};
