// const sendVerificationEmail = require("../utils/email");
const userModel = require("../models/userModel");
// const generateVerificationToken = require("../models/token");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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

    const randomString = Math.random().toString(36).substring(2);

    // Hash the random string using bcrypt
    const token = await bcrypt.hash(randomString, 10); // 10 is the salt rounds
    
    // Generate verification token
    const verificationToken = token;
    // Construct verification link
    const verificationLink = `${process.env.BASE_URL}/user/verify/${newUser.id}/${verificationToken}`;

    // Send verification email

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
        tls: {
            rejectUnauthorized: false // Disable TLS certificate verification
        },
        connectionTimeout: 60 * 1000, // Increase connection timeout to 60 seconds
    });

    const message = verificationLink;
    const emailx = newUser.email;

    const mailOptions = {
      from: process.env.USER,
      to: emailx,
      subject: "Email Verification",
      text: `Please click on the following link to verify your email: ${message}`,
      html: `<p>Please click on the following link to verify your email:</p><p><a href="${message}">Verify Email</a></p>`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    // res.send("An Email sent to your account please verify");

    res.status(201).json({ message: 'An Email sent to your account please verify' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
};
