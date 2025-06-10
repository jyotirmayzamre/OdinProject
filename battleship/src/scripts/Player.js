const Gameboard = require('./Gameboard');

class Player{
    constructor(){
        this.board = Gameboard();
    }
}

module.exports = Player