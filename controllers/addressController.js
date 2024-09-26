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
const getAddress = async () => {};
// Update address
const updateAddress = async () => {};
// Delete address
const deleteAddress = async () => {};
