const db = require('../config/db');

// Ajouter un jeu
const addGame = (game, callback) => {
    const { titre, description, image_url } = game;
    db.query(
        'INSERT INTO jeux (titre, description, image_url) VALUES (?, ?, ?)',
        [titre, description, image_url],
        callback
    );
};

// Récupérer tous les jeux
const getAllGames = (callback) => {
    db.query('SELECT * FROM jeux', callback);
};

// Récupérer un jeu par ID
const getGameById = (id, callback) => {
    db.query('SELECT * FROM jeux WHERE id = ?', [id], callback);
};

// Mettre à jour un jeu
const updateGame = (id, game, callback) => {
    const { titre, description, image_url } = game;
    db.query(
        'UPDATE jeux SET titre = ?, description = ?, image_url = ? WHERE id = ?',
        [titre, description, image_url, id],
        callback
    );
};

// Supprimer un jeu
const deleteGame = (id, callback) => {
    db.query('DELETE FROM jeux WHERE id = ?', [id], callback);
};

module.exports = { addGame, getAllGames, getGameById, updateGame, deleteGame };
