const authService = require("../services/authService");
const extractToken = require("../utils/extractToken");

/**
 * Middleware for authenticating requests using JSON Web Tokens (JWT).
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 *
 * @throws {ApiError} 401 Unauthorized - If the request does not include a valid JWT.
 * @throws {ApiError} 401 Unauthorized - If the provided JWT is invalid or has expired.
 */
const authentication = (req, res, next) => {
    const token = extractToken(req.header('Authorization'));
    if (!token) {
        return res.apiError(401, false, 'Unauthorized');
    }
    try {
        req.user = authService.verifyAccessToken(token);
        next();
    } catch (error) {
        return res.apiError(401, false, 'Unauthorized');
    }
}

module.exports = authentication;

