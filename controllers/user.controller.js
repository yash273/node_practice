const fs = require('fs');
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const jwt = require("jsonwebtoken");

function sendEmailForVerification(verificationLink, newUser, res) {

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.ETH_USER,
        pass: process.env.ETH_PASS
    }
  });
const name = verificationLink
  ejs.renderFile('D:/Training/node learning/node_practice/views/email-varification.ejs', {verificationLink} , (err, data) => {
    if(err){
      console.log(err);
    } else{
      const emailx = newUser.email;

      const mailOptions = {
        from: process.env.ETH_USER,
        to: emailx,
        subject: "Email Verification",
        text: `Please click on the following link to verify your email: ${verificationLink}`,
        html: data
      };

      // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });

    }
  })

  

  
}

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, mobile } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await userModel.create({
      firstname,
      lastname,
      email,
      password: encryptedPassword,
      mobile,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });

    // Construct verification link
    const verificationLink = `${process.env.FRONT_END_BASE_URL}/verify/${token}`;

    // Send verification email
    sendEmailForVerification(verificationLink, newUser, res);

    res.status(201).json({ message: "An Email sent to your account please verify" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find existing User
    const existingUser = await userModel.findOne({ email });

    if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    // Generate a JWT token
    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verify = async (req, res) => {
  try {
    const { token } = req.params;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Email verification failed, possibly the link is invalid or expired" });
      }
      const userId = decoded.userId;
      try {
        const existingUser = await userModel.findById(userId);
        if (!existingUser) {
          return res.status(400).json({ message: "User not found" });
        }
        // Update user verification status
        existingUser.isVerified = true;
        await existingUser.save();
        res.status(200).json({ message: "Email Verified Successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while verifying email" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while verifying email" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    //find existing User
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    



  } catch (error) {

  }
};

module.exports = {
  register,
  login,
  verify,
};
