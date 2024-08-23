import express from 'express';
import {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
} from '../controllers/orderController';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// User routes
router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getUserOrders);
router.get('/:id', verifyToken, getOrderById);

// Admin-only route
router.put('/:id/status', verifyToken, verifyAdmin, updateOrderStatus);

export default router;
