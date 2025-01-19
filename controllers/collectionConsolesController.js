const CollectionConsoles = require('../models/collectionConsoles');

// Ajouter une console à la collection d'un utilisateur
exports.addConsoleToCollection = (req, res) => {
    const { console_id, quantite } = req.body;
    const userId = req.user.id;

    CollectionConsoles.addConsoleToCollection(userId, console_id, quantite, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Console ajoutée à la collection', id: result.insertId });
    });
};

// Modifier la quantité d’une console dans la collection
exports.updateConsoleQuantity = (req, res) => {
    const { console_id, quantite } = req.body;
    const userId = req.user.id;

    CollectionConsoles.updateConsoleQuantity(userId, console_id, quantite, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Quantité mise à jour' });
    });
};

// Supprimer une console de la collection
exports.removeConsoleFromCollection = (req, res) => {
    const { console_id } = req.body;
    const userId = req.user.id;

    CollectionConsoles.removeConsoleFromCollection(userId, console_id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Console retirée de la collection' });
    });
};

// Récupérer toutes les consoles de la collection d'un utilisateur
exports.getUserConsoleCollection = (req, res) => {
    const userId = req.user.id;

    CollectionConsoles.getUserConsoleCollection(userId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Vérifier si un utilisateur possède une console
exports.checkUserHasConsole = (req, res) => {
    const { console_id } = req.body;
    const userId = req.user.id;

    CollectionConsoles.checkUserHasConsole(userId, console_id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.json({ hasConsole: false });
        res.json({ hasConsole: true, quantite: results[0].quantite });
    });
};
