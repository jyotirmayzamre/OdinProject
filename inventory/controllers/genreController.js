const db = require("../db/queries");

async function getAllGenres(req, res){
    const genres = await db.getAllGenres();
    res.render("genres", {
        genres: genres
    })
}

async function getGenre(req, res){
    const genre = await db.getGenre(req.params.id);
    res.render("genre", {
        genre: genre
    })
}

module.exports = {
    getAllGenres,
    getGenre
}