const bcrypt = require('bcrypt');

const UserRepository = require('../repositories/UserRepository');

class UserController {
    async create(req, res) {
        const { name, email, password } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await UserRepository.create({ name, email, password: encryptedPassword });

        const { password: _, ...newUser } = user[0];

        return res.status(201).json(newUser);
    }

    async findOne(req, res) {
        const { user } = req;

        return res.status(200).json(user);
    }

    async update(req, res) {
        const { name, email, password } = req.body;
        const { id } = req.user

        const encryptedPassword = await bcrypt.hash(password, 10);

        await UserRepository.update(id, { name, email, password: encryptedPassword });

        return res.sendStatus(204);
    }
}

module.exports = new UserController();
