const postRouter = require('express').Router();
const postController = require('./postController');
const passport = require('passport');


postRouter.get('/', passport.authenticate('jwt', { session: false }), postController.getPosts);
postRouter.post('/', passport.authenticate('jwt', { session: false }), postController.createPost);
postRouter.get('/:postId', passport.authenticate('jwt', { session: false }), postController.getPost);
postRouter.delete('/:postId', passport.authenticate('jwt', { session: false }), postController.deletePost);
postRouter.put('/:postId', passport.authenticate('jwt', { session: false }), postController.updatePost);

postRouter.get('/:postId/comments', passport.authenticate('jwt', { session: false }), postController.getComments);
postRouter.post('/:postId/comments', passport.authenticate('jwt', { session: false }), postController.createComment);
postRouter.get('/:postId/comments/:commentId', passport.authenticate('jwt', { session: false }), postController.getComment);
postRouter.delete('/:postId/comments/:commentId', passport.authenticate('jwt', { session: false }), postController.deleteComment);


module.exports = postRouter;