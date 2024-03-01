const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: String,
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State_new' }
  });

  const City = mongoose.model('City_new', citySchema);

module.exports = City;
