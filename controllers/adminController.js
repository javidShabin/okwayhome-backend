const { Admin } = require("../models/adminModel");
const bcrypt = require("bcrypt");
const { generateAdminToken } = require("../utils/token");


const registerAdmin = async (req, res) => {
  try {
    // Get datas from req.body
    const { email, password, conformPassword, ...rest } = req.body;
    // Check if rerquired fields are present
    if (!email || !password || !conformPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if password and confirm password match
    if (password !== conformPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    // Check if the admin already exists
    const isAdminExist = await Admin.findOne({ email });
    if (isAdminExist) {
      return res.status(409).json({ message: "User already exists" });
    }
    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create a new admin and save the to databse
    const newAdmin = new Admin({ email, ...rest, password: hashedPassword });
    await newAdmin.save();

    // Generate a token
    const token = generateAdminToken({
      _id: newAdmin._id,
      email: newAdmin.email,
      role: "admin",
    });
    // Pass the token as cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure to true in production
      maxAge: 3600000, // 1 hour
    });
    // Return a success response
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "User creation failed", error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    // Get values from req.body
    const { name, email, password } = req.body;
    // Check if required field are present
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // Check the admin logined or not
    const isAdminExist = await Admin.findOne({ email });
    if (!isAdminExist) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" });
    }
    // Compare password for login
    const passwordMatch = bcrypt.compareSync(password, isAdminExist.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Unatherised access" });
    }
    // Generate token
    const token = generateAdminToken(isAdminExist._id);
    // Pass token as cookie the token will expire in one hour
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false,
    });
    res.status(201).json({ success: true, message: "Admin logged in" });
  } catch (error) {
    res.status(404).json({ message: "faild to admin login" });
  }
};

const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: false,
    });
    res.json({ success: true, message: "admin logged out" });
  } catch (error) {
    res.status(404).json({ message: "faild to user logout" });
  }
};

const getProfile = async (req, res) => {
  try {
    const admin = req.admin;
    const adminData = await Admin.findOne({ _id: admin.id });
    const { image, name, email, phone, _id } = adminData;
    res.json({
      success: true,
      message: "Admin profile",
      image,
      name,
      email,
      phone,
      _id,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const admin = req.admin;
    // Get update data from req.body
    const { name, email, phone } = req.body;
    // Store the data in a variable
    const updateData = { name, email, phone };
    // Updated user
    const updateAdmin = await Admin.findByIdAndUpdate(admin.id, updateData, {
      new: true,
    });
    // Check have any updated user
    if (!updateAdmin) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Send response
    res.json({
      success: true,
      message: "Admin profile updated successfully",
      data: updateAdmin,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

const checkAdmin = async (req, res) => {
  try {
    const admin = req.admin;
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Admin not autherised" });
    }
    res.json({ success: true, message: "Admin autherised" });
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getProfile,
  updateProfile,
  checkAdmin,
};
