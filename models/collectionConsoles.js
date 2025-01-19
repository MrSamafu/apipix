const db = require('../config/db');

// Ajouter une console à la collection d'un utilisateur
const addConsoleToCollection = (userId, consoleId, quantity, callback) => {
    db.query(
        'INSERT INTO collection_consoles (utilisateur_id, console_id, quantite) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantite = quantite + ?',
        [userId, consoleId, quantity, quantity],
        callback
    );
};

// Mettre à jour la quantité d'une console dans la collection
const updateConsoleQuantity = (userId, consoleId, quantity, callback) => {
    db.query(
        'UPDATE collection_consoles SET quantite = ? WHERE utilisateur_id = ? AND console_id = ?',
        [quantity, userId, consoleId],
        callback
    );
};

// Supprimer une console de la collection d'un utilisateur
const removeConsoleFromCollection = (userId, consoleId, callback) => {
    db.query(
        'DELETE FROM collection_consoles WHERE utilisateur_id = ? AND console_id = ?',
        [userId, consoleId],
        callback
    );
};

// Récupérer la collection de consoles d'un utilisateur
const getUserConsoleCollection = (userId, callback) => {
    db.query(
        'SELECT consoles.id, consoles.nom, consoles.description, consoles.image, collection_consoles.quantite FROM collection_consoles JOIN consoles ON collection_consoles.console_id = consoles.id WHERE collection_consoles.utilisateur_id = ?',
        [userId],
        callback
    );
};

// Vérifier si un utilisateur possède une console
const checkUserHasConsole = (userId, consoleId, callback) => {
    db.query(
        'SELECT quantite FROM collection_consoles WHERE utilisateur_id = ? AND console_id = ?',
        [userId, consoleId],
        callback
    );
};

module.exports = {
    addConsoleToCollection,
    updateConsoleQuantity,
    removeConsoleFromCollection,
    getUserConsoleCollection,
    checkUserHasConsole
};
