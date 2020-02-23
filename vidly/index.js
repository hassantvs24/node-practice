const genres = require('./routes/genres');
const express = require('express');
const app = express();
const Joi = require('joi');
const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json
app.use(express.static('public'));//Access public asset

app.use('/api/genres', genres);



 
app.listen(3000, () => console.log(`Listening on port ${port}...`));