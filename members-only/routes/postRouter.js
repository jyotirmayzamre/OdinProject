const postRouter = require('express').Router();
const postController = require('../controllers/postController');
const isAuth = require('../config/auth');


postRouter.get('/create', isAuth, postController.createForm);
postRouter.post('/create', isAuth, postController.createPost);
postRouter.post('/:id/delete', isAuth, postController.deletePost);

module.exports = postRouter;
