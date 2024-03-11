const Joi = require('joi');
const updateUserDto = Joi.object({
    username: Joi.string().trim().label('username').required(),
    password: Joi.string().trim().label('password').required(),
});

module.exports = {
    updateUserDto,
};