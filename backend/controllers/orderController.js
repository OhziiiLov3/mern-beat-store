const Product = require("../models/Product");
const Order = require("../models/Order");

const createOrder = async (req, res) => {
    console.log("Create order route hit");
  try {
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in the order" });
    }

    let total = 0;
    const validatedItems = [];
    //validate products and calculate total
    for (const item of items) {
        console.log("Attempting to fetch product with ID:", item.product);


      const product = await Product.findById(item.product);
      console.log("Product fetched:", product);

      if (!product) {
        throw new Error(`Product with ID ${item.product} not found`);
      }

      if (product.availability !== "available") {
        throw new Error(`Product ${product.name} is not available`);
      }

      // update total and push validated item
      total += product.price * item.quantity;
      validatedItems.push({
        product: product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price, // Store price at purchase time
      });
    }
    // create new order
    const order = new Order({
      user: req.user._id,
      items: validatedItems,
      total,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrders = async (req,res)=>{
try {
    const orders = await Order.find({user: req.user._id}).populate('items.product', 'name price').sort({createdAt: -1});
    res.json(orders)
} catch (error) {
    res.status(400).json({ message: error.message });
}
};

module.exports = {
  createOrder,
  getOrders
};
