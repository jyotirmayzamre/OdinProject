const postRouter = require('express').Router();
const postController = require('./postController');
const passport = require('passport');


postRouter.get('/posts', passport.authenticate('jwt', { session: false }), postController.getPosts);
postRouter.post('/posts', passport.authenticate('jwt', { session: false }), postController.createPost);
postRouter.get('/posts/:postId', passport.authenticate('jwt', { session: false }), postController.getPost);
postRouter.delete('/posts/:postId', passport.authenticate('jwt', { session: false }), postController.deletePost);

postRouter.get('/posts/:postId/comments', passport.authenticate('jwt', { session: false }), postController.getComments);
postRouter.post('/posts/:postId/comments', passport.authenticate('jwt', { session: false }), postController.createComment);
postRouter.get('/posts/:postId/comments/:commentId', passport.authenticate('jwt', { session: false }), postController.getComment);
postRouter.delete('/posts/:postId/comments/:commentId', passport.authenticate('jwt', { session: false }), postController.deleteComment);


module.exports = postRouter;