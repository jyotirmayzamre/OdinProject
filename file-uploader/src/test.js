const prisma = require('./config/prisma');

async function test(){
    const folder = await prisma.entity.findFirst({
        where: {
            userId: 1,
            name: "root",
            type: 'FOLDER'
        }
    })
    console.log(folder);
}

test()