const express = require('express');
const postController = require('../controllers/postController');
const authentication = require('../middlewares/authentication');
const postsValidation = require('../validations/postsValidation');
const usersValidation = require('../validations/usersValidation');
const postRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Posts operations
 * 
 * /post/:
 *   get:
 *     summary: Get all posts
 *     description: Retrieves a list of all posts.
 *     responses:
 *       '200':
 *         description: Successful response with a list of posts.
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 *               data:
 *                 - id: 1
 *                   title: Post 1
 *                   content: Content of post 1
 *                   authorId: 1
 *                   created: '2022-01-01T00:00:00.000Z'
 *                   updated: '2022-01-02T00:00:00.000Z'
 *                 - id: 2
 *                   title: Post 2
 *                   content: Content of post 2
 *                   authorId: 2
 *                   created: '2022-01-02T00:00:00.000Z'
 *                   updated: '2022-01-03T00:00:00.000Z'
 *               statusCode: 200
 *               auth: true
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 401
 *               auth: false
 */
postRouter.get('/', postController.getAll);


/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Posts operations
 * 
 * /post:
 *   post:
 *     summary: create post 
 *     description: create post.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title for the post.
 *               content:
 *                 type: string
 *                 description: New content for the post.
 *           example:
 *             title: title
 *             content: content
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with created post details.
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 *               data:
 *                 id: 1
 *                 title: title
 *                 content: content
 *                 created: 2022-01-01T00:00:00.000Z
 *                 updated: 2022-01-02T00:00:00.000Z
 *               statusCode: 200
 *               auth: true
 *       400:
 *         description: Bad request. Invalid parameters.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 400
 *               auth: true
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 401
 *               auth: false
 *       403:
 *         description: Forbidden. The authenticated user does not have permission.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 403
 *               auth: true
 */
postRouter.post('/', authentication, postsValidation.createPostValidation, postController.create);


/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Posts operations
 * 
 * /post/userposts:
 *   get:
 *     summary: Get posts by user ID
 *     description: Retrieves posts belonging to a specific user based on the provided user ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID to get posts.
 *     responses:
 *       '200':
 *         description: Successful response with a list of posts by the user.
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 *               data:
 *                 - id: 1
 *                   title: User's Post 1
 *                   content: Content of user's post 1
 *                   authorId: 1
 *                   created: '2022-01-01T00:00:00.000Z'
 *                   updated: '2022-01-02T00:00:00.000Z'
 *                 - id: 2
 *                   title: User's Post 2
 *                   content: Content of user's post 2
 *                   authorId: 1
 *                   created: '2022-01-02T00:00:00.000Z'
 *                   updated: '2022-01-03T00:00:00.000Z'
 *               statusCode: 200
 *               auth: true
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 401
 *               auth: false
 *       '400':
 *         description: Bad request. Invalid user ID.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 400
 *               auth: true
 */
postRouter.get('/userposts', usersValidation.UserIdValidation, authentication, postController.getByAuthorId);



/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Posts operations
 * 
 * /post/{id}:
 *   get:
 *     summary: get posts of a a user by ID
 *     description: get posts of a a user by ID. Requires authentication.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response providing a list of posts.
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 *               statusCode: 200
 *               auth: true
 *       400:
 *         description: Bad request. Invalid user ID.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 400
 *               auth: true
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 401
 *               auth: false
 *       403:
 *         description: Forbidden. The authenticated user does not have permission.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 403
 *               auth: true
 *       404:
 *         description: Not Found. User with the specified ID is not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 404
 *               auth: true
 */
postRouter.get('/:id', postController.getById);

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Posts operations
 *
 * /post/{id}:
 *   patch:
 *     summary: Update a post by ID
 *     description: Update a post based on the provided data and post ID.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Post ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title for the post
 *               content:
 *                 type: string
 *                 description: New content for the post
 *           example:
 *             title: new_title
 *             content: new_content
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with updated post details.
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 *               data: { updatedPostDetails }
 *               statusCode: 200
 *               auth: true
 *       400:
 *         description: Bad request. Invalid parameters or data.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 400
 *               auth: true
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 401
 *               auth: false
 *       403:
 *         description: Forbidden. The authenticated user does not have permission.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 403
 *               auth: true
 *       404:
 *         description: Not Found. Post with the specified ID is not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 404
 *               auth: true
 */
postRouter.patch('/:id', postsValidation.updatePostValidation, authentication, postController.update);

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Posts operations
 *
 * /post/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     description: Delete a post based on the provided post ID. Requires authentication.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Post ID to delete.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response indicating the post has been deleted.
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 *               statusCode: 200
 *               auth: true
 *       400:
 *         description: Bad request. Invalid post ID.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 400
 *               auth: true
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 401
 *               auth: false
 *       403:
 *         description: Forbidden. The authenticated user does not have permission.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 403
 *               auth: true
 *       404:
 *         description: Not Found. Post with the specified ID is not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               statusCode: 404
 *               auth: true
 */
postRouter.delete('/:id', authentication, postController.delete);

module.exports = postRouter;