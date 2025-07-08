const express = require('express');
const passport = require('passport');
const sessionConfig = require('./config/sessionStore');
const authRouter = require('./auth/authRouter');
const folderRouter = require('./folder/folderRouter');
require('./config/passport');

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);
app.use('/folder', folderRouter);

app.listen(3000);
