const express = require("express");
const { userRouter } = require("./userRouter");
const { adminRouter } = require("./adminRouter");
const { productRouter } = require("./productRouter");
const { cartRouter } = require("./cartRouter");
const { addressRouter } = require("./addressRouter");
const router = express.Router();

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/product', productRouter)
router.use('/cart', cartRouter)
router.use('/address', addressRouter)

module.exports = { v1Router: router };
