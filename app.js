const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Country = require("./models/new model/country");
const State = require("./models/new model/state");
const City = require("./models/new model/city");

const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRouter');
const { port, db } = require('./config');
// const faker = require('faker')

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
const app = express();
// Set EJS as templating engine 
app.set('view engine', 'ejs');
app.use(express.json());
app.use(allowCrossDomain)
app.use('/user', userRoutes);

const router = express.Router();
const userController = require('./controllers/user.controller');
app.use('/usernew', router.get('/', userController.getNewUsers));
app.use('/location', locationRoutes);



async function generateRealisticData() {
  try {
    // Define countries
    const countriesData = [
      { name: 'United States' },
      { name: 'Canada' },
      { name: 'United Kingdom' },
      // Add more countries as needed
    ];

    // Insert countries into the database
    const insertedCountries = await Country.insertMany(countriesData);

    // Define states for each country
    const statesData = [];
    insertedCountries.forEach(country => {
      for (let i = 0; i < 5; i++) { // Let's add 5 states per country
        statesData.push({
          name: `State ${i + 1} of ${country.name}`,
          country: country._id
        });
      }
    });

    // Insert states into the database
    const insertedStates = await State.insertMany(statesData);

    // Define cities for each state
    const citiesData = [];
    insertedStates.forEach(state => {
      for (let i = 0; i < 10; i++) { // Let's add 10 cities per state
        citiesData.push({
          name: `City ${i + 1} of ${state.name}`,
          state: state._id
        });
      }
    });

    // Insert cities into the database
    await City.insertMany(citiesData);

    console.log('Realistic data inserted successfully.');
  } catch (error) {
    console.error('Error generating realistic data:', error);
  } 
}

// async function fetchCountries() {
//   try {
//     const response = await axios.get('http://api.geonames.org/searchJSON?username=ksuhiyp');
//     const countries = response.data.geonames; // Assuming country data is available in the 'geonames' array
//     return countries;
//   } catch (error) {
//     console.error('Error fetching countries:', error);
//     throw error;
//   }
// }

// async function fetchStates(countryCode) {
//   try {
//     const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${countryCode}&username=ksuhiyp`);
//     const states = response.data.geonames; // Assuming state data is available in the 'geonames' array
//     return states;
//   } catch (error) {
//     console.error(`Error fetching states for country code ${countryCode}:`, error);
//     throw error;
//   }
// }

// async function fetchCities(stateName) {
//   try {
//     const response = await axios.get(`http://api.geonames.org/searchJSON?name=${stateName}&featureCode=PCLI&username=ksuhiyp`);
//     const cities = response.data.geonames; // Assuming city data is available in the 'geonames' array
//     return cities;
//   } catch (error) {
//     console.error(`Error fetching cities for state ${stateName}:`, error);
//     throw error;
//   }
// }

// async function insertData() {
//   try {
//     // Fetch countries from Geonames API
//     const countries = await fetchCountries();
//     for (const country of countries) {
//       const countryData = { name: country.name, geonameId: country.geonameId, countryCode: country.countryCode }; // Assuming each country document has 'name' and 'geonameId' fields
//       const insertedCountry = await Country.create(countryData);

//       // Fetch states for the current country
//       const states = await fetchStates(country.geonameId);
//       for (const state of states) {
//         const stateData = { name: state.name, country: insertedCountry._id }; // Assuming each state document has a 'name' field
//         const insertedState = await State.create(stateData);
        
//         // Fetch cities for the current state
//         const cities = await fetchCities(state.name);
//         for (const city of cities) {
//           const cityData = { name: city.name, state: insertedState._id }; // Assuming each city document has a 'name' field
//           await City.create(cityData);
//         }
//       }
//     }
//     console.log('Realistic data inserted successfully.');
//   } catch (error) {
//     console.error('Error inserting realistic data:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

mongoose
    .connect(db, {})
    .then(() => {
        console.log('Connected to MongoDB');
        
        app.listen(port, () => {
          console.log(`Node API app is running on port: ${port}`);
        });
        // insertData();
        // generateRealisticData();
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
      });
