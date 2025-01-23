const express = require("express");
const connectDB = require("./config/database");
const app = express();

app.use(express.json());


connectDB().then(() => {
    console.log("Database connection established....");
    app.listen(3000, () => {
        console.log("Server is succesfully listening....");
    });
}).catch(err => {
    console.log("Database can not be connected...", err)
})
