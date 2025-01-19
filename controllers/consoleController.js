const Console = require('../models/console');

// Ajouter une console
exports.createConsole = (req, res) => {
    Console.addConsole(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Console ajoutée avec succès', id: result.insertId });
    });
};

// Récupérer toutes les consoles
exports.getAllConsoles = (req, res) => {
    Console.getAllConsoles((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Récupérer une console par ID
exports.getConsoleById = (req, res) => {
    Console.getConsoleById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Console non trouvée' });
        res.json(results[0]);
    });
};

// Mettre à jour une console
exports.updateConsole = (req, res) => {
    Console.updateConsole(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Console mise à jour avec succès' });
    });
};

// Supprimer une console
exports.deleteConsole = (req, res) => {
    Console.deleteConsole(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Console supprimée avec succès' });
    });
};
