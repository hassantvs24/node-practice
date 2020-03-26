const {Genre, validate} = require('../models/genre');
//const auth = require('../middleware/auth');
//const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();


    router.get('/', async function (req, res, next) {
      //  throw new Error('Could not get the genres.');
        const genre = await Genre.find();
        res.send(genre);
        
    });

    router.get('/:id', async function (req, res) {
        const genre = await Genre.findById(req.params.id);
        res.send(genre);

    });


    router.post('/', async function (req, res) {

            const {error} = validate(req.body)
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

            const {error} = validate(req.body)
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


    router.delete('/:id', /*[auth, admin],*/ async function (req, res) {
        const genre = await Genre.findOneAndRemove(req.params.id);
        res.send(genre);
    });



module.exports = router;