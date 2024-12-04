const express = require('express');
const { getProducts, addProduct } = require('../controllers/productController');
const router = express.Router();

// router.get('/', (req,res) =>{
//  res.send("Product routes placeholder")
// });

// GET -> /api/products
router.get('/', getProducts);
// POST -> /api/products
router.post('/', addProduct);

module.exports = router;