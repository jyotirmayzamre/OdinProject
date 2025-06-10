const Player = require('./Player');

class gameController {
    constructor(){
        this.players = {'Human': new Player(), 'AI': new Player()}
        this.currPlayer = 'Human';
    }

    /*
    Temporary Method to allow board setting via input. Will be changed once I start making the DOM
    */
    promptInput(ship){
        const length = this.players['Human'].board.ships[ship]
        let placed = false;
        while(!placed){
            const x = parseInt(prompt(`Enter X coordinate to place ${ship} which has length ${length}`));
            const y = parseInt(prompt(`Enter Y coordinate to place ${ship} which has length ${length}`));
            const dir = prompt(`Enter direction: Horizontal or Verticalfor ${ship} which has length ${length}`);
            this.players['Human'].board.placeWholeShip(x, y, ship, dir);
            placed = true;
        }

    }

    /*
    Method for randomly placing ships on the board for the enemy grid
    */
    randomPlacing(ship){
        let placed = false;

        while(!placed){
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            let dir = Math.floor(Math.random()) == 0 ? 'Horizontal' : 'Vertical';
            this.players['AI'].board.placeWholeShip(x, y, ship, dir);
            placed = true;
        }
    }

    /*
    Method that will loop through the ships, take input from the user and then place the ships
    */
    setBoard(player){
        //if Player is human, then use prompting
        for(const name in this.players[player].board.ships){
            if(player == 'Human'){
                this.promptInput(name);
            } else{
                this.randomPlacing(name);
            }
        }
    }


    /*
    Method for running the game loop
    Setup the game boards, make Human the current player and attack based on input
    After each turn, check if the other player's ships are all sunk
    */

    humanMove(){
        try{
            x = parseInt(prompt('Enter an x coordinate for attack: '));
            y = parseInt(prompt('Enter a y coordinate for attack: '));
            val = this.players['AI'].board.receiveAttack(x, y);
            return val;
        } catch(error){
            console.log(error.message);
            alert(error.message);
        } 
    }


    aiMove(){
        try{
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            val = this.players['Human'].board.receiveAttack(x, y);
            return val;
        } catch(error){
            console.log(`AI error: ${error.message}`)
        }
    }

    logResult(player, val){
        switch(player){
            case 'Human':
                if(val.result){
                    console.log(`Your attack was a hit. You have hit the opponent's ${val.ship}`);
                } else{
                    console.log(`Your attack was a miss...`);
                }
                break;
            case 'AI':
                 //check result of attack
                if(val.result){
                    console.log(`The opponent's attack was a hit. Your ${val.ship} has been hit`);
                } else{
                    console.log(`The opponent's attack was a miss...`);
                }
                break;
            default:
                break;
        }
    }

    checkSunk(player){
        if(this.players[player].board.allSunk()){
            alert(`The game is over. ${player}'s ships have been sunk`)
            return true;
        }
        return false;
    }

    game(){
        this.setBoard('Human');
        this.setBoard('AI');

        let currPlayer = 'Human';

        run = true;
        let val;

        while(run){
            if(currPlayer == 'Human'){
                let human = false;
                while(!human){
                    val = humanMove();
                    human = true;
                }

            } else {
                let AI = false;
                while(!AI){
                    val = aiMove();
                    AI = true;
                }
            }

            this.logResult(currPlayer, val);
            currPlayer = currPlayer == 'Human' ? 'AI' : 'Human';
            run = this.checkSunk(currPlayer)
        }
        
    }

}

module.exports = gameController;