/**
 * Middleware for role-based authorization.
 *
 * @param {string} role - The role required to access the route.
 * @returns {function} Express middleware function.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 *
 * @throws {ApiError} 403 Forbidden - If the user does not have the required role.
 */
const authorization = (role) => {
    /**
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {void}
     */
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.apiError(403, false, 'Forbidden');
        }
        next();
    };
};
module.exports = authorization;