const queries = require('./folderQueries');

exports.getFolder = (req, res) => {
    res.render('folders', { user: req.user })
}

exports.createFolder = async (req, res) => {
    const userId = req.user.id;
    const { name } = req.body;
    const currFolder = req.params.id === undefined ? await queries.getRootFolderId(userId) : req.params.id;
    await queries.createFolder(userId, name, currFolder);
    res.redirect('/folder');
}