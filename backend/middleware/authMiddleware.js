import jwt from 'jsonwebtoken';
import User from '../models/User';

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', error});
    }
};

// Middleware to check if the user is an admin
export const verifyAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (user && user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: 'Admin privileges required' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
