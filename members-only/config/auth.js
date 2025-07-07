function isAuth(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect('/users/login?error=Unauthorized');
    }

}

module.exports = isAuth;