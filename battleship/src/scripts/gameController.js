const Player = require('./Player');

class gameController {
    constructor(){
        this.players = {'Human': new Player(), 'AI': new Player()}
        this.ships = [['Destroyer', 2], ['Submarine', 3], ['Cruiser', 3], ['Battleship', 4], ['Carrier', 5]]
        this.currIndex = 0;
    }

    reset(){
        this.players = {'Human': new Player(), 'AI': new Player()}
        this.ships = [['Destroyer', 2], ['Submarine', 3], ['Cruiser', 3], ['Battleship', 4], ['Carrier', 5]]
        this.currIndex = 0; 
    }

    /*
    Method to place the ship in an incremental fashion via event listeners
    */

    placeShip(x, y, ship, dir){
        try{
            this.players['Human'].board.placeWholeShip(x, y, ship, dir);
        } catch(err){
            throw err;
            
        }
        
    }

    
    /*
    Method for randomly placing ships on the board for the enemy grid
    */
    randomPlacing(){
        for(let i = 0; i < 5; i++){
            let placed = false;
            while(!placed){
                let x = Math.floor(Math.random() * 10);
                let y = Math.floor(Math.random() * 10);
                let dir = Math.random() <= 0.5 ? 'Horizontal' : 'Vertical';
                try{
                    this.players['AI'].board.placeWholeShip(x, y, this.ships[i][0], dir);
                    placed = true;
                } catch(error){  
                }
                
            }
            
            
        } 
        console.log(this.players['AI'].board)       
    }


    /*
    Method for running the game loop
    Setup the game boards, make Human the current player and attack based on input
    After each turn, check if the other player's ships are all sunk
    */

    humanMove(x, y){
        try{
            const val = this.players['AI'].board.receiveAttack(x, y);
            return val;
        } catch(error){
            throw error;
        } 
    }


    aiMove(){
        let attacked = false;
        let x, y, val;
        while(!attacked){
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            val = this.players['Human'].board.receiveAttack(x, y);
            attacked = true;
        }
        return { val: val, x: x, y: y };
    }

    

    checkSunk(player){
        if(this.players[player].board.allSunk()){
            return true;
        }
        return false;
    }

    
}

module.exports = gameController;