const pool = require('../conexao/conexao')

const listarTransacao = async (req, res) => {
    const { id } = req.usuario
    try {
        const query = `
        SELECT t.*, c.descricao as categoria_nome 
        FROM transacoes t 
        JOIN categorias c ON t.categoria_id = c.id
        WHERE t.usuario_id = $1;
        `
        const { rows } = await pool.query(query, [id])
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    } 
}

const detalharTransacao = (req, res) => {
    const { transacao } = req

    return res.status(200).json(transacao) 
}

const cadastrarTransacao = async (req, res) => {
    const { categoria_nome } = req
    const { descricao, valor, data, categoria_id, tipo } = req.body
    const { id } = req.usuario

    try {
        const query = `
        INSERT INTO transacoes
        (descricao, valor, data, categoria_id, tipo, usuario_id)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING id, tipo, descricao, valor, data, usuario_id, categoria_id
        `
        const { rows } = await pool.query(query, [descricao.trim(), valor, new Date(data), categoria_id, tipo, id])
        const transacaoCadastrada = rows[0]

        return res.status(201).json({ ...transacaoCadastrada, categoria_nome })
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const atualizarTransacao = (req, res) => {

}

const excluirTransacao = (req, res) => {

}

const obterExtrato = (req, res) => {
    //utilizar o Reduce
}

module.exports = {
    listarTransacao,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao,
    excluirTransacao,
    obterExtrato,
}