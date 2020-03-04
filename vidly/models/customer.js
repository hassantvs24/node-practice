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
    },
    date: {type: Date, default: Date.now},
});

const Customer = mongoose.model('Customer', customerSchema);


function validateCustomer(data){
    const schema = {
        name: Joi.string().min(5).required(),
        phone: Joi.string().min(11).max(11).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(data, schema);
}


exports.Customer = Customer;
exports.validate = validateCustomer;