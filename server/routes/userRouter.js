const express = require('express');
const userController = require('../controllers/userController');
const usersValidation = require('../validations/usersValidation');
const authentication = require('../middlewares/authentication');
const { Roles } = require('@prisma/client');
const authorization = require('../middlewares/authorization');
const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User operations
 *
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               token: "your_access_token"
 *       400:
 *         description: Validation error or invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error"
 *               statusCode: 400
 *               auth: false
 *               data: ["Error 1", "Error 2"]
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid credentials"
 *               statusCode: 401
 *               auth: false
 */
userRouter.post('/login', usersValidation.loginUserValidation, userController.login);

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User operations
 *
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User registered successfully"
 *               statusCode: 200
 *               auth: false
 *       400:
 *         description: Validation error or user already exists
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error"
 *               statusCode: 400
 *               auth: false
 *               data: ["Error 1", "Error 2"]
 *       409:
 *         description: User with the provided email already exists
 *         content:
 *           application/json:
 *             example:
 *               message: "User with the provided email already exists"
 *               statusCode: 409
 *               auth: false
 */
userRouter.post('/register', usersValidation.createUserValidation, userController.register);

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User operations
 *
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             example:
 *               message: "Success"
 *               data: [{ user1 }, { user2 }, ...]
 *               statusCode: 200
 *               auth: true
 *       401:
 *         description: Unauthorized, missing or invalid token
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *               statusCode: 401
 *               auth: false
 *       403:
 *         description: Forbidden, user lacks necessary permissions
 *         content:
 *           application/json:
 *             example:
 *               message: "Forbidden"
 *               statusCode: 403
 *               auth: true
 */
userRouter.get('/', [authentication, authorization(Roles.ADMIN)], userController.getAll);

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User operations
 *
 * /user:
 *   patch:
 *     summary: Update user details
 *     description: Update user details based on the provided username and user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: New username for the user.
 *               password:
 *                 type: string
 *                 description: New password for the user.
 *           example:
 *             username: new_username
 *             password: new_password
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with updated user details.
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 *               data:
 *                 id: 1
 *                 username: new_username
 *                 email: example@example.com
 *                 role: USER
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
userRouter.patch('/', authentication, usersValidation.updateUserValidation, userController.update);

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User operations
 *
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user based on the provided user ID. Requires authentication and administrator authorization.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID to delete.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response indicating the user has been deleted.
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
userRouter.delete('/:id', [authentication, authorization(Roles.ADMIN)], usersValidation.UserIdValidation, userController.delete);


module.exports = userRouter;