const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: String,
});

const Country = mongoose.model('Country_new', countrySchema);

module.exports = Country;
