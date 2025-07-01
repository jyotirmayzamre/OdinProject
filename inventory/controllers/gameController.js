const db = require("../db/queries");

async function getAllGames(req, res){
    const games = await db.getAllGames();
    res.render("games", {
        title: "Games",
        games: games,
    })
}

async function getGame(req, res){
    const { id } = req.body;
    const game = await db.getGame(id);
    console.log(game);
    
}

module.exports = {
    getAllGames,
    getGame
}