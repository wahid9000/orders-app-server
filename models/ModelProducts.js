const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  product_id: Number,
  product_name: String,
  description: String,
  price: Number,
});

// Create a model based on the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;