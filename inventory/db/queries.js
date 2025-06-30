const pool = require("./pool");

/* 
Function to retrieve game data. Only retrieve the id of the game and the title image
*/
async function getAllGames(){
    const { rows } = await pool.query("SELECT id, title_image FROM games");
    return rows;
}

async function getGame(id){
    const { row } = await pool.query(`SELECT * FROM games WHERE id=$1`, [id]);
    return row;
}

module.exports = {
    getAllGames,
}