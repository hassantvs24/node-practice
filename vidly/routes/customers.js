const {Customer, validate} = require('../models/customer');
const express = require('express');
const router = express.Router();


router.get('/', async function (req, res) {
    const customer = await Customer.find();
    res.send(customer);
});

router.get('/:id', async function (req, res) {

    const customer = await Customer.findById(req.params.id);
    res.send(customer);

});


router.post('/', async function (req, res) {

    const {error} = validate(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: true
    });

   try {
    const result = await customer.save();
        res.send(result);
    }
    catch (ex) {
        return res.status(400).send(ex.message);
    }

});


router.put('/:id', async function (req, res) {

    const customer = await Customer.findById(req.params.id); //'params' get data form url parameter
    if(!customer) return res.status(404).send('Given id not found');

    const {error} = validate(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    customer.name = req.body.name;
    customer.phone = req.body.phone;

    try {
        const result = await customer.save();
            res.send(result);
        }
    catch (ex) {
            return res.status(400).send(ex.message);
        }
});


router.delete('/:id', async function (req, res) {
    const customer = await Customer.findOneAndRemove(req.params.id);
    res.send(customer);
});


module.exports = router;