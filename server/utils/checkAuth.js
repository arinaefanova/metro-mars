const jwt = require('jsonwebtoken');

function decodeToken(token) {
    try {
        const rawToken = token.replace('Bearer ', '');
        const decoded = jwt.verify(rawToken, 'viv99vfd9vdf09');
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

function checkRole(req, res, next, requiredRole) {
    const token = req.headers.authorization;
    if (token) {
        const { role_id } = decodeToken(token);
        if (role_id === requiredRole) {
            next();
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = { checkRole };
