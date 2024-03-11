const Joi = require('joi');
const userIdDto = Joi.object({
    id: Joi.number().label('id').required(),
});

module.exports = {
    userIdDto,
};