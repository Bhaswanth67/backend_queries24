const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const adminAuthMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token); // Log token for debugging

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); // Log decoded token

        const admin = await Admin.findById(decoded.id);
        if (!admin) {
            return res.status(403).json({ msg: 'Admin access only' });
        }

        req.admin = admin;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = adminAuthMiddleware;
