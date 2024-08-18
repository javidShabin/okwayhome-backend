require('dotenv').config();
const express = require("express");
const { apiRouter } = require('./routes');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;

app.use(cors())
app.use(cookieParser())
app.use(express.json())

// Middleware to handle requests
app.get('/', (req, res) => {
    res.send("Hello world");
});

app.use('/api', apiRouter)

// Start the server
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});