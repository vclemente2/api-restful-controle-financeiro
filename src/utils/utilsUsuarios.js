const bcrypt = require('bcrypt')
const pool = require('../conexao/conexao')

const buscarUsuarioPorEmailOuId = async (dadoDeBusca) => {
    //let query = `SELECT * FROM usuarios WHERE id = $1 OR email = $1`
    //Verificar

    let query = `SELECT * FROM usuarios WHERE id = $1`
    if (!Number(dadoDeBusca)) {
        query = `SELECT * FROM usuarios WHERE email = $1`
    }

    const usuarioEncontrado = await pool.query(query, [dadoDeBusca])

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

