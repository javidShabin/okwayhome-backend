const { Address } = require("../models/addressModel");

// Create address
const createAddress = async (req, res) => {
  try {
    // Get datas from req.body
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
    const userId = req.user.id;
    // Check if wanted details are present
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
    // Add the address in database
    const address = new Address({
      name,
      email,
      street,
      houseName,
      phone,
      district,
      landmark,
      postalCode,
    });
    await address.save();
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get address
const getAddress = async () => {
  try {
    // Get userId from reqq.
    const userId = req.user.id;
    // Find the address using userId
    const addess = await Address.find({ user: userId });
    // Check if have any address
    if (!addess) {
      return res.status(400).json({ message: "Not have any address" });
    }
    res.status(200).json(addess);
  } catch (error) {}
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
