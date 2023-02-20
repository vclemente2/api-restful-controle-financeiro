const { buscarUsuarioPeloEmail } = require("../utils/utilsUsuarios")

const verificarNomeEmailSenha = (req, res, next) => {
    const { nome, email, senha } = req.body
    
    try {
        if (!nome || !nome.trim()) {
            return res.status(400).json({mensagem: 'O campo nome é obrigatório'})
        }

        if (!email || !email.trim()) {
            return res.status(400).json({mensagem: 'O campo email é obrigatório'})
        }

        if (!senha || !senha.trim()) {
            return res.status(400).json({mensagem: 'O campo senha é obrigatório'})
        }
        next()

    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
}

const verificarEmailExistente = async (req, res, next) => {
    const { email } = req.body

    try {
        const usuarioEncontrado = await buscarUsuarioPeloEmail(email.trim())

        if (usuarioEncontrado.rowCount !== 0) {
            return res.status(400).json({mensagem: "Já existe usuário cadastrado com o e-mail informado."})
        }
        next()
    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
}

module.exports = {
    verificarNomeEmailSenha,
    verificarEmailExistente
}