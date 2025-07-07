const { Router } = require('express');
const userRouter = Router();
const userController = require("../controllers/userController");
const passport = require('passport');



userRouter.get('/register', userController.getRegister);
userRouter.post('/register', userController.createUser);
userRouter.get('/login', userController.getLogin);

userRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err);
        if (!user) return res.redirect('/users/login');

        req.logIn(user, (err)=> {
            if(err) return next(err);
            return res.redirect(`/users/${user.id}`);
        });
    })(req, res, next);
})

userRouter.get('/:id', userController.home);

module.exports = userRouter;