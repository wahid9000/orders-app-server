const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema({
  order_id: Number,
  customer_name: String,
  order_date: Date,
  order_status: String,
  quantity: Number,
  total_amount: Number,
  product: {
    product_id: Number,
    product_name: String,
  },
});

// Create a model based on the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;