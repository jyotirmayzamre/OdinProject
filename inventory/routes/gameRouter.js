const { Router } = require("express");
const gameRouter = Router();
const gameController = require("../controllers/gameController");



gameRouter.get('/', gameController.getAllGames);
gameRouter.get('/:id', gameController.getGame);

module.exports = gameRouter;
