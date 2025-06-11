const Ship = require('./Ship')

class Gameboard {
    constructor(){
        this.grid = [];
        for(let i=0; i < 10; i++){
            let arr = [];
            for(let j=0; j < 10; j++){
                arr.push({isShot: false, name: ''})
            }
            this.grid.push(arr);
        }
        this.ships = {'Destroyer': new Ship(2), 'Submarine': new Ship(3), 'Cruiser': new Ship(3), 'Battleship': new Ship(4), 'Carrier': new Ship(5)};
        this.remaining = 5;
    }

    placeShip(x, y, name){

        //checking valid x and y
        if(x < 0 || x > 9 || y < 0 || y > 9){
            throw new Error("Chosen coordinates are out of bounds")
        }

        if(this.hasShip(x, y)){
            throw new Error("This cell already has a ship")
        }

        this.grid[y][x].name = name;
    }

    /*
    Method that will take the start spot of the ship and place it on the current player's gameBoard
    */
    placeWholeShip(x, y, shipName, dir){
        const length = this.ships[shipName].length;

        //pre-check boundary conditions
        for(let i = 0; i < length; i++){
            if(dir == 'Horizontal'){
                if(x+i > 9) throw new Error('Chosen coordinates are out of bounds')
                if(this.grid[y][x+i].name != '') throw new Error ('This cell already has a ship')
            } else{
                if(y+i > 9) throw new Error('Chosen coordinates are out of bounds')
                if(this.grid[y+i][x].name != '') throw new Error ('This cell already has a ship')
        }
        }

        //place the ship moving rightwards and downwards
        try{
            for(let i = 0; i < length; i++){
                if(dir == 'Horizontal'){
                    this.placeShip(x + i, y, shipName);
                }
                else if(dir == 'Vertical'){
                    this.placeShip(x, y + i, shipName);
                } 
            }
        } catch(error){
            throw error;
        }
    }

    hasShip(x, y){
        return (this.grid[y][x].name != '')
    }

    receiveAttack(x, y){

        //checking valid x and y
        if(x < 0 || x > 9 || y < 0 || y > 9){
            throw new Error("Chosen coordinates are out of bounds.")
        }

        let cell = this.grid[y][x];
        let sunk = false;

        /*
        Logic: if a cell is already shot, throw an error. 
        If a cell is not shot and a ship is hit, return { true, ship.name }. 
        If a cell is not shot and no ship is hit, return { false, '' }
        */

        if(cell.isShot){
            throw new Error("You have already attacked this cell. Try a different one.");
        } else{
            let shotShip = this.ships[cell.name]
            cell.isShot = true;
            if (cell.name == '') return { result: false, ship: '', sunk: sunk }
            else {
                shotShip.hit();
                if(shotShip.isSunk()){
                    this.remaining--;
                    sunk = true;
                }
                return { result: true, ship: cell.name, sunk: sunk };

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