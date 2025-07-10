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

//removed userId
async function getFile(id){
    const file = await prisma.entity.findUnique({
        where: { id: id, type: 'FILE' },
        select: { name: true, size: true, timestamp: true, location: true },
    })
    return file;
}

//removed userId
async function deleteFile(id){
    const file = await prisma.entity.delete({
        where: {
            id: id,
            type: 'FILE'
        }
    })
    return file.location;
}


module.exports = {
    createFile,
    getFile,
    deleteFile
}