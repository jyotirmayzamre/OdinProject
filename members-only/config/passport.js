const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Pool = require('../db/pool');
const bcrypt = require('bcryptjs');

async function verifyCallback(username, password, done){
    const user = await Pool.query('SELECT * FROM Users WHERE email=$1', [username]);
    if(user.rowCount === 0){
        return done(null, false)
    }
    const isValid = await bcrypt.compare(password, user.rows[0].hash);
    if(isValid){
        return done(null, user.rows[0]);
    } else {
        return done(null, false);
    }
}

const strategy = new LocalStrategy(
    { usernameField: 'email'},
    verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (userID, done) => {
    const user = await Pool.query('SELECT * FROM Users WHERE id=$1', [userID]);
    done(null, user);
})
