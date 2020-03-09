const mongoose = require('mongoose');
const Joi = require('joi');


const customerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 255
    },
    phone: {
        type: String, 
        required: true, 
        minlength: 11, 
        maxlength: 11
    },
    isGold: {
        type: Boolean,
        default: false
    }
});


const movieSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,  
        trim: true,
        maxlength: 255
    },
    dailyRentalRate: Number
});


const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerSchema, 
        required: true
    },
    movie: {
        type: movieSchema, 
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});


const Rental = mongoose.model('Rental', rentalSchema);


function validateRental(data){
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
        dateReturned: Joi.date().required(),
        rentalFee: Joi.number().required()
    };

    return Joi.validate(data, schema);
}


exports.Rental = Rental;
exports.validate = validateRental;