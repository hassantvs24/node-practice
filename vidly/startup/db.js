const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function (){
    mongoose.connect('mongodb://localhost/vidly', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => winston.info('Connect to MongoDb...'));
    //.catch(err => console.error('Could not connect to MongoDb...', err));
}