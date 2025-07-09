const { body, validationResult } = require('express-validator');
const queries = require('./authQueries');
const passport = require('passport');

/*
Home Method
*/

exports.getHome = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/folder')
    }
    res.redirect('/login');
}

/*
Register Methods
*/

exports.getRegister = (req, res) => {
    res.render('registerForm');
}

const validateRegister = [
    body('email').trim()
        .notEmpty().withMessage('Email field should not be empty')
        .isEmail().withMessage('Input should be a valid email')
        .custom(async (value) => {
            const result = await queries.emailCheck(value);
            if(result) throw new Error('This email is already in use')
        }),
        body('password').trim()
            .notEmpty().withMessage('Password field should not be empty')
            .isLength({min: 3}).withMessage('Password should be atleast 3 characters long'),
        body('re-password').trim()
            .custom(async (value, { req })=>{
                if(value !== req.body.password) throw new Error('The passwords must match')
            })
    
]

exports.postRegister = [
    validateRegister,
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render('registerForm', {
                errors: errors.array()
            })
        }

        //create user
        const { email, password } = req.body;
        const user = await queries.createUser(email, password);
        res.redirect('/login');

    }
]


/*
Login Methods
*/

exports.getLogin = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/folder')
    }
    res.render("home")
}

exports.postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/folder',
        failureRedirect: '/login?error=Invalid+credentials'
    })(req, res, next);
}

/*
Logout Method
*/

exports.postLogout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}