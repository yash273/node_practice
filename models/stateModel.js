const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  id: Number,
  name: String,
  country_id: Number
});

const State = mongoose.model('State', stateSchema);

module.exports = State;
