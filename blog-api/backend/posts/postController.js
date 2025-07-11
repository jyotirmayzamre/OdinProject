const prisma = require('../prisma/client');
const queries = require('./postQueries');

async function getPosts(req, res){
    const posts = await queries.getPosts();
    return res.status(200).json({
        posts
    })
}

async function createPost(req, res){
    if(req.user.role != 'ADMIN'){
        return res.status(403).json({ message: 'You are not authorized to access this endpoint' });
    }
    const { title, content } = req.body;
    const userId = req.user.id;

    const post = await queries.createPost(title, content, userId);
    if(!post) return res.status(401).json({ message: 'unsuccessful' })
    else return res.status(200).json({ message: 'successful', post});
}

async function getPost(req, res){
    const id = req.params.postId;
    const post = await queries.getPost(id);
    if(!post) return res.status(404).json({ message: 'resource not found' });
    else return res.status(200).json({ message: 'resource found', post });
}

async function getComments(req, res){
    const postId = req.params.postId;
    const comments = await queries.getComments(postId);
    if(!comments) return res.status(404).json({ message: 'resource not found' });
    else return res.status(200).json({ message: 'resource found', comments })
}

async function createComment(req, res){
    const { content } = req.body;
    const postId = req.params.postId;
    const userId = req.user.id

    const comment = await queries.createComment(content, postId, userId);
    if(!comment) return res.status(401).json({ message: 'unsuccessful' });
    else return res.status(200).json({ message: 'successful', comment});
}

async function getComment(req, res){
    const commentId = req.params.commentId;
    const comment = await queries.getComment(commentId);
    if(!comment) return res.status(404).json({ message: 'resource not found'});
    else return res.status(200).json({ message: 'resource found', comment });
}

module.exports = {
    getPosts,
    createPost,
    getPost,
    getComments,
    createComment,
    getComment
}