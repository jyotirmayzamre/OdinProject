const prisma = require('../config/prisma');

//query to create a new user with a root folder
async function createUser(email, password){
    const user = await prisma.user.create({
            data: {
                email: email,
                password: password,
                documents: {
                    create: {
                        type: 'FOLDER',
                        name: 'root',
                    }
                }
            }
        })
}





module.exports = {
    createUser
}