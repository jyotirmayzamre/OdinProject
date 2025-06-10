const Gameboard = require('./Gameboard');

class Player{
    constructor(){
        this.board = new Gameboard();
    }
}

module.exports = Player