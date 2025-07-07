const { body, validationResult } = require('express-validator');
const queries = require('../db/queries');

const validatePost = [
    body('title').trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 1, max: 30}).withMessage('Title must be between 1 and 30 characters'),

    body('content').trim()
        .notEmpty().withMessage('Content is required')
        .isLength({ min: 1, max: 200}).withMessage('Content must be between 1 and 200 characters')
]

exports.createForm = (req, res) => {
    res.render('postform', {id: req.query.userid});
}

exports.createPost = [
    validatePost,
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render('postform', {
                errors: errors.array(), id: req.query.userid
            })
        }

        const { title, content } = req.body;
        const id = req.query.userid
        const data = {title, content, id};
        await queries.createPost(data);
        res.redirect(`/users/${req.query.userid}`)
    }
]
