const pool = require('../conexao/conexao')
const BaseRepository = require('../repositories/BaseRepository');
const CategoryRepository = require('../repositories/CategoryRepository');
const UserRepository = require('../repositories/UserRepository');
const { buscarTransacoesPeloIdDoUsuario } = require('../utils/utilsTransacao')

const verificarCamposObrigatorios = (req, res, next) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body

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
}

const verificarFormatoData = (req, res, next) => {
    const { data } = req.body

    const dataValida = Date.parse(data)

    if (!dataValida) {
        return res.status(400).json({ mensagem: 'Formato de data inválido. Favor inserir uma data no padrão americano: AAAA-MM-DD.' })
    }

    next()
}

const verificarCategoriaExistente = async (req, res, next) => {
    const { categoria_id } = req.body

    try {
        const query = `SELECT descricao FROM categorias WHERE id = $1`

        const { rows, rowCount } = await pool.query(query, [categoria_id])

        if (rowCount === 0) {
            return res.status(400).json({ mensagem: 'Não existe categoria cadastrada para o ID informado.' })
        }

        req.categoria_nome = rows[0].descricao

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

}

const validarTipoTransacao = (req, res, next) => {
    const { tipo } = req.body

    if (!['entrada', 'saida'].includes(tipo)) {
        return res.status(400).json({ mensagem: 'Tipo inválido. O tipo deve ser entrada ou saida.' })
    }

    next()
}

const verificarTransacaoExistente = async (req, res, next) => {
    const { id } = req.usuario
    const { id: id_transacao } = req.params

    try {
        const { rows, rowCount } = await buscarTransacoesPeloIdDoUsuario(id, true, id_transacao)

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Não existe transação para o id informado' })
        }

        req.transacao = rows[0]

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    verificarCamposObrigatorios,
    verificarFormatoData,
    verificarCategoriaExistente,
    validarTipoTransacao,
    verificarTransacaoExistente
}