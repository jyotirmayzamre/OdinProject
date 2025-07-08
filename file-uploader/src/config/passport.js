const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const prisma = require('./prisma')

/*
Local Strategy configuration
*/

async function verifyCallback(username, password, done){
    const user = await prisma.user.findUnique({ where: { email: username }});
    if(!user) return done(null, false);

    const valid = bcrypt.compareSync(password, user.password);

    if(valid) return done(null, user);
    else return done(null, false); 
}

const strategy = new LocalStrategy(
    { usernameField: 'email' },
    verifyCallback
)

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    const user = await prisma.user.findUnique({ where: { id: id }});
    done(null, user);
})