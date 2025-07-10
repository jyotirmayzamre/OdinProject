const queries = require('./fileQueries');
const folderQueries = require('../folder/folderQueries')
const fs = require('fs');
const path = require('path');

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

//removed user id from call
exports.getFile = async (req, res) => {
    const id = Number(req.params.id);
    //const userId = req.user.id;
    const data = await queries.getFile(id);
    res.json({
        name: data.name,
        size: data.size,
        timestamp: data.timestamp,
        location: data.location
    })
}

//removed user id from call
exports.deleteFile = async (req, res) => {
    const id = Number(req.params.id);
    //const userId = req.user.id;
    const filePath = await queries.deleteFile(id);
    const loc = path.join(__dirname, '../..',  filePath);
    fs.unlink(loc, (error)=> console.error(error));

    if(req.query.parent === undefined){
        res.redirect('/folder')
    } else{
        res.redirect(`/folder/${req.query.parent}`)
    }
}