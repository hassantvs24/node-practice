const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Joi = require('joi');
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/vidly', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connect to MongoDb...'))
    .catch(err => console.error('Could not connect to MongoDb...', err));

app.use(express.json()); // for parsing application/json
app.use(express.static('public'));//Access public asset

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);



 
app.listen(3000, () => console.log(`Listening on port ${port}...`));