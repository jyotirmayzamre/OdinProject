const container = document.getElementById('gridContainer');
const resetBtn = document.getElementById('reset');

function createGrid(){
    for(let i=0; i < 256; i++){
        let gridSquare = document.createElement('div');
        gridSquare.classList.add('gridSquare');
        container.appendChild(gridSquare);
    }
}

container.addEventListener('mouseover', (e) => {
    e.target.classList.add('change')
})



createGrid();