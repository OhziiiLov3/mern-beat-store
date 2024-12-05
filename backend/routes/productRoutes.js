const express = require('express');
const { getProducts, addProduct, getProductById } = require('../controllers/productController');
const {protect, admin} = require('../middleware/authMiddleware');
const router = express.Router();

// router.get('/', (req,res) =>{
//  res.send("Product routes placeholder")
// });

// GET -> /api/products
router.get('/', getProducts);
// POST -> /api/products
router.post('/', protect, admin, addProduct);
// GET -> /api/products/:id
router.get('/:id', getProductById);

module.exports = router;