const Referentiel = require('../models/referentiel');

// Ajouter une donnée au référentiel (admin uniquement)
exports.createReferentiel = async (req, res) => {
    try {
        const [result] = await Referentiel.addReferentiel(req.body);
        res.status(201).json({ message: 'Donnée ajoutée au référentiel', id: result.insertId });
    } catch (err) {
        console.error('Erreur SQL createReferentiel:', err);
        res.status(500).json({ error: err.message });
    }
};

// Récupérer toutes les données du référentiel
exports.getAllReferentiels = async (req, res) => {
    try {
        const [results] = await Referentiel.getAllReferentiels();
        res.json(results);
    } catch (err) {
        console.error('Erreur SQL getAllReferentiels:', err);
        res.status(500).json({ error: err.message });
    }
};

// Récupérer une donnée spécifique par ID
exports.getReferentielById = async (req, res) => {
    try {
        const [results] = await Referentiel.getReferentielById(req.params.id);
        if (results.length === 0) return res.status(404).json({ error: 'Donnée non trouvée' });
        res.json(results[0]);
    } catch (err) {
        console.error('Erreur SQL getReferentielById:', err);
        res.status(500).json({ error: err.message });
    }
};

// Mettre à jour une donnée du référentiel (admin uniquement)
exports.updateReferentiel = async (req, res) => {
    try {
        await Referentiel.updateReferentiel(req.params.id, req.body);
        res.json({ message: 'Donnée mise à jour avec succès' });
    } catch (err) {
        console.error('Erreur SQL updateReferentiel:', err);
        res.status(500).json({ error: err.message });
    }
};

// Supprimer une donnée du référentiel (admin uniquement)
exports.deleteReferentiel = async (req, res) => {
    try {
        await Referentiel.deleteReferentiel(req.params.id);
        res.json({ message: 'Donnée supprimée avec succès' });
    } catch (err) {
        console.error('Erreur SQL deleteReferentiel:', err);
        res.status(500).json({ error: err.message });
    }
};
