const express = require("express");
const { getAllProducts, getProductById, createProduct, updateProduct, removeProduct, filteredProduct } = require("../../controllers/productController");
const { adminAuth } = require("../../middlewares/adminAuth");
const { upload } = require("../../middlewares/multer");
const router = express.Router();

// Get all products
router.get('/list', getAllProducts)
// Get product by id
router.get('/product/:id', getProductById)
// Create products
router.post('/create', adminAuth, upload.single("image"), createProduct)
// filtering product
router.get('/filter', filteredProduct)
// Update the product
router.put('/update/:id', updateProduct)
// Delete the product
router.delete('/remove/:id', removeProduct)

module.exports = { productRouter: router };
