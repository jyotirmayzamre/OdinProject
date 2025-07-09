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
                connect: { id: Number(userId) }
            },
            parent: {
                connect: { id: Number(parentId) }
            }
        }
    })
}

async function deleteFolder(folderId){
    await prisma.entity.delete({ where: { id: folderId }});
}

async function getFolder(folderId){
    const children = await prisma.entity.findMany({
        where: { parentId: folderId },
        select: { id: true, name: true, type: true, timestamp: true }
    })
    return children;
}


module.exports = {
    getRootFolderId,
    createFolder,
    deleteFolder,
    getFolder
}