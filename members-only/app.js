const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')
const userRouter = require('./routes/userRouter');
const { Pool } = require('./db/pool');
const pgSession  = require('connect-pg-simple')(session);

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const sessionStore = new pgSession({
    pool: Pool,
    tableName: 'session'
})

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1 
    }
}));

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
    res.render('home')
});

app.use('/users', userRouter);



const PORT = 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));
