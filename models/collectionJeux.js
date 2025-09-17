const db = require('../config/db');

// Ajouter un jeu à la collection d'un utilisateur
const addGameToCollection = (userId, gameId, quantity, callback) => {
    db.query(
        'INSERT INTO collections_jeux (id_utilisateur, id_jeu, quantite) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantite = quantite + ?',
        [userId, gameId, quantity, quantity],
        callback
    );
};

// Mettre à jour la quantité d'un jeu dans la collection
const updateGameQuantity = (userId, gameId, quantity, callback) => {
    db.query(
        'UPDATE collections_jeux SET quantite = ? WHERE id_utilisateur = ? AND id_jeu = ?',
        [quantity, userId, gameId],
        callback
    );
};

// Supprimer un jeu de la collection d'un utilisateur
const removeGameFromCollection = (userId, gameId, callback) => {
    db.query(
        'DELETE FROM collections_jeux WHERE id_utilisateur = ? AND id_jeu = ?',
        [userId, gameId],
        callback
    );
};

// Récupérer la collection de jeux d'un utilisateur
const getUserGameCollection = (userId, callback) => {
    db.query(
        'SELECT jeux.id, jeux.titre, jeux.description, jeux.image_url, collections_jeux.quantite FROM collections_jeux JOIN jeux ON collections_jeux.id_jeu = jeux.id WHERE collections_jeux.id_utilisateur = ?',
        [userId],
        callback
    );
};

// Vérifier si un utilisateur possède un jeu
const checkUserHasGame = (userId, gameId, callback) => {
    db.query(
        'SELECT quantite FROM collections_jeux WHERE id_utilisateur = ? AND id_jeu = ?',
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
