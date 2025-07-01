const db = require("../db/queries");

async function getAllGames(req, res){
    const games = await db.getAllGames();
    res.render("games", {
        title: "Games",
        games: games,
    })
}

async function getGame(req, res){
    const game = await db.getGame(req.params.id);
    res.render("game", {
        title: "Game",
        game: game
    })
    
}

module.exports = {
    getAllGames,
    getGame
}