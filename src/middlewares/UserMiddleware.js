const bcrypt = require('bcrypt');

const UserRepository = require('../repositories/UserRepository');
const ForbiddenError = require('../errors/ForbiddenError');
const ConflictError = require('../errors/ConflictError');

class UserMiddleware {
    async verifyUserCredentials(req, res, next) {
        const { email, password } = req.body;

        const user = await UserRepository.findByEmail(email);

        if (!user) {
            throw new ForbiddenError('Incorrect email or password.');
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw new ForbiddenError('Incorrect email or password.');
        }

        const { password: _, ...userData } = user;

        req.user = userData;

        next();
    }

    async uniqueEmail(req, res, next) {
        const { email } = req.body;
        const { user } = req;

        const emailExists = await UserRepository.findByEmail(email);

        if (!emailExists || (user && user.email === email)) {
            return next();
        }

        throw new ConflictError('Email alredy registered for another user.');
    }
}

module.exports = new UserMiddleware();