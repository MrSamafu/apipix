const db = require('../config/db');

// Ajouter une donnée au référentiel
const addReferentiel = (referentielData) => {
    const { type, valeur } = referentielData;
    return db.query(
        'INSERT INTO referentiel (type, valeur) VALUES (?, ?)',
        [type, valeur]
    );
};

// Récupérer toutes les données du référentiel
const getAllReferentiels = () => {
    return db.query('SELECT * FROM referentiel');
};

// Récupérer une donnée spécifique du référentiel par ID
const getReferentielById = (id) => {
    return db.query('SELECT * FROM referentiel WHERE id = ?', [id]);
};

// Mettre à jour une donnée du référentiel
const updateReferentiel = (id, referentielData) => {
    const { type, valeur } = referentielData;
    return db.query(
        'UPDATE referentiel SET type = ?, valeur = ? WHERE id = ?',
        [type, valeur, id]
    );
};

// Supprimer une donnée du référentiel
const deleteReferentiel = (id) => {
    return db.query('DELETE FROM referentiel WHERE id = ?', [id]);
};

module.exports = { addReferentiel, getAllReferentiels, getReferentielById, updateReferentiel, deleteReferentiel };
