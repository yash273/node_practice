const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// Save a new user
router.post("/register", userController.register);

module.exports = router;