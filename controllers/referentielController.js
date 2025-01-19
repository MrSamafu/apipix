const Referentiel = require('../models/referentiel');

// Ajouter une donnée au référentiel (admin uniquement)
exports.createReferentiel = (req, res) => {
    Referentiel.addReferentiel(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Donnée ajoutée au référentiel', id: result.insertId });
    });
};

// Récupérer toutes les données du référentiel
exports.getAllReferentiels = (req, res) => {
    Referentiel.getAllReferentiels((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Récupérer une donnée spécifique par ID
exports.getReferentielById = (req, res) => {
    Referentiel.getReferentielById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Donnée non trouvée' });
        res.json(results[0]);
    });
};

// Mettre à jour une donnée du référentiel (admin uniquement)
exports.updateReferentiel = (req, res) => {
    Referentiel.updateReferentiel(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Donnée mise à jour avec succès' });
    });
};

// Supprimer une donnée du référentiel (admin uniquement)
exports.deleteReferentiel = (req, res) => {
    Referentiel.deleteReferentiel(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Donnée supprimée avec succès' });
    });
};
