const errorMiddleware = (error, req, res, next) => {

    const status = error.statusCode || 500;
    const message = error.statusCode ? error.message : 'Internal server error.'

    console.log(error);

    if (
        error.name === 'JsonWebTokenError'
        ||
        error.name === 'TokenExpiredError'
    ) {
        return res.status(401).json({ message: 'To access this feature a valid authentication token must be submitted.' })
    }

    return res.status(status).json({ message });
}

module.exports = errorMiddleware;
