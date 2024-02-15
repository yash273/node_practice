const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try{
        const { firstname, lastname, email, password, mobile} = req.body;

        //check if user already exists
        const existingUser = await userModel.findOne( {email});
        if (existingUser){
            return res.status(400).json({ message: "User with this email already exists" });
        }

        //encrypt password
        const encryptedPassword = await bcrypt.hase(password, 10);

        //create new user
        const newUser = await userModel.create({
            firstname, 
            lastname, 
            email, 
            password : encryptedPassword, 
            mobile
        });

        res.status(201).json({ user : newUser});
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    register
};