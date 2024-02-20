const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// Save a new user
router.post("/register", userController.register);

//login User
router.post("/login", userController.login);

//verify email
router.get("/verify/:token", userController.verify)

module.exports = router;