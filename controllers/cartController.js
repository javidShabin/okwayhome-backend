const { Cart } = require("../models/cartModel");
const { Product } = require("../models/productModel");

// Add items in cart
const addItemToCart = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Items array is required and should not be empty.",
      });
    }
    // Find or create the user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    // Loop through items and add or update them in the cart
    for (let { product, quantity } of items) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === product
      );

      const productDetails = await Product.findById(product);
      if (!productDetails) {
        return res.status(404).json({
          message: "item not found",
        });
      }
      if (itemIndex > -1) {
        // Update quantity if item already exists
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        cart.items.push({
          product,
          quantity,
          image: productDetails.image, // Include image here
        });
      }
    }

    let totalPrice = 0;
    for (let item of cart.items) {
      const product = await Product.findById(item.product);

      if (product) {
        totalPrice += product.price * item.quantity;
        item.price = product.price;
        item.ItemName = product.name; // Ensure ItemName is assigned before saving
        item.image = product.image; // Assign image if needed
        console.log(item.price, "===price");
      } else {
        throw new Error("item not found");
      }
    }

    cart.totalPrice = totalPrice;
    // Save the cart with updated total price and ItemName for each item
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding item to cart.",
      error: error.message,
    });
  }
};
// Get cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user using id
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the cart.",
      error: error.message,
    });
  }
};
// Update cart
const updateCart = async (req, res) => {
  try {
  } catch (error) {}
};
// Remove from cart
const removeFromCart = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  addItemToCart,
  getCart,
  updateCart,
  removeFromCart,
};
