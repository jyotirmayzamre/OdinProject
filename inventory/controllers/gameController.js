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
Function to create a game using form data
Requires user to upload a title image and a full image
*/
async function createGame(req, res){

}

module.exports = {
    getAllGames,
    getGame,
    createGame
}