const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaToken = require('../senha-token')

const pool = require('../conexao/conexao')

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const senhaCriptografada = await bcrypt.hash(senha.trim(), 10)

        const query = `
        insert into usuarios (nome, email, senha)
        values
        ($1, $2, $3)
        returning id, nome, email
        `

        const usuarioCadastrado = await pool.query(query, [nome.trim(), email.trim(), senhaCriptografada])

        return res.status(201).json(usuarioCadastrado.rows[0])
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const logarUsuario = (req, res) => {
    const usuario = req.usuario

    try {
        const token = jwt.sign({ id: usuario.id }, senhaToken, { expiresIn: (1000 * 60 * 5) })

        return res.status(201).json({ usuario, token });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const detalharUsuario = (req, res) => {

}

const atualizarUsuario = (req, res) => {

}

module.exports = {
    cadastrarUsuario,
    logarUsuario,
    detalharUsuario,
    atualizarUsuario
}