const joi = require('joi');

const userValidation = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required()
})

module.exports = userValidation;