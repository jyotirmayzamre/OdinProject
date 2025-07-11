const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwtStrategy = require('passport-jwt').Strategy
const bcrypt = require('bcryptjs')
const prisma = require('../prisma/client')
const { ExtractJwt } = require('passport-jwt');


async function verifyCallback(username, password, done){
    const user = await prisma.user.findUnique({ where: { email: username }});

    if(!user) done(null, false);

    const isMatch = bcrypt.compareSync(password, user.password);

    if(isMatch) done(null, user);
    else done(null, false);
}

const lStrategy = new LocalStrategy(
    { usernameField: 'email'}, verifyCallback
)

async function jwtCallback(payload, done){
    try {
        const user = await prisma.user.findUnique({ where: { id: payload.id }});
        if(user) return done(null, user)
    } catch(err){
        return done(err);
    }
}

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const jStrategy = new jwtStrategy(opts, jwtCallback);



passport.use(lStrategy);
passport.use(jStrategy);

module.exports = passport;