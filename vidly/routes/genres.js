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

 
    router.get('/', function (req, res) {
        res.send(genres);
    });

    router.get('/:id', function (req, res) {

            let genre = genres.find(c => c.id === parseInt(req.params.id)); //'params' get data form url parameter
            if(!genre) return res.status(404).send('Given id not found');

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

            /*let genre = {
                id: genres.length +1,
                name: req.body.name
            };*/

           // genres.push(genre);
           try {
            const result = await genre.save();
                res.send(result);
            }
            catch (ex) {
                for(field in ex.errors){
                    console.log(ex.errors[field]);
                }
            }

    });



    router.put('/:id', function (req, res) {

            let genre = genres.find(c => c.id === parseInt(req.params.id)); //'params' get data form url parameter
            if(!genre) return res.status(404).send('Given id not found');

            const {error} = validateGenre(req.body)
            if(error) {
                return res.status(400).send(error.details[0].message);
            }

            genre.name = req.body.name;
            res.send(genres);

    });


    router.delete('/:id', function (req, res) {

        let genre = genres.find(c => c.id === parseInt(req.params.id)); //'params' get data form url parameter
        if(!genre) return res.status(404).send('Given id not found');

        const index = genres.indexOf(genre);
        genres.splice(index, 1);
        res.send(genres);

    });



function validateGenre(data){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(data, schema);
}

module.exports = router;