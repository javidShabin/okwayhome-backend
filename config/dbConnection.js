const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Database Connected...!");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { dbConnection };
