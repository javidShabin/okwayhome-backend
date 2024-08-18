const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  checkAdmin,
  getProfile,
  updateProfile,
} = require("../../controllers/adminController");
const { adminAuth } = require("../../middlewares/adminAuth");
const router = express();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/profile", adminAuth, getProfile);
router.put("/update", adminAuth, updateProfile);
router.get("/check-admin", adminAuth, checkAdmin);

module.exports = { adminRouter: router };
