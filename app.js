const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRouter');
const { port, db } = require('./config');

const app = express();
// Set EJS as templating engine 
app.set('view engine', 'ejs');
app.use(express.json());
// Enable CORS for all routes
app.use(cors());
app.use('/user', userRoutes);

const router = express.Router();
const userController = require('./controllers/user.controller');
app.use('/usernew', router.get('/', userController.getNewUsers));
app.use('/location', locationRoutes);


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
