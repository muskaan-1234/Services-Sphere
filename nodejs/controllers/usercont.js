var getSignUserSchema = require("../models/usermodel");
var signUserColRef = getSignUserSchema();
var webtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const crypto=require("crypto");
const saltRounds = 10;
const sendEmail = require("../emailsender");
const uuid=require("uuid");
const tokenMapping = {};

async function signup_process_with_post(req, resp) {
  const { email, pass, type } = req.body;

  bcrypt.hash(pass, saltRounds, async (err, hash) => {
    if (err) {
      resp.send('Error hashing password');
    } else {
      const newUser = new signUserColRef({ email, pass: hash, type });
      await newUser
        .save()
        .then((doc) => {
          console.log('User registered successfully');
          resp.send('Signed up successfully');
        })
        .catch((err) => {
          resp.send(err);
        });
    }
  });
}
//==============================================
async function login_process_with_post(req, resp) {
  console.log(req.body);
  console.log(process.env.sec_key);

  const user = await signUserColRef.findOne({ email: req.body.email });

  if (!user) {
    return resp.json({ status: false, message: "Invalid user id" });
  }

  bcrypt.compare(req.body.pass, user.pass, (err, result) => 
  {
    if (err || !result) {
      return resp.json({ status: false, message: "Invalid password" });
    } 
    else
     {
      var token = webtoken.sign(
        { email: user.email, type: user.type },
        process.env.sec_key,
        { expiresIn: '1h' }
      );
      console.log(token);
      resp.json({ status: true, user, token, message: "You have successfully logged in" });
    }
  });
}
//==============================
async function currentUser(req, resp) {
  const count = await signUserColRef.find({ email: req.email });

  if (count === 0) {
    return resp.json({ status: false, message: "Invalid user id" });
  }
  else {
    var user = await signUserColRef.findOne({ email: req.email });
    resp.json({ status: true, message: "Valid User", user });
    return;
  }

}
//===========================================
async function request_password_reset(req, resp) {
  console.log("request_password_reset");
  const email = req.body.email;
  console.log(email);
  const token = webtoken.sign({ email }, process.env.sec_key, { expiresIn: 60 * 1 });
      const tokenWithBearer = `Bearer ${token}`;
         console.log(tokenWithBearer);

  try 
  {
    if (!email) 
    {
      return resp.json({ status: false, message: "Invalid email" });
    }

    const resetToken = uuid.v4();
    // console.log(resetToken);

    tokenMapping[resetToken] = token;

    const user = await signUserColRef.findOne({ email });

    if (!user) {
      return resp.json({ status: false, message: "User not found" });
    }

    console.log('Reset Token:', resetToken);

    user.resetToken = resetToken;
    await user.save();

    const resetLinkWithoutToken = `http://localhost:3001/user/fpass?resetId=${resetToken}`;
    console.log('Reset Link:', resetLinkWithoutToken);

    const mailOptions = {
      from: 'muskaan.in2808@gmail.com',
      to: email,
      subject: 'Password Reset',
      html: ` Click the following link to reset your password: <a href="${resetLinkWithoutToken}">Reset Password</a>`,
    };

    try 
    {
      const info = await sendEmail(mailOptions);
      console.log('Email sent:', info.response);
      resp.json({ status: true, message: "Password reset email sent successfully" });
    } 
    catch (error) 
    {
      console.error('Error sending email:', error);
      resp.json({ status: false, message: "Internal server error" });
    }
  } 
  catch (error) 
  {
    console.error("Error in request_password_reset:", error);
    resp.json({ status: false, message: "Internal server error" });
  }
}
//=======================================
async function emailUser(req, resp) 
{
  console.log("emailuser called");
  const token = req.query.token;

  if (!token)
  {
    return resp.json({ status: false, message: "Token is missing" });
  }
  console.log("Token received on the server: ", token); 

  try
   {
    const decodedToken = webtoken.verify(token, process.env.sec_key);
    console.log('Token verified on the server:', decodedToken);
    resp.json({ status: true, message: 'Token is valid', data: decodedToken });
  } 
  catch (error) 
  {
    return resp.json({ status: false, message: 'Invalid token' });
  }
}
//=====================================
module.exports = {
  signup_process_with_post,
  login_process_with_post,
  currentUser,request_password_reset,emailUser
};
