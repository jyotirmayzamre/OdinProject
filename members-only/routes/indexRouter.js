const { Router } = require('express');
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const passport = require('passport');
const isAuth = require('../config/auth');



indexRouter.get('/', indexController.home);

indexRouter.get('/register', indexController.getRegister);
indexRouter.post('/register', indexController.createUser);
indexRouter.get('/login', indexController.getLogin);

indexRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err);
        if (!user) return res.redirect('/login?error=Invalid+credentials');

        req.logIn(user, (err)=> {
            if(err) return next(err);
            return res.redirect(`/`);
        });
    })(req, res, next);
})

indexRouter.get('/updateMembership', isAuth, indexController.updateForm);
indexRouter.post('/updateMembership', isAuth, indexController.update);

module.exports = indexRouter;