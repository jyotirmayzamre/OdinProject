const gameController = require('./gameController');


export const domManager = (function() {
    const Controller = new gameController();
    let dir = 'Horizontal';
    
    /*
    Method to initially render the boards
    */
    const renderBoards = () => {
        const friendlyGrid = document.getElementById('friendly');
        friendlyGrid.addEventListener('click', placeFriendlyShip);
        const enemyGrid = document.getElementById('enemy');
        enemyGrid.addEventListener('click', attackEnemy);

        const buttonContainer = document.querySelector('.dir');
        buttonContainer.addEventListener('click', directionButton);


        while(friendlyGrid.firstChild && enemyGrid.firstChild){
            friendlyGrid.removeChild(friendlyGrid.firstChild);
            enemyGrid.removeChild(enemyGrid.firstChild);
        }

        for(let j = 0; j < 10; j++){
            for(let i = 0; i < 10; i++){
                let cell1 = document.createElement('div');
                cell1.className = 'cell friendly wait';
                cell1.dataset.x = i;
                cell1.dataset.y = j;

                let cell2 = document.createElement('div');
                cell2.className = 'cell enemy';
                cell2.dataset.x = i;
                cell2.dataset.y = j;

                friendlyGrid.appendChild(cell1);
                enemyGrid.appendChild(cell2);
            }
        }

        const result = document.getElementById('result');
        result.textContent = `Place your ${Controller.ships[0][0]}. It has length ${Controller.ships[0][1]}.`;
    }


    /*
    Method for placing ships on click of friendly cell
    */

    const placeFriendlyShip = (e) => {
        const result = document.getElementById('result');
        let clicked = null;
        if(e.target.classList.contains('cell')){
            clicked = e.target;
           
        } else return;


        try{
            Controller.placeShip(parseInt(clicked.dataset.x), parseInt(clicked.dataset.y), Controller.ships[Controller.currIndex][0], dir);
            updateShipPlaced(parseInt(clicked.dataset.x), parseInt(clicked.dataset.y), Controller.ships[Controller.currIndex][1], dir)
            Controller.currIndex++;
            if(Controller.currIndex <= 4){
                result.textContent = `Place your ${Controller.ships[Controller.currIndex][0]}. It has length ${Controller.ships[Controller.currIndex][1]}.`;
            } else{
                disable();
                Controller.randomPlacing();
                result.textContent = 'Pick a cell to attack on the enemy grid!'
            }
        } catch(error){
            result.textContent = error.message + ' Try again.';
        }

        
    }

    const disable =() =>{
        const grid = document.getElementById('friendly');
        grid.removeEventListener('click', placeFriendlyShip);
        for(let node of grid.childNodes){
            node.classList.remove('wait');
        }

        const buttonContainer = document.querySelector('.dir');
        buttonContainer.removeEventListener('click', directionButton);
    }

    const directionButton = (e) => {
        if(e.target.tagName === 'BUTTON'){
            if(e.target.id == 'horizontal'){
                
                dir = 'Horizontal';
                e.target.classList.add('pressed');
                const vertical = document.getElementById('vertical');
                if(vertical.classList.contains('pressed')){
                    vertical.classList.remove('pressed')
                }
                
            } else {
                dir = 'Vertical';
                e.target.classList.add('pressed');
                const horizontal = document.getElementById('horizontal');
                if(horizontal.classList.contains('pressed')){
                    horizontal.classList.remove('pressed');
                }
                
            }
        }
        
        
    }


    /*
    Method for updating the board cells after ship is placed
    */

    const updateShipPlaced = (x, y, length, dir) => {
        let elem;
        for (let i = 0; i < length; i++){
            if(dir == 'Horizontal'){
                elem = document.querySelector(`[data-x="${x+i}"][data-y="${y}"].friendly`);
                
            } else{
                elem = document.querySelector(`[data-x="${x}"][data-y="${y+i}"].friendly`);
            }
            elem.textContent = 'S';
            elem.classList.add('placed');
        }
    }


    /*
    Method to attack enemy board, will only fire the event for non-shot cells
    Once player's attack is done, the AI will attack and return results accordingly.
    Based on Controller.allSunk(), show a popUp that says the game is over. add a button for reset that calls render board again.
    */
    const attackEnemy = (e) => {
        const clicked = e.target;
        if(!clicked.classList.contains('shot')){
            const result = document.getElementById('result');

            //human Move
            try {
                const val = Controller.humanMove(clicked.dataset.x, clicked.dataset.y);
                if(val.result){
                    result.textContent = `Your attack was a hit. You have hit the opponent's ${val.ship}.`;
                    if(val.sunk) result.textContent += ` The ${val.ship} was sunk!`
                    clicked.textContent = 'X';
                    
                } else{
                   result.textContent =  `Your attack was a miss...`;
                   clicked.textContent = '•';
                }

                clicked.classList.add('shot');

                if(Controller.checkSunk('AI')){
                    //open dialog with reset button
                    return;
                }
            } catch(error){
                result.textContent = error.message;
            }

            //AI move
            const val = Controller.aiMove();
            const cell = document.querySelector(`[data-x="${val.x}"][data-y="${val.y}"].friendly`)
            if(val.val.result){
                result.textContent = `The AI's attack was a hit. Your ${val.val.ship} has been hit.`;
                cell.textContent = 'X';
                if(val.val.sunk) result.textContent += ` Your ${val.val.ship} was sunk!`;
            }
            else{
                result.textContent = 'The AI"s attack missed';
                cell.textContent = '•';
            }
            cell.style.backgroundColor = '#ff3c3c99'

            if(Controller.checkSunk('Human')){
                //open dialog with reset button
                return;
            }

            result.textContent = 'Pick a cell to attack the enemy grid';

        }
    }

    return { renderBoards };

})();