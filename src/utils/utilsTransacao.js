const pool = require('../conexao/conexao')

const buscarTransacoesPeloIdDoUsuario = async (idUsuario, joinTabelaCategoria = false, idTransacao = null) => {
    const params = [idUsuario]

    let query = joinTabelaCategoria
        ? `SELECT t.*, c.descricao AS categoria_nome 
            FROM transacoes t 
            JOIN categorias c ON t.categoria_id = c.id
            WHERE t.usuario_id = $1
            `
        :
        `
            SELECT * FROM transacoes
            WHERE usuario_id = $1
            `

    if (idTransacao) {
        query += ' AND t.id = $2'
        params.push(idTransacao)
    }

    return { rows, rowCount } = await pool.query(query, params)
}

module.exports = {
    buscarTransacoesPeloIdDoUsuario
}