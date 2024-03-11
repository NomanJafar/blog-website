class CustomError extends Error {
    constructor(message, status, auth) {
        super(message);
        this.name = this.constructor.name;
        this.status = status || 500;
        this.auth = auth ?? false;;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = CustomError;


