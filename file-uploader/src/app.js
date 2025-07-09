const express = require('express');
const passport = require('passport');
const sessionConfig = require('./config/sessionStore');
const authRouter = require('./auth/authRouter');
const folderRouter = require('./folder/folderRouter');
const fileRouter = require('./file/fileRouter');
require('./config/passport');
const path = require('path');

const app = express();

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);
app.use('/folder', folderRouter);
app.use('/file', fileRouter);

app.listen(3000, () => console.log("Express app listening on port 3000"));
