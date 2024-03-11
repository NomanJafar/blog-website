const Joi = require('joi');
const updatePostDto = Joi.object({
    title: Joi.string().trim().label('title'),
    content: Joi.string().trim().label('content'),
});

module.exports = {
    updatePostDto,
};

