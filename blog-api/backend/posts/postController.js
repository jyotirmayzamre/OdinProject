const queries = require('./postQueries');

async function getPosts(req, res){
    try {
        const userId = req.query.userId;
        const posts = await queries.getPosts(userId);
        if(!posts) return res.status(500).json({error:'posts not found'});
        return res.status(200).json(posts);
    } catch(e){
        console.error(e);
        return res.status(500).json({error: 'something went wrong'})
    } 
}

async function createPost(req, res){
    try {
        if(req.user.role != 'ADMIN'){
            return res.status(403).json({ error: 'you are not authorized to access this endpoint' });
        }
        const { title, content } = req.body;
        const userId = req.user.id;

        if(!title || !content) return res.status(400).json({error: 'title and content are required'})

        const post = await queries.createPost(title, content, userId);
        if(!post) return res.status(401).json({ error: 'post creation failed' })
        return res.status(201).json({ message: 'post created successfully', post});

    } catch(e){
        console.error(e);
        return res.status(500).json({error: 'something went wrong'});
    }
}

async function getPost(req, res){
    try{
        const id = req.params.postId;
        const post = await queries.getPost(id);
        if(!post) return res.status(404).json({ error: 'post not found' });
        return res.status(200).json({ message: 'post found', post });
    } catch(e){
        console.error(e);
        return res.status(500).json({error: 'something went wrong'})
    } 
}

async function deletePost(req, res){
    try{
        if(req.user.role != 'ADMIN'){
            return res.status(403).json({ error: 'you are not authorized to access this endpoint' });
        }
        const id = req.params.postId;
        const post = await queries.deletePost(id);
        if(!post) return res.status(500).json({error:'cannot delete a non-existent post'});
        return res.status(200).json({ message: 'post deleted successfully', post});
    } catch(e){
        console.error(e);
        return res.status(500).json({error: 'something went wrong'})
    }
}

async function updatePost(req, res){
    try{
        if(req.user.role != 'ADMIN'){
            return res.status(403).json({ error: 'you are not authorized to access this endpoint' });
        }
        const id = req.params.postId;
        const newData = req.body;
        const post = await queries.updatePost(newData, id);
        if(!post) return res.status(500).json({ error: 'cannot update a non-existent post'});
        return res.status(200).json({ message: 'post updated successfully', post});
    } catch(e){
        console.error(e);
        return res.status(500).json({ error: 'something went wrong' });
    }
}

async function getComments(req, res){
    try {
        const postId = req.params.postId;
        const post = await queries.getPost(id);
        if(!post) return res.status(404).json({ error: 'cannot get comments of a non-existent post' });

        const comments = await queries.getComments(postId);
        if(!comments) return res.status(404).json({ error: 'comments not found' });
        return res.status(200).json({ message: 'comments found', comments })
    } catch(e){
        console.error(e);
        return res.status(500).json({error: 'something went wrong'});
    }  
}

async function createComment(req, res){
    try{
        const { content } = req.body;

        if(!content) return res.status(400).json({error: 'content is required'});

        const postId = req.params.postId;
        const post = await queries.getPost(postId);
        if(!post) return res.status(404).json({ error: 'cannot create comment for a non-existent post' });

        const userId = req.user.id
        const comment = await queries.createComment(content, postId, userId);
        if(!comment) return res.status(500).json({ error: 'comment creation unsuccessful' });
        return res.status(201).json({ message: 'comment creation successful', comment});
    } catch(e){
        console.error(e);
        return res.status(500).json({error: 'something went wrong'});
    }    
}

async function getComment(req, res){
    try{
        const commentId = req.params.commentId;
        const comment = await queries.getComment(commentId);
        if(!comment) return res.status(404).json({ message: 'comment not found'});
        return res.status(200).json({ message: 'comment found', comment });
    } catch(e){
        console.error(e);
        return res.status(500).json({error: 'something went wrong'});
    } 
}


async function deleteComment(req, res){
    try {
        const role = req.user.role;
        const postId = req.params.postId;
        const commentId = req.params.commentId;

        const post = await queries.getPost(postId);
        if(!post) return res.status(404).json({ error: 'cannot delete comment for a non-existent post' });
        

        if (role === 'USER'){
            const userId = await queries.checkUserOfComment(commentId);
            if(userId != req.user.id) return res.status(403).json({ error: 'you cannot delete comments written by others' });
        }
        const comment = await queries.deleteComment(commentId);
        if(!comment) return res.status(404).json({ error: 'comment deletion unsuccessful'});
        return res.status(200).json({ message: 'comment deletion successful', comment });

    } catch(e){
        console.error(e);
        res.status(500).json({error: 'something went wrong'});
    }
}

module.exports = {
    getPosts,
    createPost,
    getPost,
    deletePost,
    updatePost,
    getComments,
    createComment,
    getComment,
    deleteComment
}