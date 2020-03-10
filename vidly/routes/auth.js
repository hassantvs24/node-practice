const Joi = require('joi');
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();



router.post('/', async function (req, res) {

    const {error} = validate(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Password');

    const token = user.generateAuthToken();

    res.send(token);
    
});


function validate(data){
    const schema = {
        email: Joi.string().min(5).required(),
        password: Joi.string().min(5).required()
    };

    return Joi.validate(data, schema);
}

module.exports = router;