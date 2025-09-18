const db = require('../config/db');

// Ajouter une console à la collection d'un utilisateur
const addConsoleToCollection = (userId, consoleId, quantity) => {
    return db.query(
        'INSERT INTO collections_consoles (id_utilisateur, id_console, quantite) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantite = quantite + ?',
        [userId, consoleId, quantity, quantity]
    );
};

// Mettre à jour la quantité d'une console dans la collection
const updateConsoleQuantity = (userId, consoleId, quantity) => {
    return db.query(
        'UPDATE collections_consoles SET quantite = ? WHERE id_utilisateur = ? AND id_console = ?',
        [quantity, userId, consoleId]
    );
};

// Supprimer une console de la collection d'un utilisateur
const removeConsoleFromCollection = (userId, consoleId) => {
    return db.query(
        'DELETE FROM collections_consoles WHERE id_utilisateur = ? AND id_console = ?',
        [userId, consoleId]
    );
};

// Récupérer la collection de consoles d'un utilisateur
const getUserConsoleCollection = (userId) => {
    return db.query(
        'SELECT consoles.id, consoles.nom, consoles.description, consoles.image_url, collections_consoles.quantite FROM collections_consoles JOIN consoles ON collections_consoles.id_console = consoles.id WHERE collections_consoles.id_utilisateur = ?',
        [userId]
    );
};

// Vérifier si un utilisateur possède une console
const checkUserHasConsole = (userId, consoleId) => {
    return db.query(
        'SELECT quantite FROM collections_consoles WHERE id_utilisateur = ? AND id_console = ?',
        [userId, consoleId]
    );
};

module.exports = {
    addConsoleToCollection,
    updateConsoleQuantity,
    removeConsoleFromCollection,
    getUserConsoleCollection,
    checkUserHasConsole
};
