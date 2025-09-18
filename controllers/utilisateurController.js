const db = require('../config/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.creerUtilisateur = async (req, res) => {
    try {
        const { nom, email, mot_de_passe, role } = req.body;
        if (!nom || !email || !mot_de_passe) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires." });
        }

        // Vérification existence pseudo ou email
        const [existUsers] = await db.query(
            'SELECT id, nom, email FROM utilisateurs WHERE nom = ? OR email = ?',
            [nom, email]
        );
        if (existUsers.length > 0) {
            const pseudoExists = existUsers.some(u => u.nom === nom);
            const emailExists = existUsers.some(u => u.email === email);
            let msg = '';
            if (pseudoExists && emailExists) {
                msg = "Le pseudo et l'adresse email existent déjà.";
            } else if (pseudoExists) {
                msg = "Le pseudo existe déjà.";
            } else if (emailExists) {
                msg = "L'adresse email existe déjà.";
            }
            return res.status(409).json({ error: msg });
        }

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        db.query('INSERT INTO utilisateurs (nom, email, mot_de_passe, role) VALUES (?, ?, ?, ?)', 
        [nom, email, hashedPassword, role || 'utilisateur'], 
        (err, result) => {
            if (err) {
                console.error('Erreur SQL creerUtilisateur:', err);
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Utilisateur créé avec succès', id: result.insertId });
        });
    } catch (error) {
        console.error('Erreur asynchrone creerUtilisateur:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}
exports.updateUtilisateur = async (req, res) => {
    const { nom, email, mot_de_passe, role } = req.body;
    const hashedPassword = mot_de_passe ? await bcrypt.hash(mot_de_passe, 10) : null;
    
    db.query('UPDATE utilisateurs SET nom = ?, email = ?, mot_de_passe = COALESCE(?, mot_de_passe), role = ? WHERE id = ?', 
    [nom, email, hashedPassword, role, req.params.id], 
    (err, result) => {
        if (err) {
            console.error('Erreur SQL updateUtilisateur:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Utilisateur mis à jour avec succès' });
    });
};

exports.deleteUtilisateur = (req, res) => {
    db.query('DELETE FROM utilisateurs WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            console.error('Erreur SQL deleteUtilisateur:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Utilisateur supprimé avec succès' });
    });
};

exports.verifyUtilisteurToken = (req, res) => {
    const { token, email } = req.body;
    db.query('SELECT id, date_expiration, role FROM utilisateurs WHERE email = ? AND token = ?', [email, token], (err, results) => {
        if (err) {
            console.error('Erreur SQL verifyUtilisteurToken:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) return res.status(401).json({ error: 'Token invalide' });

        const user = results[0];
        // Vérification expiration : le token est expiré si la date d'expiration est passée
        const now = new Date();
        const expiration = new Date(user.date_expiration);
        if (expiration < now) return res.status(401).json({ error: 'Token expiré' });

        // Générer un nouveau token et mettre à jour
        const newToken = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
        db.query('UPDATE utilisateurs SET token = ?, date_expiration = NOW() WHERE id = ?', [newToken, user.id], (err) => {
            if (err) {
                console.error('Erreur SQL update token:', err);
                return res.status(500).json({ error: err.message });
            }
        });
        res.json({ 
            message: 'Token valide et mis à jour',
            token: newToken,
        });
    });
}
