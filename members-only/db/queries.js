const pool = require('./pool')
const bcrypt = require('bcryptjs');
const { format } = require('daye-fns');

//query for validating username
async function validateEmail(email){
    const result = await pool.query(`SELECT * FROM Users WHERE email = $1`, [email]);
    return result.rowCount > 0;
}

async function createUser(info){
    const hashedPassword = await bcrypt.hash(info.password, 10);
    await pool.query(`INSERT INTO Users (first_name, last_name, email, hash) VALUES ($1, $2, $3, $4)`, [info.first_name, info.last_name, info.email, hashedPassword]);
}

async function createPost(info){
    const timestamp = format(new Date(), 'yyy-MM-dd HH:mm:ss');
    await pool.query(`INSERT INTO Posts (title, timestamp, content, author) VALUES ($1, $2, $3, $4)`, [info.title, timestamp, info.content, info.user_id])
}

async function updateMembership(id){
    const q = `
    UPDATE Users
    SET membership_status = true
    WHERE id = $1
    `
    await pool.query(q, [id]);
}

module.exports = {
    validateEmail,
    createUser,
    updateMembership,
    createPost
}