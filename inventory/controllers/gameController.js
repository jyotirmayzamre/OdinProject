const db = require("../db/queries");

async function getAllGames(req, res){
    const games = await db.getAllGames();
    return games
}

async function getGame(req, res){
    const { id } = req.body;
    const game = await db.getGame(id);
    return game
}

module.exports = {
    getAllGames,
    getGame
}