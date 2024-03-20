const countryModel = require("../models/countryModel");
const stateModel = require("../models/stateModel");
const cityModel = require("../models/cityModel");
const addressModel = require("../models/address");
const Country_new = require("../models/new model/country");
const State_new = require("../models/new model/state");
const City_new = require("../models/new model/city");

const getCountries = async (req, res) => {
  try {
    const result = await countryModel.find();

    res.status(200).json({ countries: result });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getStates = async (req, res) => {
  const { countryId } = req.params;
  try {
    const result = await stateModel.find({ country_id: countryId });
    res.status(200).json({ states: result });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCitiesByStateId = async (req, res) => {
  const { stateId } = req.params;
  try {
    const result = await cityModel.find({ state_id: stateId });
    res.status(200).json({ cities: result });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCitiesByCountryId = async (req, res) => {
  const { countryId } = req.params;
  try {
    const result = await cityModel.find({ country_id: countryId });
    res.status(200).json({ cities: result });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getNewCountries = async (req, res) => {
  try {
    const result = await Country_new.find();

    res.status(200).json({ countries: result });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUserPerState = async (req,res) => {
  const { countryId } = req.params;
  try {

    const pipeline = [
      {
        $group: {
          _id: "$state",
          users: { $sum: 1 }
        },
      }
    ];
    
    const responseData = await addressModel.aggregate(pipeline);
    const statesWithUsers = responseData.map(stateData => stateData._id.toString());
    const allStates = await State_new.find({ country: countryId });
        
    const finalData = allStates.map(state => {
      const stateId = state._id.toString();
      const name = state.name;
      let usersCount = 0;
      if (statesWithUsers.includes(stateId)) {
        const stateData = responseData.find(s => s._id.toString() === stateId);
        usersCount = stateData ? stateData.users : 0;
      }
      return { name , usersCount };
    });    

    res.status(200).json({ states: finalData });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

const getNewStates = async (req, res) => {
  const { countryId } = req.params;
  try {
    const result = await State_new.find({ country: countryId })

    res.status(200).json({ states: result });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getNewCitiesByStateId = async (req, res) => {
  const { stateId } = req.params;
  try {
    const result = await City_new.find({ state: stateId });
    res.status(200).json({ cities: result });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCountries,
  getStates,
  getCitiesByStateId,
  getCitiesByCountryId,
  getNewCountries,
  getNewStates,
  getNewCitiesByStateId,
  getUserPerState
};
