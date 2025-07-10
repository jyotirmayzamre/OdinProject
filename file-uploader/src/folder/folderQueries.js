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
    const locs = getChildrenFiles(folderId);
    await prisma.entity.delete({ where: { id: folderId }});
    return locs;
}

async function getChildrenFiles(folderId){
    const locs = await prisma.$queryRawUnsafe(`
        WITH RECURSIVE folder_tree AS (
            SELECT id
            FROM "entities"
            WHERE id = ${folderId} AND type = 'FOLDER'

            UNION ALL

            SELECT e.id
            FROM "entities" e
            INNER JOIN folder_tree ft ON e."parentId" = ft.id
            WHERE e.type = 'FOLDER'
        )
            SELECT location
            FROM "entities"
            WHERE type = 'FILE' AND "parentId" IN (SELECT id FROM folder_tree);        
    `)
    return locs;
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
    getFolder,
}