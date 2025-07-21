const prisma = require('../prisma/client');
const { Buffer } = require('buffer')


async function getPosts(userId = null){
    let whereCondition = {};

    if(userId){
        whereCondition.userId = userId;
    } else {
        whereCondition.published = true
    }

    const posts = await prisma.post.findMany({
        where: whereCondition,
        select: {
            id: true,
            title: true,
            timestamp: true,
            user: true
        },
        orderBy: {
            timestamp: 'desc'
        }
    });
    return posts;
}

async function createPost(title, content, userId){
    const post = await prisma.post.create({
        data: {
            title,
            content: Buffer.from(content, 'utf-8'),
            userId
        }
    })
    console.log(post.content);
    return post;
}

async function getPost(postId){
    const post = await prisma.post.findUnique({ where: { id: postId }, 
        select: {
            title: true,
            content: true,
            user: true,
            timestamp: true,
            published: true,
            comments: {
                include: {
                    user: true,
                    userId: false,
                    post: false, 
                    postId: false,
                    id: false
                },
                orderBy: {
                    timestamp: 'desc'
                }
            }
        },
        
    });
    if(post){
        const content = Buffer.from(post.content).toString('utf-8');
        post.content = content;
    }
    return post;
}

async function getComments(postId){
    const comments = await prisma.comment.findMany({ where: { postId: postId},
        select: {
            timestamp: true,
            user: true,
            content: true
        }
    });
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

async function deleteComment(commentId){
    return await prisma.comment.delete({ where: { id: commentId }});
}

async function checkUserOfComment(commentId){
    const comment  = await prisma.comment.findUnique({ where: { id: commentId}});
    return comment.userId;
}

async function updatePost(data, postId){
    const content = Buffer.from(data.content, 'utf-8');
    const post = await prisma.post.update({
        where: { id: postId },
        data: {
            title: data.title,
            content: content,
            published: data.published
        }
    })
    return post;
}

module.exports = {
    getPosts,
    createPost,
    getPost,
    updatePost,
    getComments,
    createComment,
    getComment,
    deleteComment,
    checkUserOfComment
}