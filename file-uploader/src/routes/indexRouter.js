const indexRouter = require('express').Router();
const indexController = require("../controllers/indexController");


indexRouter.get('/', indexController.home);
indexRouter.get('/login', indexController.getLogin);
indexRouter.post('/login', indexController.postLogin);
indexRouter.get('/logout', indexController.logout);
indexRouter.get('/register', indexController.getRegister);
indexRouter.post('/register', indexController.postRegister);



module.exports = indexRouter;
