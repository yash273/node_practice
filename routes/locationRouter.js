const express = require('express');
const router = express.Router();
const authenticateToken = require("../middlewares/authorize");

const locationController = require('../controllers/location.controller');

//countires
router.get('/countires', locationController.getCountries);

router.get('/states/:countryId', locationController.getStates);

router.get('/cities/:stateId', locationController.getCitiesByStateId);

router.get('/cities/countries/:countryId', locationController.getCitiesByCountryId);

router.get('/new/countires', locationController.getNewCountries);

router.get('/new/states/:countryId', locationController.getNewStates);

router.get('/new/user_per_states/:countryId', authenticateToken, locationController.getUserPerState);

router.get('/new/cities/:stateId', locationController.getNewCitiesByStateId);

//seq
router.get('/seq/countires',locationController.getCountriesSeq);

router.get('/seq/states/:countryId', locationController.getStatesSeq);

router.get('/seq/cities/:stateId', locationController.getCitesSeq);

router.post('/seq/create-address', locationController.createAddressSeq)

module.exports = router;