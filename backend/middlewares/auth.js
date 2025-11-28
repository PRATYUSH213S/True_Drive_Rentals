// backend/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export default async function authMiddleware(req, res, next) {
    // 1. Grab the Bearer token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ success: false, message: 'Not authorized, token missing' });
    }
    const token = authHeader.split(' ')[1];

    // 2. Verify & attach user object
    try {
        
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(payload.id).select('-password');
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error('JWT verification failed:', err.message);
        // Provide more specific error messages
        let errorMessage = 'Token invalid or expired';
        if (err.name === 'TokenExpiredError') {
            errorMessage = 'Token expired. Please log in again.';
        } else if (err.name === 'JsonWebTokenError') {
            errorMessage = 'Invalid token. Please log in again.';
        }
        return res
            .status(401)
            .json({ success: false, message: errorMessage });
    }
}

