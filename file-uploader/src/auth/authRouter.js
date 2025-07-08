const authRouter = require('express').Router();
const authController = require('./authController')

authRouter.get('/', authController.getHome);
authRouter.get('/register', authController.getRegister);
authRouter.post('/register', authController.postRegister);
authRouter.get('/login', authController.getLogin);
authRouter.post('/login', authController.postLogin);
authRouter.post('/logout', authController.postLogout);

module.exports = authRouter;