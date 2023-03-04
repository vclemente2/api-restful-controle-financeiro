const bcrypt = require('bcrypt')
const pool = require('../conexao/conexao')

const buscarUsuarioPorEmailOuId = async (dadoDeBusca) => {
    let query = `SELECT * FROM usuarios WHERE id = $1 OR email = $2`

    const usuarioEncontrado = await pool.query(query, [typeof dadoDeBusca === 'string' ? 0 : dadoDeBusca, dadoDeBusca.toString()])

    return usuarioEncontrado
}

const criptografarSenha = async (senha) => {
    const senhaCriptografada = await bcrypt.hash(senha, 10)
    return senhaCriptografada;
}

module.exports = {
    buscarUsuarioPorEmailOuId,
    criptografarSenha
}

