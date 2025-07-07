const { Router } = require('express');
const userRouter = Router();
const userController = require("../controllers/userController");
const passport = require('passport');
const isAuth = require('../config/auth');



userRouter.get('/register', userController.getRegister);
userRouter.post('/register', userController.createUser);
userRouter.get('/login', userController.getLogin);

userRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err);
        if (!user) return res.redirect('/users/login?error=Invalid+credentials');

        req.logIn(user, (err)=> {
            if(err) return next(err);
            return res.redirect(`/users/${user.id}`);
        });
    })(req, res, next);
})

userRouter.get('/:id', isAuth, userController.home);
userRouter.get('/:id/update', isAuth, userController.updateForm);
userRouter.post('/:id/update', isAuth, userController.update);

module.exports = userRouter;