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


/*
Function to create a new game in the db
*/
async function newGame(game){
    const q = `
    INSERT INTO games (title, description, price, rating, publisher, release_date, units_available, full_image, title_image)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id
    `
    const values = [game.name, game.desc, Number(game.price), Number(game.rating), game.publisher, game.release, Number(game.quantity), game.hero, game.title]
    const result = await pool.query(q, values);
    const id = result.rows[0].id;


    const genres = game.genres.map((genre) => Number(genre));

    const placeholders = game.genres.map((_, i) => `($1, $${i + 2})`).join(', ');
    const q2 = `
    INSERT INTO game_genre (game_id, genre_id)
    VALUES ${placeholders}
    `;
    await pool.query(q2, [id, ...genres]);

}

module.exports = {
    getAllGames,
    getGame,
    getAllGenres,
    getGenre,
    newGame
}