const { cloudinaryInstance } = require("../config/cloudinaryConfig");
const { Product } = require("../models/productModel");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    // Get products from database and pass to response
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: "Server not responese..." });
  }
};
// Get product by id
const getProductById = async (req, res) => {
  try {
    // Get product id from req.params
    const { id } = req.params;
    // The item
    const product = await Product.findOne({ _id: id });
    // Check have the item in database
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // if have the product
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "error fetching product", error });
  }
};

// Filtering products
const filteredProduct = async (req, res) => {
  try {
    const category = req.query.category; // Fixed typo

    // If no category is provided, return an error
    if (!category) {
      return res
        .status(400)
        .json({ message: "Category query parameter is required" });
    }

    // Search for product by category
    const filteredProduct = await Product.find({ category: category });

    // If no items found, return error
    if (filteredProduct.length === 0) {
      return res
        .status(404)
        .json({ message: "No items found in that category" });
    }

    res.status(200).json(filteredProduct); // Fixed variable name here
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

// Create a product
const createProduct = async (req, res) => {
  try {
    const admin = req.admin;

    // Get all data from req.body
    const { name, ...rest } = req.body;
    // Check if required filds present
    if (!name || Object.keys(rest).length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if have any same product item
    const existProduct = await Product.findOne({ name });
    if (existProduct) {
      return res.status(409).json({ message: "Item already exists" });
    }
    // Add image file to the cloudinery and get from the file as link
    if (req.file) {
      uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
    } else {
      console.log("No file to upload");
    }

    // Save product data to the database
    const newProduct = new Product({
      name,
      ...rest,
      image: uploadResult.secure_url || "",
    });
    const saveProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added",
      data: saveProduct,
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};
const updateProduct = async (req, res) => {
  res.send("hello");
};
const removeProduct = async (req, res) => {
  res.send("hello");
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  filteredProduct,
  updateProduct,
  removeProduct,
};
