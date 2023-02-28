const pool = require('../conexao/conexao')

const verificarCamposObrigatorios = (req, res, next) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body

    try {
        if (
            !descricao ||
            !valor ||
            !data ||
            !categoria_id ||
            !tipo ||
            !descricao.trim() ||
            !tipo.trim()
        ) {
            return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' })
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const verificarFormatoData = (req, res, next) => {
    const { data } = req.body

    try {
        const dataValida = Date.parse(data);

        if (!dataValida) {
            return res.status(400).json({ mensagem: "Formato de data inválido. Favor inserir uma data no padrão americano: AAAA-MM-DD." })
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const verificarCategoriaExistente = async (req, res, next) => {
    const { categoria_id } = req.body

    try {
        const query = `select descricao from categorias where id = $1`

        const { rows, rowCount } = await pool.query(query, [categoria_id])

        if (rowCount === 0) {
            return res.status(400).json({ mensagem: "Não existe categoria cadastrada para o ID informado." })
        }

        req.categoria_nome = rows[0].descricao

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

}

const validarTipoTransacao = (req, res, next) => {
    const { tipo } = req.body

    try {
        if (tipo !== 'entrada' && tipo !== 'saida') {
            return res.status(400).json({ mensagem: `Tipo inválido. O tipo deve ser 'entrada' ou 'saida'.` })
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const verificarTransacaoExistente = async (req, res, next) => {
    const { id } = req.usuario
    const { id: id_transacao } = req.params

    try {
        const query = `
        SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao AS categoria_nome
        FROM transacoes t 
        JOIN categorias c ON t.categoria_id = c.id
        WHERE t.id = $1;
        `
        const { rows, rowCount } = await pool.query(query, [id_transacao])

        if (rowCount === 0) {
            return res.status(404).json({mensagem: 'Não existe transação para o id informado'})
        }

        const { usuario_id } = rows[0]
        if (id !== usuario_id) {
            return res.status(401).json({mensagem: 'Acesso negado!! A transação não pertende ao usuario'})
        }

        req.transacao = rows[0]
        
        next()
    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
}

module.exports = {
    verificarCamposObrigatorios,
    verificarFormatoData,
    verificarCategoriaExistente,
    validarTipoTransacao,
    verificarTransacaoExistente
}