const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');

async function emailCheck(email){
    const user = await prisma.user.findUnique({ where: { email }});
    return user != null;
}

async function createUser(email, password){
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
            documents: {
                create: {
                    name: 'root',
                    type: 'FOLDER',
                }
            }
        }
    })
    return user;
}


module.exports = {
    emailCheck,
    createUser
}