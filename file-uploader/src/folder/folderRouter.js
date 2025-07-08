const folderRouter = require('express').Router();
const folderController = require('./folderController');
const isAuth = require('../config/auth');


folderRouter.get('/', isAuth, folderController.getRoot);
folderRouter.post('/create', isAuth, folderController.createFolder);
folderRouter.post('/:id/delete', isAuth, folderController.deleteFolder);
folderRouter.get('/:id', isAuth, folderController.getFolder)

module.exports = folderRouter;