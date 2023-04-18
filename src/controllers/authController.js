require('dotenv').config();
const jwt = require('jsonwebtoken');

const userLogin = (req, res) => {
    const user = req.user;

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS, { expiresIn: '8h' });

    return res.status(201).json({ user, token });
}

module.exports = userLogin;
