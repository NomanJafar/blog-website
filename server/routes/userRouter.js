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
userRouter.get('/:id', authentication, usersValidation.UserIdValidation, userController.getById);
userRouter.patch('/', authentication, usersValidation.updateUserValidation, userController.update);
userRouter.delete('/:id', [authentication, authorization(Roles.ADMIN)], usersValidation.UserIdValidation, userController.delete);

module.exports = userRouter;