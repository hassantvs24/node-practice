require('dotenv').config();
const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/db')();
require('./startup/routes')(app);
require('./startup/logging')();//Error logging
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(3000, () => winston.info(`Listening on port ${port}...`));