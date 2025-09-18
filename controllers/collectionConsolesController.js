const CollectionConsoles = require('../models/collectionConsoles');

// Ajouter une console à la collection d'un utilisateur
exports.addConsoleToCollection = async (req, res) => {
    const { console_id, quantite } = req.body;
    const userId = req.user.id;
    try {
        const [result] = await CollectionConsoles.addConsoleToCollection(userId, console_id, quantite);
        res.status(201).json({ message: 'Console ajoutée à la collection', id: result.insertId });
    } catch (err) {
        console.error('Erreur SQL addConsoleToCollection:', err);
        res.status(500).json({ error: err.message });
    }
};

// Modifier la quantité d’une console dans la collection
exports.updateConsoleQuantity = async (req, res) => {
    const { console_id, quantite } = req.body;
    const userId = req.user.id;
    try {
        await CollectionConsoles.updateConsoleQuantity(userId, console_id, quantite);
        res.json({ message: 'Quantité mise à jour' });
    } catch (err) {
        console.error('Erreur SQL updateConsoleQuantity:', err);
        res.status(500).json({ error: err.message });
    }
};

// Supprimer une console de la collection
exports.removeConsoleFromCollection = async (req, res) => {
    const { console_id } = req.body;
    const userId = req.user.id;
    try {
        await CollectionConsoles.removeConsoleFromCollection(userId, console_id);
        res.json({ message: 'Console retirée de la collection' });
    } catch (err) {
        console.error('Erreur SQL removeConsoleFromCollection:', err);
        res.status(500).json({ error: err.message });
    }
};

// Récupérer toutes les consoles de la collection d'un utilisateur
exports.getUserConsoleCollection = async (req, res) => {
    const userId = req.user.id;
    try {
        const [results] = await CollectionConsoles.getUserConsoleCollection(userId);
        res.json(results);
    } catch (err) {
        console.error('Erreur SQL getUserConsoleCollection:', err);
        res.status(500).json({ error: err.message });
    }
};

// Vérifier si un utilisateur possède une console
exports.checkUserHasConsole = async (req, res) => {
    const { console_id } = req.body;
    const userId = req.user.id;
    try {
        const [results] = await CollectionConsoles.checkUserHasConsole(userId, console_id);
        if (results.length === 0) return res.json({ hasConsole: false });
        res.json({ hasConsole: true, quantite: results[0].quantite });
    } catch (err) {
        console.error('Erreur SQL checkUserHasConsole:', err);
        res.status(500).json({ error: err.message });
    }
};
