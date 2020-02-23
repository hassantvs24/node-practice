const config = require('config');
const courses = require('./routes/courses');
const home = require('./routes/home');
const logger = require('./middleware/logger');
const Joi = require('joi');
const express = require('express');
const multer = require('multer');
const upload = multer();

const app = express();

const port = process.env.PORT || 3000;


app.use(express.json());  // for parsing application/json
app.use(express.urlencoded({ extended: true }));// for parsing application/xwww-
app.use(upload.array());// for parsing multipart/form-data
app.use(express.static('public'));//Access public asset
app.use(logger);


//Route Define here
app.use('/api/courses', courses);
app.use('/', home);
//Route Define here




app.listen(3000, () => console.log(`Listening on port ${port}...`));