const Joi = require('joi');
const loginUserDto = Joi.object({
    email: Joi.string().trim().required().label('email'),
    password: Joi.string().trim().required().label('password'),
});

module.exports = {
    loginUserDto,
};