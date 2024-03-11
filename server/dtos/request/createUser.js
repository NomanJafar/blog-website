const Joi = require('joi');
const createUserDto = Joi.object({
    username: Joi.string().trim().required().label('username'),
    password: Joi.string().trim().required().label('password'),
    email: Joi.string().trim().required().label('email'),
});

module.exports = {
    createUserDto,
};