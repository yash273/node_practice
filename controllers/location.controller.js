const countryModel = require("../models/countryModel");
const stateModel = require("../models/stateModel");
const cityModel = require("../models/cityModel")

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
        res.status(200).json({ cities : result });
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
        res.status(200).json({ cities : result });
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
getCitiesByCountryId
};
