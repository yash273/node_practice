const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country_new' },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State_new' },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City_new' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Address', addressSchema);