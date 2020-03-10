require('dotenv').config();

const express = require('express');
const app = express();
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/logging')();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const port = process.env.PORT || 3000;



    
    /*const p = Promise.reject(new Error('Unhandled Rejection during startup.'));
    p.then(() => console.log('Done'));*/
    //throw new Error('Failed during startup.');
 
app.listen(3000, () => console.log(`Listening on port ${port}...`));