const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const { cloudinaryInstance } = require("../config/cloudinaryConfig");

const registerUser = async (req, res) => {
  try {
    // Get data from req.body
    const { email, password, conformPassword, ...rest } = req.body;

    // Check if required fields are present
    if (!email || !password || !conformPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if password and confirm password match
    if (password !== conformPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the user already exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user and save the data to the database
    const newUser = new User({ email, ...rest, password: hashedPassword });
    await newUser.save();

    // Generate a token
    const token = generateToken({
      _id: newUser._id,
      email: newUser.email,
      role: "customer",
    });

    // Pass the token as a cookie (the token will expire in one hour)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure to true in production
      maxAge: 3600000, // 1 hour
    });

    // Return a success response
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "User creation failed", error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    // Get values from req.body
    const { name, email, password } = req.body;
    // Check if required fields are present
    if ((!name, !email, !password)) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // Check the user signed or not
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" });
    }
    // Compare password for login
    const passwordMatch = bcrypt.compareSync(password, isUserExist.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Unatherised access" });
    }
    // Generate token
    const token = generateToken(isUserExist._id);

    // Pass token as cookie the token will expire in one hour
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    res.status(201).json({ success: true, message: "User logged in" });
  } catch (error) {
    res.status(404).json({ message: "faild to user login" });
  }
};

// Logout user
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
    res.json({ success: true, message: "User logged out" });
  } catch (error) {}
};

// Get list all useres
const userList = async (req, res) => {
  try {
    const useres = await User.find({});
    return res.status(200).json(useres);
  } catch (error) {
    res.status(404).json({ message: "Server not responese..." });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const { user } = req;

    // Get user data using user id
    const userData = await User.findOne({ _id: user.id });
    const { image, name, email, phone, _id } = userData;
    res.json({
      success: true,
      message: "User profile",
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
    const { user } = req;
    // Get update data from req.body
    const { name, email, phone, password } = req.body;

    // Store update in a variable
    const updateData = { name, email, phone, password };
    // Hash new password if user update is
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    let uploadResult;

    if (req.file) {
      try {
        uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
        // Assign the uploaded image URL to the user's image field
        updateData.image = uploadResult.secure_url;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "File upload failed",
          error: uploadError.message,
        });
      }
    }
    // Updated user
    const updatedUser = await User.findByIdAndUpdate(user.id, updateData, {
      new: true,
    });
    // Check have any updated user
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Send response
    res.json({
      success: true,
      message: "User profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

const removeUser = async (req, res) => {
  try {
    // Extract user ID from request parameters
    const { id } = req.params;

    // Use findByIdAndDelete to remove the user
    const deletedUser = await User.findByIdAndDelete(id);

    // If user not found, return an error
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If user is successfully deleted
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    // Handle any errors
    res.status(401).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};

// Check user authorized or not
const checkUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "user not autherised" });
    }
    res.json({ success: true, message: "user autherised" });
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  userList,
  updateProfile,
  getProfile,
  removeUser,
  checkUser,
};
