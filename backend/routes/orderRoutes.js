const express = require('express');
const { createOrder } = require('../controllers/orderController');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();


// POST -> /api/orders
router.post('/', protect, createOrder);




module.exports = router;