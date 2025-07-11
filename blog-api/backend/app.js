const express = require('express')
const path = require('path');
const authRouter = require('./auth/authRouter');
const postRouter = require('./posts/postRouter');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
require('./config/passport');
require('dotenv').config();

app.get('/', (req, res) => {
    res.json({
        'message': "Hello, world"
    })
})

app.use('/auth', authRouter);
app.use('/posts', postRouter);

app.listen(3000, () => console.log("Server listening on port 3000"));