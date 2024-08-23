import express from 'express';
import { getRecommendations } from '../controllers/recommendationController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// User route to get recommendations
router.post('/', verifyToken, getRecommendations);

export default router;
