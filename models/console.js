const db = require('../config/db');

// Ajouter une console
const addConsole = (consoleData, callback) => {
    const { nom, description, image_url } = consoleData;
    db.query(
        'INSERT INTO consoles (nom, description, image_url) VALUES (?, ?, ?)',
        [nom, description, image_url],
        callback
    );
};

// Récupérer toutes les consoles
const getAllConsoles = (callback) => {
    db.query('SELECT * FROM consoles', callback);
};

// Récupérer une console par ID
const getConsoleById = (id, callback) => {
    db.query('SELECT * FROM consoles WHERE id = ?', [id], callback);
};

// Mettre à jour une console
const updateConsole = (id, consoleData, callback) => {
    const { nom, description, image_url } = consoleData;
    db.query(
        'UPDATE consoles SET nom = ?, description = ?, image_url = ? WHERE id = ?',
        [nom, description, image_url, id],
        callback
    );
};

// Supprimer une console
const deleteConsole = (id, callback) => {
    db.query('DELETE FROM consoles WHERE id = ?', [id], callback);
};

module.exports = { addConsole, getAllConsoles, getConsoleById, updateConsole, deleteConsole };
