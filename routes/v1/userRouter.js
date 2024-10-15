const express = require("express");
const { loginUser, registerUser, logoutUser, userList, getProfile, updateProfile, removeUser, checkUser } = require("../../controllers/userController");
const { userAuth } = require("../../middlewares/userAuth");
const { upload } = require("../../middlewares/multer");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/user-list", userList);

router.get("/profile", userAuth, getProfile);

router.put("/update", userAuth, upload.single("image"), updateProfile);

router.delete("/remove/:id", removeUser);

router.get("/check-user", userAuth, checkUser);

module.exports = { userRouter: router };
