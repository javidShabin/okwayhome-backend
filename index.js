require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use('/', (req,res) => {
    res.send("Hello world")
})

app.listen(port, ()=>{
    console.log(`the server runnig in ${port}`)
})