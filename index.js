require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const utilisateurRoutes = require('./routes/utilisateurRoutes');

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/utilisateurs', utilisateurRoutes);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
