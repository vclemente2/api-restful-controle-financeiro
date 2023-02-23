const jwt = require('jsonwebtoken')
const senhaToken = require('../senha-token')
const { buscarUsuarioPorEmailOuId } = require('../utils/utilsUsuarios')

const validarToken = async (req, res, next) => {
    const { authorization } = req.headers
    try {
               
        if (!authorization) {
            return res.status(401).json({mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.'})
        }
        const token = authorization.split(' ')[1]
        
        const { id } = jwt.verify(token, senhaToken)
        
        const usuarioAutenticado = await buscarUsuarioPorEmailOuId(id)

        if (usuarioAutenticado.rowCount === 0) {
            return res.status(401).json({mensagem: 'O usuário não tem permissão para acessar este recurso'})
        }

        const { senha: _, ...usuario } = usuarioAutenticado.rows[0]
        req.usuario = usuario

        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.'})
        }    
        return res.status(500).json({mensagem: error.message})
    }

}

module.exports = validarToken