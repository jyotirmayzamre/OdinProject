const container = document.getElementById('gridContainer');
const resetBtn = document.getElementById('reset');
const resizeBtn = document.getElementById('resize')

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
    e.target.classList.add('change')
})

resetBtn.addEventListener('click', () => {
    container.childNodes.forEach((square) => {
        square.classList.remove('change');
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