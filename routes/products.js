const express = require('express');
const router = express.Router();
const Product = require('../models/ModelProducts');

router.get('/', async(req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
        console.log(products); 
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Products" });
    }
})

module.exports = router;