//

const Ship = require('./Ship')

class Gameboard {
    constructor(){
        this.grid = Array.from({length: 10}, () => Array(10).fill(null));
        this.ships = {'Destroyer': new Ship(2), 'Submarine': new Ship(3), 'Cruiser': new Ship(3), 'Battleship': new Ship(4), 'Carrier': new Ship(5)}

    }

    placeShip(x, y, ship){

    }

    receiveAttack(x, y){

    }
}