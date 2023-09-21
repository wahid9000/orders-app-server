const express = require('express');
const router = express.Router();
const Order = require('../models/ModelOrders');

router.get('/', async(req, res) => {
    try {
        const orders = await Order.find();
        res.send(orders)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Orders" });
    }
})

module.exports = router;