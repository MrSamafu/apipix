const Console = require('../models/console');

// Ajouter une console
exports.createConsole = async (req, res) => {
    try {
        const [result] = await Console.addConsole(req.body);
        res.status(201).json({ message: 'Console ajoutée avec succès', id: result.insertId });
    } catch (err) {
        console.error('Erreur SQL createConsole:', err);
        res.status(500).json({ error: err.message });
    }
};

// Récupérer toutes les consoles
exports.getAllConsoles = async (req, res) => {
    try {
        const [results] = await Console.getAllConsoles();
        res.json(results);
    } catch (err) {
        console.error('Erreur SQL getAllConsoles:', err);
        res.status(500).json({ error: err.message });
    }
};

// Récupérer une console par ID
exports.getConsoleById = async (req, res) => {
    try {
        const [results] = await Console.getConsoleById(req.params.id);
        if (results.length === 0) return res.status(404).json({ error: 'Console non trouvée' });
        res.json(results[0]);
    } catch (err) {
        console.error('Erreur SQL getConsoleById:', err);
        res.status(500).json({ error: err.message });
    }
};

// Mettre à jour une console
exports.updateConsole = async (req, res) => {
    try {
        await Console.updateConsole(req.params.id, req.body);
        res.json({ message: 'Console mise à jour avec succès' });
    } catch (err) {
        console.error('Erreur SQL updateConsole:', err);
        res.status(500).json({ error: err.message });
    }
};

// Supprimer une console
exports.deleteConsole = async (req, res) => {
    try {
        await Console.deleteConsole(req.params.id);
        res.json({ message: 'Console supprimée avec succès' });
    } catch (err) {
        console.error('Erreur SQL deleteConsole:', err);
        res.status(500).json({ error: err.message });
    }
};
