const { Address } = require("../models/addressModel");

// Create address
const createAddress = async (req, res) => {
  try {
    // Get data from req.body
    const {
      name,
      email,
      houseName,
      phone,
      district,
      street,
      landmark,
      postalCode,
    } = req.body;

    // User id
    const userId = req.user.id; // Assuming you have middleware that sets req.user

    // Check if all required fields are present
    if (
      !name ||
      !houseName ||
      !phone ||
      !district ||
      !street ||
      !landmark ||
      !postalCode
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Add the address in the database, associating it with the user
    const address = new Address({
      user: userId, // Associate the address with the user ID
      name,
      email,
      houseName,
      phone,
      district,
      street,
      landmark,
      postalCode,
    });

    await address.save();

    res.status(201).json({ message: "Address created successfully", address });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get address
const getAddress = async (req, res) => {
  try {
    // Get userId from req.user
    const userId = req.user.id;

    // Find the addresses using userId
    const addresses = await Address.find({ user: userId });

    // Check if the user has any addresses
    if (addresses.length === 0) {
      return res.status(404).json({ message: "No addresses found" });
    }

    // Respond with the found addresses
    res.status(200).json(addresses);
  } catch (error) {
    // Handle errors appropriately
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update address
const updateAddress = async () => {
  try {
    // Get address id from req.params
    const addressId = req.params.id;
    const updatedData = req.body;
    const address = await Address.findByIdAndUpdate(addressId, updatedData, {
      new: true,
    });
    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete address
const deleteAddress = async () => {
  try {
    // Get user id from req.user
    const userId = req.user.id;
    await Address.findByIdAndDelete(userId);
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  createAddress,
  updateAddress,
  getAddress,
  deleteAddress,
};
