const jwt = require('jsonwebtoken')

const senhaToken = require('../senha-token')
const pool = require('../conexao/conexao')
const { criptografarSenha } = require('../utils/utilsUsuarios')


const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const senhaCriptografada = await criptografarSenha(senha);

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
        const token = jwt.sign({ id: usuario.id }, senhaToken, { expiresIn: '8h' })

        return res.status(201).json({ usuario, token });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const detalharUsuario = (req, res) => {
    const { usuario } = req

	try {	
		return res.json(usuario)
	} catch (error) {
		return res.status(500).json({mensagem: error.message})
	}
}

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const senhaCriptografada = await criptografarSenha(senha);
        const { id } = req.usuario

        const query = `
        update usuarios
        set
        nome = $1,
        email = $2,
        senha = $3
        where id = $4
        `
        await pool.query(query, [nome.trim(), email.trim(), senhaCriptografada, id])

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