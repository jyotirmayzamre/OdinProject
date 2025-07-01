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
    const { rows } = await pool.query(`SELECT g.*, json_agg(json_build_object('id', genres.id, 'title', genres.title)) AS genres FROM games g JOIN game_genre gg ON g.id = gg.game_id JOIN genres ON gg.genre_id = genres.id WHERE g.id = $1 GROUP BY g.id`, [id]);
    return rows[0];
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
    const { rows } = await pool.query(`SELECT g.*, json_agg(json_build_object('id', games.id, 'image', games.title_image)) AS games FROM genres g JOIN game_genre gg ON g.id = gg.genre_id JOIN games ON gg.game_id = games.id WHERE g.id = $1 GROUP BY g.id`, [id]);
    return rows[0];
}

module.exports = {
    getAllGames,
    getGame,
    getAllGenres,
    getGenre
}