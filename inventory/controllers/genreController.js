const db = require("../db/queries");

async function getAllGenres(req, res){
    const genres = await db.getAllGenres();
    res.render("genres", {
        title: "Genres",
        genres: genres
    })
}

async function getGenre(req, res){
    const genre = await db.getGenre(req.params.id);
    res.render("genre", {
        title: "Genre",
        genre: genre
    })
}

module.exports = {
    getAllGenres,
    getGenre
}