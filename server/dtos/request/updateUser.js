const Joi = require('joi');
const updateUserDto = Joi.object({
    username: Joi.string().trim().label('username'),
    password: Joi.string().trim().label('password'),
});

module.exports = {
    updateUserDto,
};