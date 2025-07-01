const db = require("../db/pool");

async function getAllGenres(req, res){
    const genres = await db.getAllGenres();
    return genres;
}

async function getGenre(req, res){
    const { id } = req.body;
    const genre = await db.getGenre(id);
    return genre;
}

module.exports = {
    getAllGenres,
    getGenre
}