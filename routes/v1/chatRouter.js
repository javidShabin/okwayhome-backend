const express = require("express");
const { sendMessage, getChatHistory, removeAllChats } = require("../../controllers/chatController");
const router = express.Router();

router.post('/send', sendMessage);
router.get('/:userId', getChatHistory);
router.delete('/:userId', removeAllChats)

module.exports = { chatRouter: router };