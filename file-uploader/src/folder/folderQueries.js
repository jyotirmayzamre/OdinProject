const prisma = require('../config/prisma');

async function getRootFolderId(id){
    const folder = await prisma.entity.findFirst({ where: { userId: id, name: "root", type: "FOLDER" }});
    return folder.id;
}

async function createFolder(userId, name, parentId){
    await prisma.entity.create({
        data: {
            name: name,
            type: 'FOLDER',
            user: {
                connect: { id: userId }
            },
            parent: {
                connect: { id: parentId }
            }
        }
    })
}


module.exports = {
    getRootFolderId,
    createFolder
}