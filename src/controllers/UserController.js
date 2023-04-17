const jwt = require('jsonwebtoken')

const senhaToken = require('../senha-token')

const { criptografarSenha } = require('../utils/utilsUsuarios')

class UserController {

    async create(req, res) {

    }

    async findOne(req, res) {

    }

    async update(req, res) {

    }

    async destroy(req, res) {

    }

}
const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const senhaCriptografada = await criptografarSenha(senha);

        const query = `
        INSERT INTO usuarios (nome, email, senha)
        VALUES
        ($1, $2, $3)
        RETURNING id, nome, email
        `

        const usuarioCadastrado = await pool.query(query, [nome, email, senhaCriptografada])

        return res.status(201).json(usuarioCadastrado.rows[0])
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}



const detalharUsuario = (req, res) => {
    const { usuario } = req

    return res.status(200).json(usuario)
}

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const senhaCriptografada = await criptografarSenha(senha)
        const { id } = req.usuario

        const query = `
        UPDATE usuarios
        SET
        nome = $1,
        email = $2,
        senha = $3
        WHERE id = $4
        `

        await pool.query(query, [nome, email, senhaCriptografada, id])

        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    cadastrarUsuario,
    logarUsuario,
    detalharUsuario,
    atualizarUsuario
}