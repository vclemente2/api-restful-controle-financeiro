const pool = require('../conexao/conexao')

const buscarTransacoesPeloIdDoUsuario = async (idUsuario, joinTabelaCategoria = false, idTransacao = 0) => {
    let query = `
    SELECT * FROM transacoes
    WHERE usuario_id = $1
    `
    const params = [idUsuario]

    if (joinTabelaCategoria) {
        query = `
        SELECT t.*, c.descricao AS categoria_nome 
        FROM transacoes t 
        JOIN categorias c ON t.categoria_id = c.id
        WHERE t.usuario_id = $1
        `
        if (idTransacao) {
            query += ' AND t.id = $2'
            params.push(idTransacao)
        }
    }

    return { rows, rowCount } = await pool.query(query, params)
}

module.exports = {
    buscarTransacoesPeloIdDoUsuario
}