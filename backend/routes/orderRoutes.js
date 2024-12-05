const express = require('express');
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');
const {protect, admin} = require('../middleware/authMiddleware');
const router = express.Router();

// GET ->  /api/orders
router.get('/', protect, getOrders);
// POST -> /api/orders
router.post('/', protect, createOrder);
// PUT -> /api/orders/:id/status (Update order status - Admin only)
router.put('/:id/status', protect, admin, updateOrderStatus);


module.exports = router;