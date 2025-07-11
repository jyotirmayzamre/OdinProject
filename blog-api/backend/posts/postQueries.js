const prisma = require('../prisma/client');


async function getPosts(){
    const posts = await prisma.post.findMany();
    return posts;
}

async function createPost(title, content, userId){
    const post = await prisma.post.create({
        data: {
            title,
            content,
            userId
        }
    })
    return post;
}

async function getPost(postId){
    const post = await prisma.post.findUnique({ where: { id: postId }});
    return post;
}

async function getComments(postId){
    const comments = await prisma.comment.findMany({ where: { postId: postId} });
    return comments;
}

async function createComment(content, postId, userId){
    const comment = await prisma.comment.create({
        data: {
            content,
            postId,
            userId
        }
    })
    return comment;
}

async function getComment(commentId){
    const comment = await prisma.comment.findUnique({ where: { id: commentId }});
    return comment;
}

module.exports = {
    getPosts,
    createPost,
    getPost,
    getComments,
    createComment,
    getComment
}