const pool = require('./pool')
const bcrypt = require('bcryptjs');

//query for validating username
async function validateEmail(email){
    const result = await pool.query(`SELECT * FROM Users WHERE email = $1`, [email]);
    return result.rowCount > 0;
}

async function createUser(info){
    const hashedPassword = await bcrypt.hash(info.password, 10);
    await pool.query(`INSERT INTO Users (first_name, last_name, email, hash) VALUES ($1, $2, $3, $4)`, [info.first_name, info.last_name, info.email, hashedPassword]);
}

module.exports = {
    validateEmail,
    createUser
}