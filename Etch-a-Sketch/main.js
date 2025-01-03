const container = document.getElementById('gridContainer');
const resetBtn = document.getElementById('reset');
const resizeBtn = document.getElementById('resize');
const modeBtn = document.getElementById('mode');
let mode = 'normal';

function createGrid(size){
    for(let i=0; i < size * size; i++){
        let gridSquare = document.createElement('div');
        gridSquare.classList.add('gridSquare');
        gridSquare.style.width = `calc(100% / ${size})`;
        gridSquare.style.height = `calc(100% / ${size})`;
        container.appendChild(gridSquare);
    }
}

container.addEventListener('mouseover', (e) => {
    const first = Math.floor(Math.random() * 256);
    const second = Math.floor(Math.random() * 256);
    const third = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${first}, ${second}, ${third})`;
})

resetBtn.addEventListener('click', () => {
    container.childNodes.forEach((square) => {
        square.style.backgroundColor = 'white';
    })
})

resizeBtn.addEventListener('click', () => {
    while(container.lastElementChild){
        container.removeChild(container.lastElementChild);
    }
    let size = prompt('Given an NxN grid, give your preferred value of N (max grid size is 100x100)')
    createGrid(size);
})


createGrid(16);