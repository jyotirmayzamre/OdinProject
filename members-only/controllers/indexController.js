const { body, validationResult } = require('express-validator');
const queries = require('../db/queries');

const memberSecret = 'xyz';


const validateUser = [
    body('first_name').trim()
        .notEmpty().withMessage('First name is required')
        .isAlpha().withMessage('First name must contain only letters')
        .isLength({ min: 1, max: 20}).withMessage('First name must be between 1 and 20 characters'),
    body('last_name').trim()
        .notEmpty().withMessage('Last name is required')
        .isAlpha().withMessage('Last name must contain only letters')
        .isLength({ min: 1, max: 20}).withMessage('Last name must be between 1 and 20 characters'),
    body('email').trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Value entered should be a valid email address')
        .custom(async value => {
            if (await queries.validateEmail(value))
                throw new Error('Email is already in use')
        }),
    body('password').trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 5}),
    body('re-password').custom((value, { req }) => {
        return value === req.body.password;
    })
]




exports.getRegister = (req, res) => {
    res.render('signupform');
}

exports.getLogin = (req, res) => {
    const error = req.query.error
    res.render('login', { error });
}

exports.home = (req, res) => {
    res.render('home', { user: req.user });
}

exports.updateForm = (req, res) => {
    res.render('membership', { user: req.user });
}

exports.update = async (req, res) => {
    const { secret } = req.body;
    if(secret === memberSecret){
       await queries.updateMembership(req.user.id);
       res.redirect(`/`, { user: req.user });
    }
}

exports.createUser = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render('signupform', {
                errors: errors.array(),
            })
        }

        const { first_name, last_name, email, password } = req.body;
        const data = { first_name, last_name, email, password };
        await queries.createUser(data);
        res.redirect('/login');
    }
]

