const pool = require('../conexao/conexao')

const buscarUsuarioPorEmailOuId = async (dadoDeBusca) => {
    let query = `SELECT * FROM usuarios WHERE id = $1`

    if (!Number(dadoDeBusca)) {
        query = `SELECT * FROM usuarios WHERE email = $1`
        dadoDeBusca = dadoDeBusca.trim()
    }
    
    const usuarioEncontrado = await pool.query(query, [dadoDeBusca])

    return usuarioEncontrado
}

module.exports = {
    buscarUsuarioPorEmailOuId
}

