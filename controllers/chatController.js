const { Chat } = require("../models/chatModel");

// Send a chat message
const sendMessage = async (req, res) => {
  try {
    const { userId, message, sender } = req.body;
    const newMessage = new Chat({
      user: userId,
      message,
      sender,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};
const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const chatMessages = await Chat.find({ user: userId }).sort({
      createdAt: 1,
    });
    res.status(200).json(chatMessages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};

// Remove all chats for a specific user
const removeAllChats = async (req, res) => {
  try {
    const { userId } = req.params;
    await Chat.deleteMany({ user: userId });
    res.status(200).json({ message: "All chats removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove chat history" });
  }
};

module.exports = {
  sendMessage,
  getChatHistory,
  removeAllChats,
};
