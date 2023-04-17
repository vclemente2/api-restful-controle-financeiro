const { Router } = require('express');

const { cadastrarUsuario, logarUsuario, detalharUsuario, atualizarUsuario } = require('../controllers/UserController');
const { listarCategoria } = require('../controllers/categoria');
const { listarTransacao, detalharTransacao, cadastrarTransacao, atualizarTransacao, excluirTransacao, obterExtrato } = require('../controllers/transacao');
const { verificarEmailExistente, verificarEmail, verificarNome, verificarSenha, verificarSenhaValida } = require('../middlewares/usuarios');
const validarToken = require('../middlwares/autenticacao');
const { verificarCamposObrigatorios, verificarFormatoData, verificarCategoriaExistente, validarTipoTransacao, verificarTransacaoExistente } = require('../middlewares/transacoes');

const routes = Router()

routes.post(
    '/user',
    verificarNome,
    verificarEmail,
    verificarSenha,
    verificarEmailExistente,
    cadastrarUsuario
)

routes.post(
    '/login',
    verificarEmail,
    verificarSenha,
    verificarEmailExistente,
    verificarSenhaValida,
    logarUsuario
)

routes.use(validarToken)

routes.get(
    '/user',
    detalharUsuario
)

routes.put(
    '/user',
    verificarNome,
    verificarEmail,
    verificarSenha,
    verificarEmailExistente,
    atualizarUsuario
)

routes.get(
    '/categoria',
    listarCategoria
)

routes.get(
    '/transacao',
    listarTransacao
)

routes.get(
    '/transacao/extrato',
    obterExtrato
)

routes.get(
    '/transacao/:id',
    verificarTransacaoExistente,
    detalharTransacao
)

routes.post(
    '/transacao',
    verificarCamposObrigatorios,
    validarTipoTransacao,
    verificarFormatoData,
    verificarCategoriaExistente,
    cadastrarTransacao
)

routes.put(
    '/transacao/:id',
    verificarCamposObrigatorios,
    validarTipoTransacao,
    verificarCategoriaExistente,
    verificarTransacaoExistente,
    atualizarTransacao
)

routes.delete(
    '/transacao/:id',
    verificarTransacaoExistente,
    excluirTransacao
)

module.exports = routes