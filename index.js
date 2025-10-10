require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const gameRoutes = require('./routes/gameRoutes');
const consoleRoutes = require('./routes/consoleRoutes');
const accessoireRoutes = require('./routes/accessoireRoutes');
const referentielRoutes = require('./routes/referentielRoutes');
const collectionJeuxRoutes = require('./routes/collectionJeuxRoutes');
const collectionConsolesRoutes = require('./routes/collectionConsolesRoutes');
const collectionAccessoiresRoutes = require('./routes/collectionAccessoiresRoutes');

app.use(cors({
    origin: 'http://141.95.159.41:5173',  // Frontend autorisé
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/utilisateurs', utilisateurRoutes);
app.use('/api/jeux', gameRoutes);
app.use('/api/consoles', consoleRoutes);
app.use('/api/accessoires', accessoireRoutes);
app.use('/api/referentiels', referentielRoutes);
app.use('/api/collections/jeux', collectionJeuxRoutes);
app.use('/api/collections/consoles', collectionConsolesRoutes);
app.use('/api/collections/accessoires', collectionAccessoiresRoutes);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
