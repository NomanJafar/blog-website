const dbContext = require("../database/dbContext");
const bcrypt = require('bcrypt');
const CustomError = require("../utils/customError");
const authService = require("./authService");

/**
 * Service for user-related operations.
 *
 * @namespace
 */
const userService = {

    /**
     * Registers a new user with the provided username, email, and password.
     *
     * @param {string} username - The username of the new user.
     * @param {string} email - The email of the new user.
     * @param {string} password - The password of the new user.
     * @returns {Object} The created user object.
     * @throws {CustomError} If a user with the provided email already exists.
     * @throws {Error} If an unexpected error occurs during registration.
     */
    register: async (username, email, password) => {
        try {
            const user = await dbContext.users.findFirst({ where: { email } });
            if (user) {
                throw new CustomError(`user with email ${email} already exists`, 404, false);
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const createdUser = await dbContext.users.create({
                data: { username, email, password: hashedPassword }, select: {
                    id: true,
                    username: true,
                    role: true
                }
            });
            const token = authService.signAccessToken({
                email: createdUser.email,
                role: createdUser.role,
                username: createdUser.username,
                id: createdUser.id
            },
                '10h');
            return {
                token,
                user: {
                    username: createdUser.username,
                    email: createdUser.email,
                    role: createdUser.role
                }
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Logs in a user with the provided email and password.
     *
     * @param {string} email - The email of the user attempting to log in.
     * @param {string} password - The password of the user attempting to log in.
     * @returns {Object} An object containing the JWT access token.
     * @throws {CustomError} If a user with the provided email does not exist.
     * @throws {Error} If an unexpected error occurs during login.
     */
    login: async (email, password) => {
        try {
            const user = await dbContext.users.findFirst({ where: { email } });
            if (!user) {
                throw new CustomError(`user with email ${email} does not exists`, 404, false);
            }
            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                throw new CustomError('invalid password', 401, false);
            }
            const token = authService.signAccessToken({ email: user.email, role: user.role, username: user.username, id: user.id }, '10h');
            return {
                token, user: {
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieves a user by their ID.
     *
     * @param {number} id - The ID of the user to retrieve.
     * @returns {Object} The user object.
     * @throws {CustomError} If a user with the provided ID does not exist.
     * @throws {Error} If an unexpected error occurs during retrieval.
     */
    getUserById: async (id) => {
        try {
            const user = await dbContext.users.findFirst({
                where: { id },
                select: {
                    username: true,
                    email: true,
                    created: true,
                    updated: true,
                    role: true

                }
            });
            if (!user) {
                throw new CustomError(`user with id ${id} does not exists`, 404, false);
            }
            return user;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Deletes a user by their ID.
     *
     * @param {number} id - The ID of the user to delete.
     * @returns {Object} The deleted user object.
     * @throws {CustomError} If a user with the provided ID does not exist.
     * @throws {Error} If an unexpected error occurs during deletion.
     */
    deleteUser: async (id) => {
        try {
            const user = await dbContext.users.delete({ where: { id } });
            if (!user) {
                throw new CustomError(`user with id ${id} does not exists`, 404, false);
            }
            return user;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieves all users.
     *
     * @returns {Array} An array of user objects.
     * @throws {CustomError} If no users are found.
     * @throws {Error} If an unexpected error occurs during retrieval.
     */
    getAllUsers: async () => {
        try {
            const users = await dbContext.users.findMany();
            if (!users) {
                throw new CustomError(`no users found`, 404, false);
            }
            return users;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Updates a user by their ID with the provided username, password, and role.
     *
     * @param {number} id - The ID of the user to update.
     * @param {string} username - The updated username.
     * @param {string} password - The updated password.
     * @param {string} role - The updated role.
     * @returns {Object} The updated user object.
     * @throws {CustomError} If no users are found or if a user with the provided ID does not exist.
     * @throws {Error} If an unexpected error occurs during update.
     */
    updateUser: async (id, username, password) => {
        try {
            const user = await dbContext.users.update({
                where: {
                    id
                },
                data: {
                    username,
                    password
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true,
                    created: true,
                    updated: true,
                },
            });
            if (!user) {
                throw new CustomError(`no users found`, 404, false);
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
}


module.exports = userService;