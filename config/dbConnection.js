const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/okwayhome");
    console.log("Database Connected...!");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { dbConnection };
