const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
name: {type: String, required: true},
category: { type: String, enum: ['beat','merch'], required:true},
description: String,
price: {type: Number, required: true, min: 0 },
image: String,
file: String,
stock: {type: Number, default: 0},
tags: {type:[String], default : []},
isPremium: {type: Boolean, default: false},
owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
availability: { 
    type: String, 
    enum: ['available', 'basic-only', 'premium-only'], 
    default: 'available' 
  },
},{
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);