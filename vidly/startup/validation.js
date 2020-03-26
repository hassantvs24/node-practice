const Joi = require('joi');
module.exports = function (){

    Joi.objectId = require('joi-objectid')(Joi); //For validating mongoDB ID formate
    
}