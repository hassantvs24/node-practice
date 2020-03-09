const {Rental, validate} = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);


router.post('/', async function (req, res) {

    const {error} = validate(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
	
	/*let isValidCustomerID = mongoose.Types.ObjectId.isValid(req.body.customerId);
	if(!isValidCustomerID) return res.status(400).send('Invalid Customer ID.');
	
	let isValidMovieID = mongoose.Types.ObjectId.isValid(req.body.movieId);
	if(!isValidMovieID) return res.status(400).send('Invalid Movie ID.');*/

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid Customer.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid Movie.');


    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        dateReturned: new Date(req.body.dateReturned),
        rentalFee: req.body.rentalFee
    });


    /*const result = await rental.save(); //Without Transaction

    movie.numberInStock--;
    await movie.save();*/

   try {
       new Fawn.Task().save('rentals', rental).update('movies', {_id:movie._id},{$inc: {numberInStock: -1}}).run();//With Transaction
        res.send(rental);
    }
    catch (ex) {
        return res.status(500).send(ex.message);
    }
});














module.exports = router;