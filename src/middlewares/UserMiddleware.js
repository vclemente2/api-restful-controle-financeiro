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

        next();
    }

    async uniqueEmail(req, res, next) {
        const { email } = req.body;

        const emailExists = await UserRepository.findByEmail(email);

        if (emailExists) {
            throw new ConflictError('Email alredy registered for another user.');
        }

        next();
    }

    // async verificarSenhaValida(req, res, next) {
    //     const { email, senha } = req.body

    //     try {
    //         const usuario = await buscarUsuarioPorEmailOuId(email)
    //         const senhaCriptografada = usuario.rows[0].senha

    //         const senhaValida = await bcrypt.compare(senha, senhaCriptografada)

    //         if (!senhaValida) {
    //             return res.status(403).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
    //         }

    //         const { senha: _, ...usuarioAutenticado } = usuario.rows[0]
    //         req.usuario = usuarioAutenticado

    //         next()
    //     } catch (error) {
    //         return res.status(500).json({ mensagem: error.message })
    //     }
    // }
}

module.exports = new UserMiddleware();