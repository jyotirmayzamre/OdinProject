const pool = require('./pool')
const bcrypt = require('bcryptjs');
const { format } = require('date-fns');

//query for validating username
async function validateEmail(email){
    const result = await pool.query(`SELECT * FROM Users WHERE email = $1`, [email]);
    return result.rowCount > 0;
}

async function createUser(info){
    const hashedPassword = await bcrypt.hash(info.password, 10);
    const val = info.admin === 'on' ? true : false;
    await pool.query(`INSERT INTO Users (first_name, last_name, email, hash, admin) VALUES ($1, $2, $3, $4, $5)`, [info.first_name, info.last_name, info.email, hashedPassword, val]);
}

async function createPost(info){
    const timestamp = format(new Date(), 'yyy-MM-dd HH:mm:ss');
    await pool.query(`INSERT INTO Posts (title, timestamp, content, author) VALUES ($1, $2, $3, $4)`, [info.title, timestamp, info.content, info.id])
}

async function deletePost(id) {
    await pool.query('DELETE FROM Posts WHERE id = $1', [id]);
    
}

async function updateMembership(id){
    const q = `
    UPDATE Users
    SET membership_status = true
    WHERE id = $1
    `
    await pool.query(q, [id]);
}

async function getPosts(){
    const q = `
        SELECT Posts.id, Posts.title, Posts.content, Posts.timestamp, Users.email
        FROM Posts
        JOIN Users ON Posts.author = Users.id
        `
    const posts = await pool.query(q);
    return posts.rows;
}

module.exports = {
    validateEmail,
    createUser,
    updateMembership,
    createPost,
    getPosts,
    deletePost
}