require('dotenv').config();
const jwt = require('jsonwebtoken');

const ForbiddenError = require('../errors/ForbiddenError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const UserRepository = require('../repositories/UserRepository');

const tokenValidation = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        throw new ForbiddenError('To access this feature a valid authentication token must be submitted.');
    }

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, process.env.JWT_PASS);

    const authenticadedUser = await UserRepository.findOne(id);

    if (!authenticadedUser) {
        throw new UnauthorizedError('User does not have permission to access this resource.');
    }

    const { password: _, ...user } = authenticadedUser;

    req.user = user

    next()
}

module.exports = tokenValidation;
