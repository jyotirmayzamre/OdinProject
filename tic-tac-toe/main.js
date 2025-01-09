//gameboard object
//methods - getBoard, getSpotsLeft, placeMove, checkWin

function GameBoard(){
    const rows = 3;
    const columns = 3;
    const board = [];
    let spotsLeft = 9;

    //create game board
    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(Cell());
        }

    }

    //method of getting the board
    const getBoard = () => board;

    //method of getting the spots left
    const getSpotsLeft = () => spotsLeft;

    //method of placing a move
    const placeMove = (row, col, player) =>{
        if(board[row][col].addMove(player)){
            spotsLeft--;
            return true;
        }
        return false;
    }

    //method for checking a win
    const checkWin = (row, col) => {

    }

    
    return { getBoard, getSpotsLeft, placeMove, checkWin };
}

//Cell object for representing a spot
//methods - getMove, addMove

function Cell() {
    let value = 0;

    const getValue = () => value;

    //method to add a move on the board
    //returns false if the move wasn't successful (placing in a filled square)
    const addMove = (player) => {
        if(getValue() === 0){
            value = player;
            return true;
        } else{
            return false;
        }
    }

    return { getValue, addMove };
}


//game controller object
//methods - playRound, getactiveplayer, switchTurn, playGame

function Controller(p1Name, p2Name){
    const board = GameBoard();

    const players = [
        {
            name: p1Name,
            id: 1
        },
        {
            name: p2Name,
            id: 2
        }
    ]

    let activePLayer = players[0];

    //switch the turns
    const switchTurn = () => {
        activePLayer = activePLayer === players[0] ? players[1] : players[0];
    }

    //get the current active player
    const getActivePlayer = () => activePLayer;

    //method to play a single round - if placeMove is a success check winning conditions, else need to alert that incorrect position
    const playRound = () => {
        const row = prompt('Enter the row number');
        const col = prompt('Enter the column number');
        if(board.placeMove(row, col, getActivePlayer().id)){
            return board.checkWin();
        } else{
            //some functionality in UI to say the spot is taken
            return null;
        }
    }

    //method to play a full game
    const playGame = () => {
        let res = 0;
        while(board.getSpotsLeft() !== 0){
            res = playRound();
            if(res === null){continue;}
            if(res !== 0){return res};
            switchTurn();
        }
        return res;

    }

    return { playGame };
}

const gameController = Controller();
gameController.playGame();




