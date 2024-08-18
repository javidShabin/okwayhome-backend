const express = require("express");

const router = express.Router();

router.post("/register", (req, res) => {
    res.send("ho");
});

router.post("/login");

router.post("/logout");

router.get("/user-list");

router.get("/profile");

router.put("/update");

router.delete("/remove/:id");

router.get("/check-user");

module.exports = { userRouter: router };
