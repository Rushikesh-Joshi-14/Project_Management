const router = require('express').Router();
const bcrypt = require('bcrypt'); 
const { user } = require('../models/user'); 
const joi = require('joi');


router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const existingUser = await user.findOne({ email: req.body.email });
        if (!existingUser) return res.status(401).send({ message: "Invalid username or password" });

        const validPassword = await bcrypt.compare(req.body.password, existingUser.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid username or password" });

        const token = existingUser.generateAuthToken(); 
        res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});


const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password")
    });
    return schema.validate(data);
};

module.exports = router; 
