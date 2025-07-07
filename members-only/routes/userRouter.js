const { Router } = require('express');
const userRouter = Router();
const userController = require("../controllers/userController");



userRouter.get('/register', userController.getRegister);
userRouter.post('/register', userController.createUser);
userRouter.get('/login', userController.getLogin);

module.exports = userRouter;