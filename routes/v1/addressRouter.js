const express = require('express')
const { userAuth } = require('../../middlewares/userAuth')
const router = express.Router()

// Create address
router.post('/address', userAuth)
// Get address
router.get('/address', userAuth)
// Ppdate address
router.put('/address/:id', userAuth)
// Delete address
router.delete('/address/:id', userAuth)

module.exports = {addressRouter: router}