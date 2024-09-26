const express = require("express");
const { userAuth } = require("../../middlewares/userAuth");
const { addItemToCart, getCart, updateCart, removeFromCart } = require("../../controllers/cartController");
const router = express.Router();

// Add item to cart
router.post("/addcart", userAuth, addItemToCart);
// Get cart
router.get("/getcart", userAuth, getCart);
// update cart
router.put("/update", userAuth, updateCart);
// Remove cart
router.delete("/remove", userAuth, removeFromCart);

module.exports = { cartRouter: router };
