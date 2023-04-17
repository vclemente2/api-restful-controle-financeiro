const pool = require('../conexao/conexao')
const { buscarTransacoesPeloIdDoUsuario } = require('../utils/utilsTransacao')

const listarTransacao = async (req, res) => {
    const { id } = req.usuario
    const { filtro } = req.query

    try {
        const listaTransacao = await buscarTransacoesPeloIdDoUsuario(id, true)

        if (filtro) {
            listaTransacao.rows = listaTransacao.rows.filter((transacao) => {
                const { categoria_nome: categoria } = transacao;

                if (filtro.includes(categoria) || filtro.includes(categoria.toLowerCase())) {
                    return categoria
                }
            })
        }

        return res.status(200).json(listaTransacao.rows)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
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

const atualizarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body
    const { id } = req.params

    try {
        const query = `
        UPDATE transacoes SET
        descricao = $1,
        valor = $2,
        data = $3,
        categoria_id = $4,
        tipo = $5
        WHERE id = $6
        `
        await pool.query(query, [descricao.trim(), valor, new Date(data), categoria_id, tipo, id])

        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const excluirTransacao = async (req, res) => {
    const { id } = req.params

    try {
        const query = `
        DELETE FROM transacoes WHERE id = $1;
        `
        await pool.query(query, [id])

        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const obterExtrato = async (req, res) => {
    const { id } = req.usuario

    try {
        const { rows } = await buscarTransacoesPeloIdDoUsuario(id)
        
        const extrato = rows.reduce((extrato, transacao) => {
            const { tipo, valor } = transacao

            extrato[tipo] += valor

            return extrato
        }, {
            entrada: 0,
            saida: 0
        })
        
        return res.status(200).json(extrato)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    listarTransacao,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao,
    excluirTransacao,
    obterExtrato
}