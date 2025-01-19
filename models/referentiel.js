const db = require('../config/db');

// Ajouter une donnée au référentiel
const addReferentiel = (referentielData, callback) => {
    const { type, valeur } = referentielData;
    db.query(
        'INSERT INTO referentiel (type, valeur) VALUES (?, ?)',
        [type, valeur],
        callback
    );
};

// Récupérer toutes les données du référentiel
const getAllReferentiels = (callback) => {
    db.query('SELECT * FROM referentiel', callback);
};

// Récupérer une donnée spécifique du référentiel par ID
const getReferentielById = (id, callback) => {
    db.query('SELECT * FROM referentiel WHERE id = ?', [id], callback);
};

// Mettre à jour une donnée du référentiel
const updateReferentiel = (id, referentielData, callback) => {
    const { type, valeur } = referentielData;
    db.query(
        'UPDATE referentiel SET type = ?, valeur = ? WHERE id = ?',
        [type, valeur, id],
        callback
    );
};

// Supprimer une donnée du référentiel
const deleteReferentiel = (id, callback) => {
    db.query('DELETE FROM referentiel WHERE id = ?', [id], callback);
};

module.exports = { addReferentiel, getAllReferentiels, getReferentielById, updateReferentiel, deleteReferentiel };
