const db = require('../config/db');

// Ajouter un accessoire
const addAccessoire = (accessoireData) => {
    const { nom, description, image_url } = accessoireData;
    return db.query(
        'INSERT INTO accessoires (nom, description, image_url) VALUES (?, ?, ?)',
        [nom, description, image_url]
    );
};

// Récupérer tous les accessoires
const getAllAccessoires = () => {
    return db.query('SELECT * FROM accessoires');
};

// Récupérer un accessoire par ID
const getAccessoireById = (id) => {
    return db.query('SELECT * FROM accessoires WHERE id = ?', [id]);
};

// Mettre à jour un accessoire
const updateAccessoire = (id, accessoireData) => {
    const { nom, description, image_url } = accessoireData;
    return db.query(
        'UPDATE accessoires SET nom = ?, description = ?, image_url = ? WHERE id = ?',
        [nom, description, image_url, id]
    );
};

// Supprimer un accessoire
const deleteAccessoire = (id) => {
    return db.query('DELETE FROM accessoires WHERE id = ?', [id]);
};

module.exports = { addAccessoire, getAllAccessoires, getAccessoireById, updateAccessoire, deleteAccessoire };
