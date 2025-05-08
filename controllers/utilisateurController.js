const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.creerUtilisateur = async (req, res) => {
    const { nom, email, mot_de_passe, role } = req.body;
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    db.query('INSERT INTO utilisateurs (nom, email, mot_de_passe, role) VALUES (?, ?, ?, ?)', 
    [nom, email, hashedPassword, role || 'utilisateur'], 
    (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Utilisateur créé avec succès', id: result.insertId });
    });
};

exports.login = (req, res) => {
    const { email, mot_de_passe } = req.body;

    db.query('SELECT * FROM utilisateurs WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(400).json({ error: 'Utilisateur non trouvé' });

        const user = results[0];
        const validPassword = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        
        if (!validPassword) return res.status(401).json({ error: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
        db.query('UPDATE utilisateurs SET token = ?,date_expiration = NOW() WHERE id = ?', [token, user.id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            // Token mis à jour dans la base de données
        });
        // Envoi du token au client
        res.json({ token });
    });
};

exports.getUtilisateurs = (req, res) => {
    db.query('SELECT id, nom, email, role, date_inscription FROM utilisateurs', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getUtilisateurById = (req, res) => {
    db.query('SELECT id, nom, email, role, date_inscription FROM utilisateurs WHERE id = ?', 
    [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        res.json(result[0]);
    });
};

exports.updateUtilisateur = async (req, res) => {
    const { nom, email, mot_de_passe, role } = req.body;
    const hashedPassword = mot_de_passe ? await bcrypt.hash(mot_de_passe, 10) : null;
    
    db.query('UPDATE utilisateurs SET nom = ?, email = ?, mot_de_passe = COALESCE(?, mot_de_passe), role = ? WHERE id = ?', 
    [nom, email, hashedPassword, role, req.params.id], 
    (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Utilisateur mis à jour avec succès' });
    });
};

exports.deleteUtilisateur = (req, res) => {
    db.query('DELETE FROM utilisateurs WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Utilisateur supprimé avec succès' });
    });
};

exports.verifyUtilisteurToken = (req, res) => {
    const { token, email } = req.body;
    db.query('SELECT id,date_expiration,role FROM utilisateurs WHERE email = ? AND token = ?', [email, token], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ error: 'Token invalide' });
        
        const user = results[0];
        const isTokenExpired = new Date().setHours(new Date().getHours() - 1)  > new Date(user.date_expiration);
        
        if (isTokenExpired) return res.status(401).json({ error: 'Token expiré' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
        db.query('UPDATE utilisateurs SET token = ?,date_expiration = NOW() WHERE id = ?', [token, userId], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            // Token mis à jour dans la base de données
        });
        
        res.json({ 
            message: 'Token valide et mis a jour',
            token: token,
        });
    });
}
