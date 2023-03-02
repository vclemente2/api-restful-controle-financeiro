const bcrypt = require('bcrypt')

const { buscarUsuarioPorEmailOuId } = require('../utils/utilsUsuarios')

const verificarNome = (req, res, next) => {
    const { nome } = req.body

    if (!nome || !nome.trim()) {
        return res.status(422).json({ mensagem: 'O campo nome é obrigatório' })
    }

    req.body.nome = req.body.nome.trim()
    next()
}

const verificarEmail = (req, res, next) => {
    const { email } = req.body

    if (!email || !email.trim()) {
        return res.status(422).json({ mensagem: 'O campo email é obrigatório' })
    }

    req.body.email = req.body.email.trim()
    next()
}

const verificarSenha = (req, res, next) => {
    const { senha } = req.body

    if (!senha || !senha.trim()) {
        return res.status(422).json({ mensagem: 'O campo senha é obrigatório' })
    }

    next()
}

const verificarEmailExistente = async (req, res, next) => {
    const { url, method, body, usuario } = req
    const { email } = body

    try {
        const usuarioEncontrado = await buscarUsuarioPorEmailOuId(email)

        if (url === '/usuario' && usuarioEncontrado.rowCount !== 0 && (method === 'POST' || email !== usuario.email)) {
            return res.status(409).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })
        }
        else if (url === '/login' && usuarioEncontrado.rowCount === 0) {
            return res.status(403).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
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
            return res.status(403).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
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