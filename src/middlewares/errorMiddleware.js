const errorMiddleware = (error, req, res, next) => {

    const status = error.statusCode || 500;
    const message = error.statusCode ? error.message : 'Internal server error.'

    console.log(error);
    res.status(status).json({ message });
}

module.exports = errorMiddleware;
