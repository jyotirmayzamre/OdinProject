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

async function createForm(req, res){
    res.render("createGenre");
}

async function createGenre(req, res){
    const titleImage = req.files["image"][0].filename;
    await db.newGenre({...req.body, image: titleImage});
    res.redirect("/genres");
}

module.exports = {
    getAllGenres,
    getGenre,
    createForm,
    createGenre
}