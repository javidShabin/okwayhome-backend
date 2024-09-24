const { cloudinaryInstance } = require("../config/cloudinaryConfig");
const { Product } = require("../models/productModel");

const getAllProducts = async (req, res) => {
  res.send("hello");
};
const getProductById = async (req, res) => {
  res.send("hello");
};
const fileterProduct = async (req, res) => {
  res.send("hello");
};
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
  fileterProduct,
  createProduct,
  updateProduct,
  removeProduct,
};
