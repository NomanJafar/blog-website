const express = require('express');
const postController = require('../controllers/postController');
const authentication = require('../middlewares/authentication');
const postsValidation = require('../validations/postsValidation');
const usersValidation = require('../validations/usersValidation');
const postRouter = express.Router();

postRouter.get('/', postController.getAll);
postRouter.post('/', authentication, postsValidation.createPostValidation, postController.create);
postRouter.get('/userposts', usersValidation.UserIdValidation, authentication, postController.getByAuthorId);
postRouter.get('/:id', postController.getById);
postRouter.patch('/:id', postsValidation.updatePostValidation, authentication, postController.update);
postRouter.delete('/:id', authentication, postController.delete);

module.exports = postRouter;