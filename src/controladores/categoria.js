const pool = require('../conexao/conexao')

const listarCategoria = async (req, res) => {

	try {
		const { rows } = await pool.query('SELECT * FROM categorias')

		return res.status(200).json(rows)
	} catch (error) {
		return res.status(500).json({ mensagem: error.message })
	}

}

module.exports = {
	listarCategoria
}
