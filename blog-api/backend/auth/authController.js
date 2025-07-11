const { body, validationResult } = require('express-validator');
const queries = require('./authQueries');
const jwt  = require('jsonwebtoken');

const validateRegistration = [
    body('email').trim()
        .isEmpty().withMessage('Email should not be empty')
        .isEmail().withMessage('Email should be in valid format')
        .custom(async (value) => {
            const result = queries.emailCheck(value);
            if(result) throw new Error('User with this email already exists')
        }),
    body('password').trim()
        .isEmpty().withMessage('Password should not be empty')
        .isLength({min: 3}).withMessage('Password should be atleast 3 characters long'),
    body('confirm-password').trim()
        .isEmpty().withMessage('Confirmation should not be empty')
        .custom((value, { req }) => {
            if(value !== req.body.password) throw new Error('Password do not match')
        })
]


exports.register = [
    validateRegistration,
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "unsuccessful",
                errors: errors.array()
            })
        }

        const { email, password } = req.body;
        const user = await queries.createUser(email, password);
        res.status(201).json({
            message: 'success',
            user: {
                id: user.id,
                email: user.email
            }
        }) 
    }
]


exports.login = (req, res, next) => {
    passport.authenticate('local', { session: false}, (err, user, info) => {
        if(err) return next(err)
        if(!user) return res.status(401).json({ message: 'Invalid Credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24h"});

        return res.status(200).json({
            message: 'successful',
            token,
            user: {
                id: user.id,
                username: user.email
            }
        })
    })
}

exports.logout = (req, res) => {
    return res.status(200).json({ message: "Logout successful" })
}