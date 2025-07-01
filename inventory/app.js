const express = require("express");
const app = express();

const gameRouter = require("./routes/gameRouter");
const genreRouter = require("./routes/genreRouter")



app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true}));
app.use(express.static('images'));
app.use(express.static('styles'));


app.get("/", (req, res) => {
    res.render("home");
})
app.use("/games", gameRouter);
app.use("/genres", genreRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`))