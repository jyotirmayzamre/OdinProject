const startGame = document.getElementById('submit-form');
const playerForm = document.querySelector('form');
const dialog = document.querySelector('dialog');

startGame.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
    const formData = new FormData(playerForm);
    const display = DOMController(formData.get('player1'), formData.get('player2')); 
})


function checkEqual(a, b, c){
    return (a === b) && (b === c) && (a === c);
}


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

    //function for checking rows
    const checkRow = (row) => {
        if(board[row][0].getValue() === 0){false;}
        return checkEqual(board[row][0].getValue(), board[row][1].getValue(), board[row][2].getValue());
    }

    //function for checking columns
    const checkCol = (col) => {
        if(board[0][col].getValue() === 0){return false;}
        return checkEqual(board[0][col].getValue(), board[1][col].getValue(), board[2][col].getValue());
    }

    //function for checking diagonals
    const checkDiag = (row, col) => {
        if ((row + col) % 2 !== 0){return false;}
        const diag1 = () => checkEqual(board[0][0].getValue(), board[1][1].getValue(), board[2][2].getValue());
        const diag2 = () => checkEqual(board[0][2].getValue(), board[1][1].getValue(), board[2][0].getValue());
        let res1, res2;

        if(row === col){
            res1 = diag1();
            if (row === 1){
                res2 = diag2();
                return (res1 && res2);
            }
            return res1; 
        } else{
            res2 = diag2();
            return res2; 
        }
    }

    //method for checking a win
    const checkWin = (row, col) => {
        console.log(getBoard());
        return (checkRow(row) || checkCol(col) || checkDiag(row, col));

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
            id: 1,
            icon: 'X'
        },
        {
            name: p2Name,
            id: 2,
            icon: 'O'
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
    const playRound = (row, col) => {
        if(board.placeMove(row, col, getActivePlayer().id)){
            if(board.checkWin(row, col)){
                return `${getActivePlayer().name} has won!`
            } else{
                if(board.getSpotsLeft() === 0){
                    return 'It is a draw!'
                } else{
                    switchTurn();
                    return `It is now ${getActivePlayer().name}'s turn.`
                }
            }
        } else{
            return 'That spot is already used! Please use a different spot'
        }
    }

    return { getActivePlayer, playRound, switchTurn };
}

function DOMController(p1, p2){
    const gameController = Controller(p1, p2);

    const tileContainer = document.getElementById('tile-container');
    const result = document.getElementById('results');

    tileContainer.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON'){
            e.target.textContent = gameController.getActivePlayer().icon;
            let res = gameController.playRound(parseInt(e.target.dataset.row), parseInt(e.target.dataset.col));
            result.textContent = res;
            
        }
    })    


}



