//gameboard object
//methods - getBoard, placeMove

function GameBoard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    //create game board
    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(Cell());
        }

    }

    //method of getting the board
    const getBoard = () => board;

    //method of placing a move
    const placeMove = (row, col, player) => {
        board[row][col].addMove(player);
    }
    
    return { getBoard, placeMove };
}

//Cell object for representing a spot
//methods - getMove, addMove

function Cell() {
    let value = 0;

    const getMove = () => value;

    //method to add a move on the board
    //returns false if the move wasn't successful (placing in a filled square)
    const addMove = (player) => {
        if(value === 0){
            value = player;
            return true;
        } else{
            return false;
        }
    }
}


