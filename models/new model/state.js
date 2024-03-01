const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  name: String,
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country_new' }
});

const State = mongoose.model('State_new', stateSchema);

module.exports = State;
