const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

// GET ->  /api/orders
router.get('/', protect, getOrders);
// POST -> /api/orders
router.post('/', protect, createOrder);




module.exports = router;