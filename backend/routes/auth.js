import express from 'express';
import { signup, login, verifyToken } from '../controllers/authController';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected route for token verification (optional)
router.get('/verify-token', verifyToken);

export default router;
