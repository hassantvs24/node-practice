const {User, validate} = require('../models/user');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async function (req, res) {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});


router.post('/', async function (req, res) {

    const {error} = validate(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashed
    });

   try {
        const result = await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(result);
    }
    catch (ex) {
        return res.status(400).send(ex.message);
    }
});


module.exports = router;