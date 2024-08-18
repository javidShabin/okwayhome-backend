const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  checkAdmin,
  getProfile,
  updateProfile,
} = require("../../controllers/adminController");
const router = express();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/profile", getProfile);
router.put("/update", updateProfile);
router.get("/check-admin", checkAdmin);

module.exports = { adminRouter: router };
