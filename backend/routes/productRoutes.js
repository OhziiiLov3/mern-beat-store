const express = require('express');
const { getProducts, addProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
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
// PUT -> /api/products/:id
router.put('/:id',  protect, admin, updateProduct,);
// Delete -> /api/products/:id
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;