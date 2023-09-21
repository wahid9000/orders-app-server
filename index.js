const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yy4kpnv.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  const ordersRoutes = require("./routes/orders")
  const productsRoutes = require("./routes/products")

  app.use('/orders', ordersRoutes);
  app.use('/products', productsRoutes);

app.get("/", async (req, res) => {
  res.send("Order app is running");
});

app.listen(port, () => {
  console.log(`Orders app is running on port ${port}`);
});
