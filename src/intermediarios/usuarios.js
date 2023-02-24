const bcrypt = require('bcrypt')

const { buscarUsuarioPorEmailOuId } = require('../utils/utilsUsuarios')

const verificarNome = (req, res, next) => {
    const { nome } = req.body

    try {
        if (!nome || !nome.trim()) {
            return res.status(400).json({ mensagem: 'O campo nome é obrigatório' })
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const verificarEmail = (req, res, next) => {
    const { email } = req.body;

    try {
        if (!email || !email.trim()) {
            return res.status(400).json({ mensagem: 'O campo email é obrigatório' })
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

}

const verificarSenha = (req, res, next) => {
    const { senha } = req.body;

    try {
        if (!senha || !senha.trim()) {
            return res.status(400).json({ mensagem: 'O campo senha é obrigatório' })
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const verificarEmailExistente = async (req, res, next) => {
    const { url, method, body, usuario } = req;
    const { email } = body;

    try {
        const usuarioEncontrado = await buscarUsuarioPorEmailOuId(email)

        if (url === '/usuario' && usuarioEncontrado.rowCount !== 0 && (method === 'POST' || email !== usuario.email)) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })
        }
        else if (url === '/login' && usuarioEncontrado.rowCount === 0) {
            return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const verificarSenhaValida = async (req, res, next) => {
    const { email, senha } = req.body

    try {
        const usuario = await buscarUsuarioPorEmailOuId(email)
        const senhaCriptografada = usuario.rows[0].senha

        const senhaValida = await bcrypt.compare(senha, senhaCriptografada)

        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
        }

        const { senha: _, ...usuarioAutenticado } = usuario.rows[0]
        req.usuario = usuarioAutenticado

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    verificarNome,
    verificarEmail,
    verificarSenha,
    verificarEmailExistente,
    verificarSenhaValida,
}