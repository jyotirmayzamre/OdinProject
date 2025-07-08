const express = require('express');
const passport = require('passport');
const sessionConfig = require('./config/sessionStore');
const authRouter = require('./auth/authRouter');
require('./config/passport');

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);

app.listen(3000);
