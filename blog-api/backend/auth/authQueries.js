const prisma = require('../prisma/client');
const bcrypt = require('bcryptjs')


async function emailCheck(email){
    const user = await prisma.user.findUnique({ where: { email }});
    return user != null;
}

async function createUser(email, password){
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword
        }
    })
    return user;
}

module.exports = {
    emailCheck,
    createUser
}