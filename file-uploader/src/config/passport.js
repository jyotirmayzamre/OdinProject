const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { prisma } = require('./prisma');

async function verifyCallback(username, password, done){
    const user = await prisma.user.findUnique({ where: {
            email: username
    }})

    if(!user) return done(null, false);
    const isValid = await bcrypt.compare(password, user.password);
    if(isValid){
        return done(null, user);
    } else{
        return done(null, false);
    }
}

const strategy = new LocalStrategy(
    { usernameField: 'email'},
    verifyCallback
);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (userID, done) => {
    const user = await prisma.user.findUnique({ where: {
        id: userID
    }});
    done(null, user);
})