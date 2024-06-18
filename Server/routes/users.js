const router = require('express').Router();
const bcrypt = require('bcrypt');
const { user, validate } = require('../models/user');

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const existingUser = await user.findOne({ email: req.body.email });
        if (existingUser) return res.status(409).send({ message: "User with this email already exists!" });

        const salt = await bcrypt.genSalt(Number(10));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await new user({ ...req.body, password: hashedPassword }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (err) {
        console.log(err) ;
        res.status(500).send(err);
    }
});

module.exports = router; 
