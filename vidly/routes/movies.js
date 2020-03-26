const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();


router.get('/', async function (req, res) {
    const movie = await Movie.find();
    res.send(movie);
});


router.get('/:id', async function (req, res) {
	try{
    const movie = await Movie.findById(req.params.id);
		res.send(movie);
	} catch(ex) {
		return res.status(404).send('Invalid movie.');
	}
});


router.post('/', [auth], async function (req, res) {

    const {error} = validate(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('Invalid genre.');


    const movie = new Movie({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id: genre._id,
            name: genre.name
        }
    });


   try {
    const result = await movie.save();
        res.send(result);
    }
    catch (ex) {
        return res.status(400).send(ex.message);
    }
});


router.put('/:id', [auth], async function (req, res) {

    const movie = await Movie.findById(req.params.id); //'params' get data form url parameter
    if(!movie) return res.status(404).send('Given id not found');

    const {error} = validate(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    movie.title = req.body.title;
    movie.numberInStock = req.body.numberInStock;
    movie.dailyRentalRate = req.body.dailyRentalRate;
    movie.genre = {
        _id: genre._id,
        name: genre.name
    };

    try {
        const result = await movie.save();
            res.send(result);
        }
    catch (ex) {
            return res.status(400).send(ex.message);
        }
});


router.delete('/:id', [auth, admin], async function (req, res) {
    const movie = await Movie.findOneAndRemove(req.params.id);
    res.send(movie);
});


module.exports = router;