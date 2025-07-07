const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mysql = require('mysql2');

// Création d'un pool de connexions
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test de connexion
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Erreur de connexion à la base de données: caribou   ---- ', err);
    process.exit(1);
  } else {
    console.log('✅ Connecté à la base de données MySQL via pool caribou');
    connection.release(); // Toujours relâcher la connexion après un test
  }
});

// Export en mode promesse (pour async/await)
module.exports = pool.promise();

