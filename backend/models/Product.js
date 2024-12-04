const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
name: {type: String, required: true},
category: { type: String, enum: ['beat','merch'], required:true},
description: String,
price: {type: String, required: true},
image: String,
file: String,
stock: {type: Number, default: 0}

});

module.exports = mongoose.model('Product', productSchema);