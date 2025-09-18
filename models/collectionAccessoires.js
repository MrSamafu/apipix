const db = require('../config/db');

// Ajouter un accessoire à la collection d'un utilisateur
const addAccessoireToCollection = (userId, accessoireId, quantity) => {
    return db.query(
        'INSERT INTO collections_accessoires (id_utilisateur, id_accessoire, quantite) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantite = quantite + ?',
        [userId, accessoireId, quantity, quantity]
    );
};

// Mettre à jour la quantité d'un accessoire dans la collection
const updateAccessoireQuantity = (userId, accessoireId, quantity) => {
    return db.query(
        'UPDATE collections_accessoires SET quantite = ? WHERE id_utilisateur = ? AND id_accessoire = ?',
        [quantity, userId, accessoireId]
    );
};

// Supprimer un accessoire de la collection d'un utilisateur
const removeAccessoireFromCollection = (userId, accessoireId) => {
    return db.query(
        'DELETE FROM collections_accessoires WHERE id_utilisateur = ? AND id_accessoire = ?',
        [userId, accessoireId]
    );
};

// Récupérer la collection d'accessoires d'un utilisateur
const getUserAccessoireCollection = (userId) => {
    return db.query(
        'SELECT accessoires.id, accessoires.nom, accessoires.description, accessoires.image_url, collections_accessoires.quantite FROM collections_accessoires JOIN accessoires ON collections_accessoires.id_accessoire = accessoires.id WHERE collections_accessoires.id_utilisateur = ?',
        [userId]
    );
};

// Vérifier si un utilisateur possède un accessoire
const checkUserHasAccessoire = (userId, accessoireId) => {
    return db.query(
        'SELECT quantite FROM collections_accessoires WHERE id_utilisateur = ? AND id_accessoire = ?',
        [userId, accessoireId]
    );
};

module.exports = {
    addAccessoireToCollection,
    updateAccessoireQuantity,
    removeAccessoireFromCollection,
    getUserAccessoireCollection,
    checkUserHasAccessoire
};
