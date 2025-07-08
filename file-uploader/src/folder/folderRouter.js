const folderRouter = require('express').Router();
const folderController = require('./folderController');
const isAuth = require('../config/auth');


folderRouter.get('/', isAuth, folderController.getFolder);
folderRouter.post('/create', isAuth, folderController.createFolder);

module.exports = folderRouter;