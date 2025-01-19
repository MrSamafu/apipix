const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: "Accès interdit. Seuls les administrateurs peuvent effectuer cette action." });
    }
    next();
};

module.exports = adminMiddleware;
