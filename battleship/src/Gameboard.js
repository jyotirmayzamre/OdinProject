//

const Ship = require('./Ship')

class Gameboard {
    constructor(){
        this.grid = Array.from({length: 10}, () => Array(10).fill({isShot: false, name: ''}));
        this.ships = {'Destroyer': new Ship(2), 'Submarine': new Ship(3), 'Cruiser': new Ship(3), 'Battleship': new Ship(4), 'Carrier': new Ship(5)}
        this.missedAttacks = [];
    }

    placeShip(x, y, name){
        this.grid[y][x].name = name;
    }

    receiveAttack(x, y){
        let cell = this.grid[y][x];
        if(!cell.isShot){
            let shotShip = this.ships[cell.name];
            shotShip.hit();
            return true;
        }
        this.missedAttacks.push([x, y]);
        return false;
    }

    allSunk(){
        for(let key of Object.keys(this.ships)){
            if(!this.ships[key].isSunk()) return false;
        }
        return true;
    }

    

    
        
}