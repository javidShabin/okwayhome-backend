const express = require("express");
const { userAuth } = require("../../middlewares/userAuth");
const { addItemToCart } = require("../../controllers/cartController");
const router = express.Router();

// Add item to cart
router.post("/addcart", userAuth, addItemToCart);
// Get cart
router.get("/getcart", userAuth);
// update cart
router.put("/update", userAuth);
// Remove cart
router.delete("/remove", userAuth);

module.exports = { cartRouter: router };
