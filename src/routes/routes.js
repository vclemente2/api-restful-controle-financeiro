const { Router } = require('express');

const userController = require('../controllers/UserController');
const userLogin = require('../controllers/authController');
const tokenValidation = require('../middlewares/authMiddleware');
const userMiddleware = require('../middlewares/UserMiddleware');
const validadeRequestbody = require('../middlewares/validateRequestBody');
const userValidation = require('../schema/userSchema');
const loginSchema = require('../schema/loginSchema');

const routes = Router();

routes.post(
    '/user',
    validadeRequestbody(userValidation),
    userMiddleware.uniqueEmail,
    userController.create
)

routes.post(
    '/login',
    validadeRequestbody(loginSchema),
    userMiddleware.verifyUserCredentials,
    userLogin
)

routes.use(tokenValidation);

routes.get(
    '/user',
    userController.findOne
)

routes.put(
    '/user',
    validadeRequestbody(userValidation),
    userMiddleware.uniqueEmail,
    userController.update
)

// routes.get(
//     '/categoria',
//     listarCategoria
// )

// routes.get(
//     '/transacao',
//     listarTransacao
// )

// routes.get(
//     '/transacao/extrato',
//     obterExtrato
// )

// routes.get(
//     '/transacao/:id',
//     verificarTransacaoExistente,
//     detalharTransacao
// )

// routes.post(
//     '/transacao',
//     verificarCamposObrigatorios,
//     validarTipoTransacao,
//     verificarFormatoData,
//     verificarCategoriaExistente,
//     cadastrarTransacao
// )

// routes.put(
//     '/transacao/:id',
//     verificarCamposObrigatorios,
//     validarTipoTransacao,
//     verificarCategoriaExistente,
//     verificarTransacaoExistente,
//     atualizarTransacao
// )

// routes.delete(
//     '/transacao/:id',
//     verificarTransacaoExistente,
//     excluirTransacao
// )

module.exports = routes