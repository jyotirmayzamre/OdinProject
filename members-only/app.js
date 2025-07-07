const express = require('express');
const userRouter = require('./routes/userRouter');

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render('home')
});

app.use('/users', userRouter);



const PORT = 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));
