const folderRouter = require('express').Router();
const folderController = require('./folderController');
const isAuth = require('../config/auth');


folderRouter.get('/', isAuth, folderController.getFolder);

module.exports = folderRouter;