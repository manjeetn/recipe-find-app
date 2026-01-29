const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmails");


const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const token = crypto.randomBytes(32).toString("hex");

    const user = await User.create({ 
      name,
      email, 
      password: hashed, 
      isVerified:false,
      verificationToken: token,    
    });

    const verifyURL = `${process.env.CLIENT_URL}/veriy/${token}`;

    await sendEmail(
      user.email,
      " Please Veriy Your Email",
       `<p>Click the link below to verify your email:</p><a href="${verifyURL}">${verifyURL}</a>`
    );
    res.json({message:"Verification Email Sent" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
});


router.get("/verify/:token", async(req, res) => {

  try {

const token = req.params.token;

const user = await User.finOne({verificationToken: token});

if(!user)
  return res.status(400).json({message:"Invalid  Verification Token"});

  user.isVerified = true;
  user.verificationToken = undefined;
  
  await user.save();

  res.json({message:"Email Verified Successfully"});

   } catch (error) {
    
 console.error("Verification Error:", error.message);
 res.status(500).json({ message: "Server error verifying email" });   
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});


router.post("/forgot-password", async (req, res) => {
  
  try {
  const {email} = req.body;

  const user = await User.findOne({email});

  if(!user)
    return res.status(400).json({message:"Incorrect email. Please enter correct email for password reset Link"});

  const token = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 1000 * 60 * 10 ;
  await user.save();

  const resetURL = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail(
    user.email,
    "Reset Password",
    `<p>Click the link to reset your password:</p><a href="${resetURL}">${resetURL}</a>`
  );

    res.json({ message: "Reset link sent" });
  
} catch (error) {
    
 console.error("Forgot Password Error:", error.message);
 res.status(500).json({ message: "Server error forgot password " }); 
  }

});


router.post("/reset-password/:token", async( req, res) => {

  try {
    
     const {password} = req.body;

     const token = req.params.token;

     const user = await User.findOne({ resetPasswordToken: token, 
                
     resetPasswordExpires: {$gt: Date.now()},
      });

     if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });
      
  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: "Password reset successfully" });

  } catch (error) {
    
    console.error("Reset Password Error:", error.message);
 res.status(500).json({ message: "Server error reset password" }); 
  }
 

});

module.exports = router;
