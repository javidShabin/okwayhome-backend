const express = require("express");
const router = express();

router.post("/register");
router.post("/login");
router.post("/logout");
router.get("/profile");
router.put("/update");
router.get("/check-admin");

Module.export = { adminRouter: router };
