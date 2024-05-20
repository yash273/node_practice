const express = require('express');
const router = express.Router();
const authenticateToken = require("../middlewares/authorize");

const userController = require('../controllers/user.controller');

// Save a new user
router.post("/register", userController.register);

//login User
router.post("/login", userController.login);

//verify email
router.get("/verify/:token", userController.verify);

//forgot-password
router.post('/forgot-password', userController.forgotPassword);

//reset-password
router.post('/reset-password/:token', userController.resetPassword);

//list-users
router.get('/', authenticateToken , userController.getUsers);

//get-user by id
router.get('/:id',authenticateToken, userController.getUserFromId);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser)

// router.put('/name/:id', userController.updateNameMobile);

router.get('/address/:id',authenticateToken, userController.getAddresses);

router.post('/seq/create-user', userController.createUserSeq);

router.get('/seq/users', userController.getUsersSeq);

router.get('/seq/:id', userController.getUserSeqById);

router.delete('/seq/:id', userController.deleteUserSeq);

router.put('/seq/:id', userController.updateUserSeq);

router.post('/seq/restore', userController.restoreUserSeq);

router.get('/seq/address/:id', userController.getAddressesSeq);

module.exports = router;