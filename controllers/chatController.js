const { Chat } = require("../models/chatModel");
const { User } = require("../models/userModel"); // Assuming there's a user model

// Send a chat message (Admin or User)
const sendMessage = async (req, res) => {
  try {
    const { userId, message, sender } = req.body;

    // Check if the sender is admin or user
    const newMessage = new Chat({
      user: userId, // User to whom the message is being sent
      message,
      sender, // 'admin' or 'user', depends on who is sending
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

// Get chat history for a specific user (for admin)
const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all chat messages between the admin and the specific user
    const chatMessages = await Chat.find({ user: userId }).sort({
      createdAt: 1,
    });

    res.status(200).json(chatMessages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};

// Fetch a list of all users who have chatted with the admin
const getUsersWithChats = async (req, res) => {
  try {
    // Fetch distinct users from the chat model
    const usersWithChats = await Chat.distinct("user");

    // Optionally, get more details for each user (e.g., name, email)
    const users = await User.find({ _id: { $in: usersWithChats } }).select(
      "name email"
    );

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users with chats" });
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
  getUsersWithChats, // Add this method to get a list of users who have chatted
};
