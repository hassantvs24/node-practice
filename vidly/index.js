require('dotenv').config();
const error = require('./middleware/error');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const port = process.env.PORT || 3000;


if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);//1 = process exit active 0= process exit inactive
}

mongoose.connect('mongodb://localhost/vidly', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('Connect to MongoDb...'))
    .catch(err => console.error('Could not connect to MongoDb...', err));

app.use(express.json()); // for parsing application/json
app.use(express.static('public'));//Access public asset

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);




 
app.listen(3000, () => console.log(`Listening on port ${port}...`));