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
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    }
});

userSchema.query.notDeleted = function() {
    return this.where({ isDeleted: false });
};

userSchema.methods.softDelete = async function() {
    this.isDeleted = true;
    this.deletedAt = new Date();
    await this.save();
};


const User = mongoose.model('user', userSchema);

module.exports = User;