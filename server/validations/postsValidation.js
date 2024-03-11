const { createPostDto } = require("../dtos/request/createPost");
const { updatePostDto } = require("../dtos/request/updatePostDto");
const postsValidation = {
    createPostValidation: (req, res, next) => {
        const { error } = createPostDto.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(400).json({ errors });
        }
        next();
    },
    updatePostValidation: (req, res, next) => {
        const { error } = updatePostDto.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(400).json({ errors });
        }
        next();
    }
}

module.exports = postsValidation;