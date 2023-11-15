const express = require("express");
const controller=require("../controllers/usercont") 
const app = express.Router();

const { jwtAuth } = require("../middleware/auth.js");
const {verifyToken}=require("../middleware/forgotauth.js");

app.post("/signup-process-with-post", controller.signup_process_with_post);
app.post("/login-process-with-post", controller.login_process_with_post);
app.get("/currentUser", jwtAuth, controller.currentUser);
app.post("/request-password-reset",controller.request_password_reset)
app.get("/verify-reset-token",verifyToken,controller.emailUser)

module.exports = app;
