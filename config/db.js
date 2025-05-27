require('dotenv').config(); // Charger les variables d'environnement
const mysql = require('mysql2');

// Connexion à la base de données avec les variables d'environnement
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('❌ Erreur de connexion à la base de données:', err);
        process.exit(1);
    }
    console.log('✅ Connecté à la base de données MySQL');
});

module.exports = db;
