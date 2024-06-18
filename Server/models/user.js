const mongoose = require('mongoose');
const jwt = require('jsonwebtoken') ;
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const Joi = require('joi');

const userschema = new mongoose.Schema(
    {
        firstName: {type : String , required:true} ,
        lastName: {type : String , required:true},
        email: {type : String , required:true},
        password: {type : String , required:true}
    });

    userschema.methods.generateAuthToken = () =>{
        const token = jwt.sign({_id : this._id} , "abcde" , {expiresIn:"15d"})
        return token
    };

    const user = mongoose.model("user" , userschema);

    const validate = (data) =>{
        const Schema = Joi.object(
            {
                firstName:joi.string().required().label("FirstName") ,
            lastName:joi.string().required().label("LastName"),
            email:joi.string().required().label("email"),
            password:passwordComplexity().required().label("password"),
        });

        return Schema.validate(data) 
    };

    module.exports = {user, validate} ;