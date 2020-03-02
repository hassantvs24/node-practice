const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();

const genres = [
    {id: 1, name:'Comedy'},
    {id: 2, name:'Action'},
    {id: 3, name:'Horror'},
    {id: 4, name:'Drama'},
    {id: 5, name:'Animation'}
];


const genreSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 255
    },
    date: {type: Date, default: Date.now},
});

const Genre = mongoose.model('Genre', genreSchema);

 
    router.get('/', async function (req, res) {
        const genre = await Genre.find();
        res.send(genre);
    });

    router.get('/:id', async function (req, res) {


        const genre = await Genre.findById(req.params.id);
        res.send(genre);

    });



    router.post('/', async function (req, res) {

            const {error} = validateGenre(req.body)
            if(error) {
                return res.status(400).send(error.details[0].message);
            }

            const genre = new Genre({
                name: req.body.name
            });

           try {
            const result = await genre.save();
                res.send(result);
            }
            catch (ex) {
                return res.status(400).send(ex.message);
            }

    });



    router.put('/:id', async function (req, res) {

            const genre = await Genre.findById(req.params.id); //'params' get data form url parameter
            if(!genre) return res.status(404).send('Given id not found');

            const {error} = validateGenre(req.body)
            if(error) {
                return res.status(400).send(error.details[0].message);
            }

            genre.name = req.body.name;

            try {
                const result = await genre.save();
                    res.send(result);
                }
            catch (ex) {
                    return res.status(400).send(ex.message);
                }
    });



    router.delete('/:id', async function (req, res) {
        const genre = await Genre.findOneAndRemove(req.params.id);
        res.send(genre);
    });



function validateGenre(data){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(data, schema);
}

module.exports = router;