const queries = require('./folderQueries');

exports.getRoot = async (req, res) => {
    const rootId = await queries.getRootFolderId(req.user.id);
    const children = await queries.getFolder(rootId);
    res.render('folders', { user: req.user, children: children })
}

exports.createFolder = async (req, res) => {
    const userId = req.user.id;
    const { name } = req.body;
    const currFolder = req.query.parent === undefined ? await queries.getRootFolderId(userId) : req.query.parent
    await queries.createFolder(userId, name, currFolder);
    if(req.query.parent === undefined){
        res.redirect('/folder')
    } else{
        res.redirect(`/folder/${req.query.parent}`)
    }
}

exports.deleteFolder = async (req, res) => {
    const folderId = req.params.id;
    await queries.deleteFolder(folderId);
    res.redirect('/folder');
}

exports.getFolder = async (req, res) => {
    const folderId = Number(req.params.id);
    const children = await queries.getFolder(folderId);
    res.render('folderPage', { children: children, id: req.params.id });
}