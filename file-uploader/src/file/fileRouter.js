const fileRouter = require('express').Router();
const fileController = require('./fileController');
const isAuth = require('../config/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'store');
    },
    filename: function (req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
})

const upload = multer({ storage });



fileRouter.post('/create', isAuth, upload.single('file'), fileController.createFile);
fileRouter.get('/:id', isAuth, fileController.getFile);


module.exports = fileRouter;