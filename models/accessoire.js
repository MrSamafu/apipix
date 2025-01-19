const db = require('../config/db');

// Ajouter un accessoire
const addAccessoire = (accessoireData, callback) => {
    const { nom, description, image_url } = accessoireData;
    db.query(
        'INSERT INTO accessoires (nom, description, image_url) VALUES (?, ?, ?)',
        [nom, description, image_url],
        callback
    );
};

// Récupérer tous les accessoires
const getAllAccessoires = (callback) => {
    db.query('SELECT * FROM accessoires', callback);
};

// Récupérer un accessoire par ID
const getAccessoireById = (id, callback) => {
    db.query('SELECT * FROM accessoires WHERE id = ?', [id], callback);
};

// Mettre à jour un accessoire
const updateAccessoire = (id, accessoireData, callback) => {
    const { nom, description, image_url } = accessoireData;
    db.query(
        'UPDATE accessoires SET nom = ?, description = ?, image_url = ? WHERE id = ?',
        [nom, description, image_url, id],
        callback
    );
};

// Supprimer un accessoire
const deleteAccessoire = (id, callback) => {
    db.query('DELETE FROM accessoires WHERE id = ?', [id], callback);
};

module.exports = { addAccessoire, getAllAccessoires, getAccessoireById, updateAccessoire, deleteAccessoire };
