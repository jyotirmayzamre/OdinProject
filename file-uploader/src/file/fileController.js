const queries = require('./fileQueries');
const folderQueries = require('../folder/folderQueries')

exports.createFile = async (req, res) => {
    const fileData = req.file;
    const userId = req.user.id;
    const parentId = req.query.parent === undefined ? await folderQueries.getRootFolderId(userId) : Number(req.query.parent);
    await queries.createFile(fileData, userId, parentId);
    if(req.query.parent === undefined){
        res.redirect('/folder')
    } else{
        res.redirect(`/folder/${req.query.parent}`)
    }
}

exports.getFile = async (req, res) => {
    const id = Number(req.params.id);
    const userId = req.user.id;
    const data = await queries.getFile(id, userId);
    res.json({
        name: data.name,
        size: data.size,
        timestamp: data.timestamp
    })
}