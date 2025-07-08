exports.getFolder = (req, res) => {
    res.render('folders', { user: req.user })
}