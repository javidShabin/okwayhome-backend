const express = require("express");
const { userRouter } = require("./userRouter");
const { adminRouter } = require("./adminRouter");
const { productRouter } = require("./productRouter");
const { cartRouter } = require("./cartRouter");
const router = express.Router();

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/product', productRouter)
router.use('/cart', cartRouter)

module.exports = { v1Router: router };
