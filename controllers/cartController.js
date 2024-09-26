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

    // Loop through items and check if any already exists in the cart
    for (let { product, quantity } of items) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === product
      );

      const productDetails = await Product.findById(product);
      if (!productDetails) {
        return res.status(404).json({
          message: "Item not found",
        });
      }

      if (itemIndex > -1) {
        // Item already exists in the cart, return an error
        return res.status(400).json({
          message: `Item is already in the cart.`,
        });
      } else {
        // Add new item to cart
        cart.items.push({
          product,
          quantity,
          image: productDetails.image, // Include image here
        });
      }
    }

    // Calculate total price
    let totalPrice = 0;
    for (let item of cart.items) {
      const product = await Product.findById(item.product);

      if (product) {
        totalPrice += product.price * item.quantity;
        item.price = product.price;
        item.ItemName = product.name; // Ensure ItemName is assigned before saving
        item.image = product.image; // Assign image if needed
      } else {
        throw new Error("Item not found");
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
    const { items } = req.body;
    const userId = req.user.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Items array is required and should not be empty.",
      });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found.",
      });
    }

    // Loop through the items and update the quantity or other properties
    for (let { product, quantity } of items) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === product
      );

      if (itemIndex > -1) {
        // If item exists, update the quantity
        if (quantity <= 0) {
          // If quantity is 0 or less, remove the item from the cart
          cart.items.splice(itemIndex, 1);
        } else {
          // Otherwise, update the quantity
          cart.items[itemIndex].quantity = quantity;
        }
      } else {
        return res.status(404).json({
          message: `Menu item with ID ${product} not found in the cart.`,
        });
      }
    }

    // Recalculate the total price
    let totalPrice = 0;
    for (let item of cart.items) {
      const productDetails = await Product.findById(item.product);
      if (productDetails) {
        totalPrice += productDetails.price * item.quantity;
      } else {
        return res.status(404).json({
          message: "One or more menu items were not found.",
        });
      }
    }

    cart.totalPrice = totalPrice;
    // Save the updated cart
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the cart.",
      error: error.message,
    });
  }
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
