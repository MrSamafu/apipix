const db = require('../config/db');

// Ajouter un accessoire à la collection d'un utilisateur
const addAccessoireToCollection = (userId, accessoireId, quantity, callback) => {
    db.query(
        'INSERT INTO collection_accessoires (utilisateur_id, accessoire_id, quantite) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantite = quantite + ?',
        [userId, accessoireId, quantity, quantity],
        callback
    );
};

// Mettre à jour la quantité d'un accessoire dans la collection
const updateAccessoireQuantity = (userId, accessoireId, quantity, callback) => {
    db.query(
        'UPDATE collection_accessoires SET quantite = ? WHERE utilisateur_id = ? AND accessoire_id = ?',
        [quantity, userId, accessoireId],
        callback
    );
};

// Supprimer un accessoire de la collection d'un utilisateur
const removeAccessoireFromCollection = (userId, accessoireId, callback) => {
    db.query(
        'DELETE FROM collection_accessoires WHERE utilisateur_id = ? AND accessoire_id = ?',
        [userId, accessoireId],
        callback
    );
};

// Récupérer la collection d'accessoires d'un utilisateur
const getUserAccessoireCollection = (userId, callback) => {
    db.query(
        'SELECT accessoires.id, accessoires.nom, accessoires.description, accessoires.image, collection_accessoires.quantite FROM collection_accessoires JOIN accessoires ON collection_accessoires.accessoire_id = accessoires.id WHERE collection_accessoires.utilisateur_id = ?',
        [userId],
        callback
    );
};

// Vérifier si un utilisateur possède un accessoire
const checkUserHasAccessoire = (userId, accessoireId, callback) => {
    db.query(
        'SELECT quantite FROM collection_accessoires WHERE utilisateur_id = ? AND accessoire_id = ?',
        [userId, accessoireId],
        callback
    );
};

module.exports = {
    addAccessoireToCollection,
    updateAccessoireQuantity,
    removeAccessoireFromCollection,
    getUserAccessoireCollection,
    checkUserHasAccessoire
};
