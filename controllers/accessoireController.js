const Accessoire = require('../models/accessoire');

// Ajouter un accessoire
exports.createAccessoire = (req, res) => {
    Accessoire.addAccessoire(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Accessoire ajouté avec succès', id: result.insertId });
    });
};

// Récupérer tous les accessoires
exports.getAllAccessoires = (req, res) => {
    Accessoire.getAllAccessoires((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Récupérer un accessoire par ID
exports.getAccessoireById = (req, res) => {
    Accessoire.getAccessoireById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Accessoire non trouvé' });
        res.json(results[0]);
    });
};

// Mettre à jour un accessoire
exports.updateAccessoire = (req, res) => {
    Accessoire.updateAccessoire(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Accessoire mis à jour avec succès' });
    });
};

// Supprimer un accessoire
exports.deleteAccessoire = (req, res) => {
    Accessoire.deleteAccessoire(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Accessoire supprimé avec succès' });
    });
};
