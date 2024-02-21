const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const { port, db } = require('./config');


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

mongoose
    .connect(db, {})
    .then(() => {
        console.log('Connected to MongoDB');

        app.listen(port, () => {
          console.log(`Node API app is running on port: ${port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
      });