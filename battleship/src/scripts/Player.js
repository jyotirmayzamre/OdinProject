const Gameboard = require('./Gameboard');

class Player{
    constructor(type){
        this.type = type;
        this.board = Gameboard();
    }
}