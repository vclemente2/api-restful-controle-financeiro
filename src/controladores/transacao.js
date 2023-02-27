const pool = require('../conexao/conexao')

const listarTransacao = (req, res) => {

}

const detalharTransacao = (req, res) => {

}

const cadastrarTransacao = async (req, res) => {
    const { categoria_nome } = req
    const { descricao, valor, data, categoria_id, tipo } = req.body
    const { id } = req.usuario

    try {
        const query = `
        insert into transacoes
        (descricao, valor, data, categoria_id, tipo, usuario_id)
        values
        ($1, $2, $3, $4, $5, $6)
        returning id, tipo, descricao, valor, data, usuario_id, categoria_id
        `
        const { rows } = await pool.query(query, [descricao.trim(), valor, new Date(data), categoria_id, tipo.trim(), id])
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

}

module.exports = {
    listarTransacao,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao,
    excluirTransacao,
    obterExtrato,
}