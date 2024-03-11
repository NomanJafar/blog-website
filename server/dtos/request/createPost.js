const Joi = require('joi');
const createPostDto = Joi.object({
    title: Joi.string().trim().required().label('title'),
    content: Joi.string().trim().required().label('content'),
});

module.exports = {
    createPostDto,
};

