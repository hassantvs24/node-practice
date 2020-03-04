const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} =  require('./genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,  
        maxlength: 255
    },
    genre: genreSchema,
    numberInStock: Number,
    dailyRentalRate: Number,
    date: {type: Date, default: Date.now},
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(data){
    const schema = {
        title: Joi.string().max(255).required(),
        genreId: Joi.string(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).max(10).required(),
    };

    return Joi.validate(data, schema);
}


exports.Movie = Movie;
exports.validate = validateMovie;