const express = require('express');
const router = express.Router();

const locationController = require('../controllers/location.controller');

//countires
router.get('/countires', locationController.getCountries);

router.get('/states/:countryId', locationController.getStates);

router.get('/cities/:stateId', locationController.getCitiesByStateId);

router.get('/cities/countries/:countryId', locationController.getCitiesByCountryId);

router.get('/new/countires', locationController.getNewCountries);

router.get('/new/states/:countryId', locationController.getNewStates);

router.get('/new/cities/:stateId', locationController.getNewCitiesByStateId);

module.exports = router;