const Accessoire = require('../models/accessoire');

// Ajouter un accessoire
exports.createAccessoire = async (req, res) => {
    try {
        const [result] = await Accessoire.addAccessoire(req.body);
        res.status(201).json({ message: 'Accessoire ajouté avec succès', id: result.insertId });
    } catch (err) {
        console.error('Erreur SQL createAccessoire:', err);
        res.status(500).json({ error: err.message });
    }
};

// Récupérer tous les accessoires
exports.getAllAccessoires = async (req, res) => {
    try {
        const [results] = await Accessoire.getAllAccessoires();
        res.json(results);
    } catch (err) {
        console.error('Erreur SQL getAllAccessoires:', err);
        res.status(500).json({ error: err.message });
    }
};

// Récupérer un accessoire par ID
exports.getAccessoireById = async (req, res) => {
    try {
        const [results] = await Accessoire.getAccessoireById(req.params.id);
        if (results.length === 0) return res.status(404).json({ error: 'Accessoire non trouvé' });
        res.json(results[0]);
    } catch (err) {
        console.error('Erreur SQL getAccessoireById:', err);
        res.status(500).json({ error: err.message });
    }
};

// Mettre à jour un accessoire
exports.updateAccessoire = async (req, res) => {
    try {
        await Accessoire.updateAccessoire(req.params.id, req.body);
        res.json({ message: 'Accessoire mis à jour avec succès' });
    } catch (err) {
        console.error('Erreur SQL updateAccessoire:', err);
        res.status(500).json({ error: err.message });
    }
};

// Supprimer un accessoire
exports.deleteAccessoire = async (req, res) => {
    try {
        await Accessoire.deleteAccessoire(req.params.id);
        res.json({ message: 'Accessoire supprimé avec succès' });
    } catch (err) {
        console.error('Erreur SQL deleteAccessoire:', err);
        res.status(500).json({ error: err.message });
    }
};
