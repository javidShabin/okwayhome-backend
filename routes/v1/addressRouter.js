const express = require("express");
const { userAuth } = require("../../middlewares/userAuth");
const {
  createAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} = require("../../controllers/addressController");
const router = express.Router();

// Create address
router.post("/address", userAuth, createAddress);
// Get address
router.get("/address", userAuth, getAddress);
// Update address
router.put("/address/:id", userAuth, updateAddress);
// Delete address
router.delete("/address/:id", userAuth, deleteAddress);

module.exports = { addressRouter: router };
