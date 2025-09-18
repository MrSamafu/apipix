const db = require('../config/db');

// Ajouter une console
const addConsole = (consoleData) => {
    const { nom, description, image_url } = consoleData;
    return db.query(
        'INSERT INTO consoles (nom, description, image_url) VALUES (?, ?, ?)',
        [nom, description, image_url]
    );
};

// Récupérer toutes les consoles
const getAllConsoles = () => {
    return db.query('SELECT * FROM consoles');
};

// Récupérer une console par ID
const getConsoleById = (id) => {
    return db.query('SELECT * FROM consoles WHERE id = ?', [id]);
};

// Mettre à jour une console
const updateConsole = (id, consoleData) => {
    const { nom, description, image_url } = consoleData;
    return db.query(
        'UPDATE consoles SET nom = ?, description = ?, image_url = ? WHERE id = ?',
        [nom, description, image_url, id]
    );
};

// Supprimer une console
const deleteConsole = (id) => {
    return db.query('DELETE FROM consoles WHERE id = ?', [id]);
};

module.exports = { addConsole, getAllConsoles, getConsoleById, updateConsole, deleteConsole };
