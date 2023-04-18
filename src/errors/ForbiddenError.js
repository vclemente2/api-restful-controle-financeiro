const ApiError = require("./ApiError");

class ForbiddenError extends ApiError {
    constructor(message) {
        super(message, 403);
    }
}

module.exports = ForbiddenError;