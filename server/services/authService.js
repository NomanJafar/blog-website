const jwt = require('jsonwebtoken');
const { JWT_TOKEN_SECRET_KEY } = require('../config/index');

/**
 * Service for handling JSON Web Tokens (JWT) for user authentication.
 *
 * @namespace
 */
const authService = {

    /**
    * Signs a new access token with the provided payload and expiration time.
    *
    * @param {Object} payload - The payload to be included in the token.
    * @param {string | number} expiryTime - The expiration time for the token.
    *   It can be a string representing a time unit (e.g., '1h' for 1 hour) or a number representing seconds.
    * @returns {string} The signed JWT access token.
    * @throws {Error} If signing the token fails.
    */
    signAccessToken: (payload, expiryTime) => {
        return jwt.sign(payload, JWT_TOKEN_SECRET_KEY, {
            expiresIn: expiryTime,
        });
    },

    /**
     * Verifies the validity of the provided access token.
     *
     * @param {string} token - The JWT access token to be verified.
     * @returns {Object} The decoded payload of the verified token.
     * @throws {Error} If verification fails (e.g., token is invalid or has expired).
     */
    verifyAccessToken: (token) => {
        return jwt.verify(token, JWT_TOKEN_SECRET_KEY);
    }
}
module.exports = authService;