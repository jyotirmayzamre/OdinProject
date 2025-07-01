const { Router } = require("express");
const genreRouter = Router();
const genreController = require("../controllers/genreController");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
})

const upload = multer({ storage });


genreRouter.get('/', genreController.getAllGenres);
genreRouter.get('/create', genreController.createForm);
genreRouter.post('/create', upload.fields([
    { name: 'image', maxCount: 1}
]), genreController.createGenre);
genreRouter.get('/:id', genreController.getGenre);


module.exports = genreRouter;