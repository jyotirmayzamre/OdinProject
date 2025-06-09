export const domManager = (function() {
    const startGame = () => {
        const main = document.querySelector('main');


        const side1 = document.createElement('div');
        side1.className = 'container';

        const head1 = document.createElement('h1');
        head1.textContent = 'Friendly Waters';

        const grid1 = document.createElement('div');
        grid1.className = 'grid'


        const side2 = document.createElement('div');
        side2.className = 'container';

        const head2 = document.createElement('h1');
        head2.textContent = 'Enemy Waters';

        const grid2 = document.createElement('div');
        grid2.className = 'grid';

        for(let i=0; i < 100; i++){
            let cell1 = document.createElement('div');
            cell1.className = 'cell';

            let cell2 = document.createElement('div');
            cell2.className = 'cell';

            grid1.appendChild(cell1);
            grid2.appendChild(cell2);
        }

        side1.appendChild(head1);
        side1.appendChild(grid1);

        side2.appendChild(head2);
        side2.appendChild(grid2);

    
        main.appendChild(side1);
        main.appendChild(side2);
       

        
    }

    return { startGame };
})();