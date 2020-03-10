const mongoose = require('mongoose');
const config = require('config');
var jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 255
    },
    email: {
        type: String,
        unique: true,
        required: true, 
        minlength: 5, 
        maxlength: 255
    },
    password: {
        type: String,
        required: true, 
        minlength: 5, 
        maxlength: 1024
    },
    isAdmin: Boolean,
    date: {type: Date, default: Date.now},
});

userSchema.methods.generateAuthToken = function() { //Add extra function with Schema Object
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(data){
    const schema = {
        name: Joi.string().min(5).required(),
        email: Joi.string().min(5).required(),
        password: Joi.string().min(5).required()
    };

    return Joi.validate(data, schema);
}


exports.User = User;
exports.validate = validateUser;