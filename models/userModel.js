const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true,
        lowercase : true,
        trim : true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    mobile: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;