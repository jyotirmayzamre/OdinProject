const prisma = require('../config/prisma');

async function createFile(fileData, userId, parentId){
    await prisma.entity.create({
        data: {
            name: fileData.originalname,
            type: 'FILE',
            size: fileData.size,
            location: fileData.path,
            userId: userId,
            parentId: parentId
        }
    })
}

async function getFile(id, userId){
    const file = await prisma.entity.findUnique({
        where: { id: id, userId: userId },
        select: { name: true, size: true, timestamp: true},
    })
    return file;
}


module.exports = {
    createFile,
    getFile
}