require("dotenv").config();
const express = require("express");
const { apiRouter } = require("./routes");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { dbConnection } = require("./config/dbConnection");
const port = 5000;

app.use(
  cors({
    origin: ["https://okwayhome-frontend.vercel.app", "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Middleware to handle requests
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api", apiRouter);

dbConnection();

// Start the server
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
