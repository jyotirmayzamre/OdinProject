const { Router } = require("express");
const genreRouter = Router();
const genreController = require("../controllers/genreController")


genreRouter.get('/', genreController.getAllGenres);
genreRouter.get('/:id', genreController.getGenre)

module.exports = genreRouter;