const pool = require('../conexao/conexao')

const buscarUsuarioPeloEmail = async (email) => {
    const query = `SELECT * FROM usuarios WHERE email = $1`

    const usuarioEncontrado = await pool.query(query, [email])

    return usuarioEncontrado
}
module.exports = {
    buscarUsuarioPeloEmail
}

