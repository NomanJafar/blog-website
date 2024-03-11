/**
 * Middleware to standardize the response object in Express.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 *
 * @summary Adds custom methods (`apiSuccess` and `apiError`) to the response object for consistent API responses.
 */
const standardizeResponse = (req, res, next) => {
    /**
     * Responds with a success message and data.
     *
     * @param {any} data - The data to be included in the response.
     * @param {number} statusCode - The HTTP status code (default is 200).
     * @param {boolean} auth - Indicates whether authentication is required (default is true).
     * @param {string} message - The success message (default is 'Success').
     * @returns {void}
     */
    res.apiSuccess = (data, statusCode = 200, auth = true, message = 'Success') => {
        res.status(statusCode).json({
            message,
            data,
            statusCode,
            auth: auth,
        });
    };

    /**
     * Responds with an error message.
     *
     * @param {number} statusCode - The HTTP status code (default is 500).
     * @param {boolean} auth - Indicates whether authentication is required (default is true).
     * @param {string} message - The error message (default is 'Error').
     * @returns {void}
     */
    res.apiError = (statusCode = 500, auth = true, message = 'Error') => {
        res.status(statusCode).json({
            message,
            statusCode,
            auth: auth,
        });
    };
    next();
};

module.exports = standardizeResponse;