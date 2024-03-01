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
    // stateId: Number,
    // countryId: Number,
    // cityId: Number,

    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country_new' },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State_new' },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City_new' },

    isVerified: { 
        type: Boolean, 
        default: false 
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;