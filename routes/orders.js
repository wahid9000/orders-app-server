const express = require("express");
const router = express.Router();
const Order = require("../models/ModelOrders");

//get orders by search
router.get("/search", async (req, res) => {
  const searchQuery = req.query.search;
  console.log(searchQuery);
  try {
    let searchResults;

    // Checking if the searchQuery is a valid number
    const searchQueryAsNumber = parseInt(searchQuery);
    if (!isNaN(searchQueryAsNumber)) {
      // performing exact search on order_id as number
      searchResults = await Order.find({ order_id: searchQueryAsNumber });
    } else {
      // performing regex search on other fields
      searchResults = await Order.find({
        $or: [
          { customer_name: { $regex: searchQuery, $options: "i" } },
          { "product.product_name": { $regex: searchQuery, $options: "i" } },
        ],
      });
    }

    res.json(searchResults);
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ error: "An Error Occurred" });
  }
});

//get all orders
router.get("/all-orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ order_id: 1 });
    res.send(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Orders" });
  }
});

// Get all orders sorted by order_date in ascending order
router.get("/all-orders-asc", async (req, res) => {
  try {
    const orders = await Order.find().sort({ order_date: 1 });
    res.send(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Orders" });
  }
});

// Get all orders sorted by order_date in descending order
router.get("/all-orders-desc", async (req, res) => {
  try {
    const orders = await Order.find().sort({ order_date: -1 });
    res.send(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Orders" });
  }
});


module.exports = router;
