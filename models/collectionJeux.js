const db = require('../config/db');

// Ajouter un jeu à la collection d'un utilisateur
const addGameToCollection = (userId, gameId, quantity, callback) => {
    db.query(
        'INSERT INTO collection_jeux (utilisateur_id, jeu_id, quantite) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantite = quantite + ?',
        [userId, gameId, quantity, quantity],
        callback
    );
};

// Mettre à jour la quantité d'un jeu dans la collection
const updateGameQuantity = (userId, gameId, quantity, callback) => {
    db.query(
        'UPDATE collection_jeux SET quantite = ? WHERE utilisateur_id = ? AND jeu_id = ?',
        [quantity, userId, gameId],
        callback
    );
};

// Supprimer un jeu de la collection d'un utilisateur
const removeGameFromCollection = (userId, gameId, callback) => {
    db.query(
        'DELETE FROM collection_jeux WHERE utilisateur_id = ? AND jeu_id = ?',
        [userId, gameId],
        callback
    );
};

// Récupérer la collection de jeux d'un utilisateur
const getUserGameCollection = (userId, callback) => {
    db.query(
        'SELECT jeux.id, jeux.nom, jeux.description, jeux.image, collection_jeux.quantite FROM collection_jeux JOIN jeux ON collection_jeux.jeu_id = jeux.id WHERE collection_jeux.utilisateur_id = ?',
        [userId],
        callback
    );
};

// Vérifier si un utilisateur possède un jeu
const checkUserHasGame = (userId, gameId, callback) => {
    db.query(
        'SELECT quantite FROM collection_jeux WHERE utilisateur_id = ? AND jeu_id = ?',
        [userId, gameId],
        callback
    );
};

module.exports = {
    addGameToCollection,
    updateGameQuantity,
    removeGameFromCollection,
    getUserGameCollection,
    checkUserHasGame
};
