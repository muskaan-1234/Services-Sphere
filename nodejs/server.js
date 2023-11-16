var express = require("express");
var mongoose = require("mongoose");
var userRouter = require("./routers/userrouter");
var clientRoutes = require("./routers/clientrouter");
var cors = require("cors");
var fileupload = require("express-fileupload");
var bp = require("body-parser");
var env = require("dotenv");

env.config();

var app = express();

app.use(fileupload());

app.use(bp.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

const port = process.env.PORT || 3000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(cors());


// server.js

var configObj = require("./configure/dbConfig");
const dburl = configObj.dburl;

// Connect to the MongoDB database
var dbCon = mongoose.connect(dburl).then(() => {
    console.log("Connected...");
}).catch((err) => {
    console.log("*****" + err.toString());
    process.exit();
});

// Define routes for the user and client
app.use("/user", userRouter);
app.use('/client', clientRoutes);











// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware for parsing URL-encoded and JSON request bodies