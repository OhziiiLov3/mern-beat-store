const Product = require('../models/Product');


// Get all products 
const getProducts = async (req,res)=>{
try {
    const products = await Product.find();
    res.json(products);
} catch (error) {
    res.status(500).json({ message: error.message }); 
}
};

// add a new product to db 
const addProduct = async  (req, res)=>{
const {name, category, description, price, image, file, stock} = req.body;
try {
    const product = await Product.create({
        name,
        category,
        description,
        price,
        image,
        file,
        stock
    });
    res.status(201).json(product);
} catch (error) {
    res.status(500).json({ message: error.message }); 
}
};




module.exports = {
    getProducts,
    addProduct
}