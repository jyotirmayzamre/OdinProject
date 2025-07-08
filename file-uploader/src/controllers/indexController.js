const { body, validationResult } = require('express-validator');
const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const queries = require('../db/queries');
const passport = require('passport');


const validateUser = [
    body('email').trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Should be a valid email address')
        .custom(async value => {
            const user = await prisma.user.findUnique({ where: {
                email: value
            }})
            if(user) throw new Error('Email is already in use')
        }),

    body('password').trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 5}).withMessage('Password length should be atleast 5 characters'),
    body('re-password').trim()
        .custom((value, { req }) => {
            if(value != req.body.password) throw new Error('Passwords do not match')
        })
]


module.exports.home = (req, res) => {
    res.redirect('/login');
}

module.exports.getLogin = (req, res) => {
    const error = req.query.error;
    res.render('login', { error });
}

module.exports.postLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err);
        if(!user) return res.redirect('/login?error=Invalid+credentials')

        req.logIn(user, (err)=> {
            if(err) return next(err);
            return res.redirect('/');
        });
    })(req, res, next);
}

module.exports.logout = (req, res) => {
    req.logOut(err => {
        if(err) return next(err);
        res.redirect('/')
    })
}

module.exports.getRegister = (req, res) => {
    res.render('register');
}

module.exports.postRegister = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render('register', {
                errors: errors.array(),
            })
        }

        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await queries.createUser(email, hashedPassword);  
    }

]