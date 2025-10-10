const db = require('../config/db');

// Ajouter un jeu
const addGame = (game) => {
    const { titre, description, image_url, editeur, developpeur, annee_sortie, id_reference, id_createur } = game;
    return db.query(
        'INSERT INTO jeux (titre, description, image_url, editeur, developpeur, annee_sortie, id_reference, id_createur) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [titre, description, image_url, editeur, developpeur, annee_sortie, id_reference, id_createur]
    );
};

// Récupérer tous les jeux
const getAllGames = () => {
    return db.query('SELECT * FROM jeux');
};

// Récupérer un jeu par ID
const getGameById = (id) => {
    return db.query('SELECT * FROM jeux WHERE id = ?', [id]);
};

// Mettre à jour un jeu
const updateGame = (id, game) => {
    const { titre, description, image_url, editeur, developpeur, annee_sortie, id_reference, id_createur } = game;
    return db.query(
        'UPDATE jeux SET titre = ?, description = ?, image_url = ?, editeur = ?, developpeur = ?, annee_sortie = ?, id_reference = ?, id_createur = ? WHERE id = ?',
        [titre, description, image_url, editeur, developpeur, annee_sortie, id_reference, id_createur, id]
    );
};

// Supprimer un jeu
const deleteGame = (id) => {
    return db.query('DELETE FROM jeux WHERE id = ?', [id]);
};

module.exports = { addGame, getAllGames, getGameById, updateGame, deleteGame };
