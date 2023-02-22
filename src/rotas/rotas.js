const { Router } = require('express')

const { cadastrarUsuario, logarUsuario, detalharUsuario, atualizarUsuario } = require('../controladores/usuarios')
const { listarCategoria } = require('../controladores/categoria');
const { listarTransacao, detalharTransacao, cadastrarTransacao, atualizarTransacao, excluirTransacao, obterExtrato } = require('../controladores/transacao')
const { verificarEmailExistente, verificarEmail, verificarNome, verificarSenha, verificarSenhaValida, gerarToken } = require('../intermediarios/usuarios')

const rotas = Router()

rotas.post(
    '/usuario',
    verificarNome,
    verificarEmail,
    verificarSenha,
    verificarEmailExistente,
    cadastrarUsuario
)

rotas.post(
    '/login',
    verificarEmail,
    verificarSenha,
    verificarEmailExistente,
    verificarSenhaValida,
    logarUsuario
)

rotas.use(() => { }) //Passar o intermediário de autenticação como intermediário

rotas.get('/usuario', detalharUsuario)

rotas.put('/usuario', atualizarUsuario)

rotas.get('/categoria', listarCategoria)

rotas.get('/transacao', listarTransacao)

rotas.get('/transacao/:id', detalharTransacao)

rotas.post('/transacao', cadastrarTransacao)

rotas.put('/transacao/:id', atualizarTransacao)

rotas.delete('/transacao/:id', excluirTransacao)

rotas.get('/transacao/extrato', obterExtrato)


module.exports = rotas