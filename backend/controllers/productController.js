const { trusted } = require("mongoose");
const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
  try {
    const {category, isPremium, availability, tags} = req.query;
    const filter = {};

    if(category) filter.category = category;
    if(isPremium !== undefined) filter.isPremium = isPremium === 'true';
    if(availability) filter.availability = availability;

    if(tags){
        // Split the tags into an array and match against the product's tags
        filter.tags = { $in: tags.split(',') };
    }
    const products = await Product.find(filter).populate('owner', 'name email');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// add a new product to db
const addProduct = async (req, res) => {
  const {
    name,
    category,
    description,
    price,
    image,
    file,
    stock,
    tags,
    isPremium,
    availability,
    owner,
  } = req.body;

  try {
    const product = await Product.create({
      name,
      category,
      description,
      price,
      image,
      file,
      stock,
      tags,
      isPremium,
      availability,
      owner: req.user._id, // // Attach the logged-in user as the owner
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product(by id)
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('owner', 'name email');
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product by id
const updateProduct = async  (req, res)=>{
 try {
    const {id} = req.params;
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(id, updates,{new :true});
    if(product){
        res.json(product)
    }else{
        res.status(404).json({ message: 'Product not found' });
    }
 } catch (error) {
    res.status(500).json({ message: error.message });
 }
};

// Delete product by id
const deleteProduct = async (req, res)=>{
try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(product){
        res.json({ message: 'Product deleted successfully' });
    }else{
        res.status(404).json({ message: 'Product not found' });
    }
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

module.exports = {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
