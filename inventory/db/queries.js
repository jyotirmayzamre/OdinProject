const pool = require("./pool");

/* 
Function to retrieve game data. Only retrieve the id of the game and the title image
*/
async function getAllGames(){
    const { rows } = await pool.query("SELECT id, title_image FROM games");
    return rows;
}

/*
Function to retrieve a singular game based on id
*/
async function getGame(id){
    const { row } = await pool.query(`SELECT * FROM games WHERE id=$1`, [id]);
    return row;
}

/*
Function to retrieve all genres 
*/

async function getAllGenres(){
    const { rows } = await pool.query('SELECT id, title, image FROM genres');
    return rows;
}

/*
Function to retreive genre by id
*/

async function getGenre(id){
    const { row } = await pool.query('SELECT * FROM genres WHERE id=$1', [id]);
    return row;
}

module.exports = {
    getAllGames,
    getGame,
    getAllGenres,
    getGenre
}