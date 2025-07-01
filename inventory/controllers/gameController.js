const db = require("../db/queries");



async function getAllGames(req, res){
    const games = await db.getAllGames();
    res.render("games", {
        games: games,
    })
}

async function getGame(req, res){
    const game = await db.getGame(req.params.id);
    res.render("game", {
        game: game
    }) 
}

/*
Function to return the create new game form page
*/
async function gameForm(req, res){
    const genres = await db.getAllGenres();
    res.render("createGame", {
        genres: genres
    });
}

/*
Function to create a game using form data
Requires user to upload a title image and a full image
*/
async function createGame(req, res){
    const titleImage = req.files["title"][0].filename;
    const fullImage = req.files["hero"][0].filename;
    await db.newGame({...req.body, title: titleImage, hero: fullImage});
    res.redirect("/games");
}

module.exports = {
    getAllGames,
    getGame,
    gameForm,
    createGame
}