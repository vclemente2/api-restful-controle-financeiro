const { Router } = require('express')

const { cadastrarUsuario, logarUsuario, detalharUsuario, atualizarUsuario } = require('../controladores/usuarios')
const { listarCategoria } = require('../controladores/categoria')
const { listarTransacao, detalharTransacao, cadastrarTransacao, atualizarTransacao, excluirTransacao, obterExtrato } = require('../controladores/transacao')
const { verificarEmailExistente, verificarEmail, verificarNome, verificarSenha, verificarSenhaValida } = require('../intermediarios/usuarios')
const validarToken = require('../intermediarios/autenticacao')
const { verificarCamposObrigatorios, verificarFormatoData, verificarCategoriaExistente, validarTipoTransacao, verificarTransacaoExistente } = require('../intermediarios/transacoes')

const rotas = Router();

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

rotas.use(validarToken)

rotas.get('/usuario', detalharUsuario)

rotas.put(
    '/usuario',
    verificarNome,
    verificarEmail,
    verificarSenha,
    verificarEmailExistente,
    atualizarUsuario
)

rotas.get('/categoria', listarCategoria)

rotas.get('/transacao', listarTransacao)

rotas.get('/transacao/:id', verificarTransacaoExistente, detalharTransacao)

rotas.post(
    '/transacao',
    verificarCamposObrigatorios,
    validarTipoTransacao,
    verificarFormatoData,
    verificarCategoriaExistente,
    cadastrarTransacao
)

rotas.put('/transacao/:id', atualizarTransacao)

rotas.delete('/transacao/:id', excluirTransacao)

rotas.get('/transacao/extrato', obterExtrato)


module.exports = rotas