const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    id: Number,
    name: String
  });

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;