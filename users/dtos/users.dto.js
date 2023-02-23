const Joi = require('joi')

const createUserValidator = Joi.object({
    email: Joi.string().email().required(),
    full_name: Joi.string().required(),
    password: Joi.string().required(),
    dob: Joi.string().required(),
})

const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const updateUserValidator = Joi.object({
    email: Joi.string().email(),
    full_name: Joi.string(),
    dob: Joi.string(),
})


module.exports = { createUserValidator, loginUserValidator, updateUserValidator };