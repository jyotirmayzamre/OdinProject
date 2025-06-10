const Ship = require('./Ship')

class Gameboard {
    constructor(){
        this.grid = Array.from({length: 10}, () => Array(10).fill({isShot: false, name: ''}));
        this.ships = {'Destroyer': new Ship(2), 'Submarine': new Ship(3), 'Cruiser': new Ship(3), 'Battleship': new Ship(4), 'Carrier': new Ship(5)};
        this.remaining = 5;
    }

    placeShip(x, y, name){

        //checking valid x and y
        if(x < 0 || x > 9 || y < 0 || y > 9){
            throw new Error("Chosen coordinates are out of bounds")
        }

        if(this.grid.hasShip(x, y)){
            throw new Error("This cell already has a ship")
        }

        this.grid[y][x].name = name;
    }

    hasShip(x, y){
        return (this.grid[y][x] != '')
    }

    receiveAttack(x, y){

        //checking valid x and y
        if(x < 0 || x > 9 || y < 0 || y > 9){
            throw new Error("Chosen coordinates are out of bounds")
        }

        let cell = this.grid[y][x];

        /*
        Logic: if a cell is already shot, throw an error. 
        If a cell is not shot and a ship is hit, return { true, ship.name }. 
        If a cell is not shot and no ship is hit, return { false, '' }
        */

        if(cell.isShot){
            throw new Error("You have already attacked this cell. Try a different one.");
        } else{
            let shotShip = this.ships[cell.name]
            if (shotShip == '') return { result: false, ship: ''}
            else {
                shotShip.hit();
                if(shotShip.isSunk()){
                    this.remaining--;
                }
                return { result: true, ship: cell.name };

            }
        }
    }

    allSunk(){
        if(this.remaining == 0){
            return true;
        }
        return false;
    } 
        
}

module.exports = Gameboard;