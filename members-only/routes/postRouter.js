const postRouter = require('express').Router();
const postController = require('../controllers/postController');
const passport = require('passport');
const isAuth = require('../config/auth');


postRouter.get('/create', isAuth, postController.createForm);

module.exports = postRouter;
