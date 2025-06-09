const Ship = require('./Ship')

class Gameboard {
    constructor(){
        this.grid = Array.from({length: 10}, () => Array(10).fill({isShot: false, name: ''}));
        this.ships = {'Destroyer': new Ship(2), 'Submarine': new Ship(3), 'Cruiser': new Ship(3), 'Battleship': new Ship(4), 'Carrier': new Ship(5)};
        this.remaining = 5;
    }

    placeShip(x, y, name){
        this.grid[y][x].name = name;
    }

    receiveAttack(x, y){
        let cell = this.grid[y][x];
        if(!cell.isShot){
            let shotShip = this.ships[cell.name];
            shotShip.hit();

            if(shotShip.isSunk()){
                this.remaining--;
                //call dom method for sunk ship
            }
            return true;
        }
        //dom method for handling missed attack
        return false;
    }

    allSunk(){
        if(this.remaining == 0){
            //dom method to handle game over
            return true;
        }
        return false;
    } 
        
}

module.exports = Gameboard;