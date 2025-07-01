const { Router } = require("express");
const gameRouter = Router();
const gameController = require("../controllers/gameController");
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



gameRouter.get('/', gameController.getAllGames);
gameRouter.get('/create', gameController.gameForm);
gameRouter.post('/create', upload.fields([
    { name: "title", maxCount: 1},
    { name: "hero", maxCount: 1}
]), gameController.createGame);
gameRouter.get('/:id', gameController.getGame);


module.exports = gameRouter;
