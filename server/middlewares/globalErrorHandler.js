/**
 * Global error handler middleware for Express.
 * 
 * @param {Error} error - The error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 *
 * @summary Handles errors globally, logs the error, and sends an appropriate JSON response to the client.
 */
const globalErrorHandler = (error, req, res, next) => {
    console.log(error);

    let status = error.status || 500;
    let message = error.message || 'Internal Server Error';
    let auth = error.auth ?? false;

    if (error.code) {
        status = 404
    }
    if (error.meta) {
        message = error.meta?.cause;
    }

    res.status(status).json({
        success: false,
        message,
        status,
        auth: auth,
    });
};

module.exports = globalErrorHandler;