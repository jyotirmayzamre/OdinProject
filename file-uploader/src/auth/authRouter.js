const authRouter = require('express').Router();
const authController = require('./authController')

authRouter.get('/register', authController.getRegister);
authRouter.post('/register', authController.postRegister);



module.exports = authRouter;