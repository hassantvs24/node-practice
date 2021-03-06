require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');


module.exports = function (){
    process.on('uncaughtException', (ex) => { //Uncaught Exceptions Error Handle
        winston.error(ex.message, ex);
        process.exit(1);//1 = process exit active 0= process exit inactive
    });
    
    process.on('unhandledRejection', (ex) => { //Unhandled Rejection Error Handle
        throw ex;
    });
    
    winston.exceptions.handle(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({filename: 'uncaughtException.log'})
        );//File base error log implementation for exception
    winston.add(new winston.transports.File({filename: 'logfile.log'}));//File base error log implementation
    winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/vidly', options: {useUnifiedTopology: true, useNewUrlParser: true}}));//File base error log implementation

}