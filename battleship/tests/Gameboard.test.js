const Gameboard = require('../src/scripts/Gameboard');

describe("Gameboard", ()=>{
    let board;

    beforeEach(()=>{
        board = new Gameboard();
    });


    describe("Constructor", ()=>{
        test("Testing the grid", ()=>{
            expect(board.grid).toHaveLength(10);
            for(let i=0; i < 10; i++){
                expect(board.grid[i]).toHaveLength(10);
                for(let j=0; j < 10; j++){
                    expect(board.grid[i][j]).toStrictEqual({ isShot: false, name: ''})
                }
            }
        })

        test("Testing remaining", ()=>{
            expect(board.remaining).toBe(5);
        });
    })

    describe("placeWholeShip method", ()=>{

        test.each([
            ['Destroyer'], ['Submarine'], ['Cruiser'], ['Battleship'], ['Carrier']
        ])('Placing each ship horizontally (correctly)', (ship)=>{
            board.placeWholeShip(0, 0, ship, 'Horizontal');
            const shipInstance = board.ships[ship];
            for(let i = 0; i < shipInstance.length; i++){
                expect(board.grid[0][0+i].name).toStrictEqual(ship);
            }
        })

        test.each([
            ['Destroyer'], ['Submarine'], ['Cruiser'], ['Battleship'], ['Carrier']
        ])('Placing each ship vertically (correctly)', (ship)=>{
            board.placeWholeShip(0, 0, ship, 'Vertical');
            const shipInstance = board.ships[ship];
            for(let i = 0; i < shipInstance.length; i++){
                expect(board.grid[0+i][0].name).toStrictEqual(ship);
            }
        })


        test("Out of bounds coordinates", ()=>{
            expect(() => board.placeWholeShip(-1, 0, 'Destroyer', 'Horizontal')).toThrow('Chosen coordinates are out of bounds');
            expect(() => board.placeWholeShip(11, 0, 'Destroyer', 'Horizontal')).toThrow('Chosen coordinates are out of bounds');
            expect(() => board.placeWholeShip(0, -1, 'Destroyer', 'Vertical')).toThrow('Chosen coordinates are out of bounds');
            expect(() => board.placeWholeShip(0, 11, 'Destroyer', 'Vertical')).toThrow('Chosen coordinates are out of bounds');
            expect(() => board.placeWholeShip(9, 0, 'Destroyer', 'Horizontal')).toThrow('Chosen coordinates are out of bounds');
            expect(() => board.placeWholeShip(0, 9, 'Destroyer', 'Vertical')).toThrow('Chosen coordinates are out of bounds');
            expect(() => board.placeWholeShip(6, 0, 'Carrier', 'Horizontal')).toThrow('Chosen coordinates are out of bounds');
            expect(() => board.placeWholeShip(0, 6, 'Destroyer', 'Vertical')).toThrow('Chosen coordinates are out of bounds');
        })

        test('Placing a ship in a taken cell', ()=>{
            expect(()=>{
                board.placeWholeShip(0, 0, 'Destroyer', 'Horizontal');
                board.placeWholeShip(0, 0, 'Carrier', 'Horizontal');
            }).toThrow('This cell already has a ship')

            expect(()=>{
                board.placeWholeShip(0, 0, 'Destroyer', 'Vertical');
                board.placeWholeShip(0, 0, 'Carrier', 'vertical');
            }).toThrow('This cell already has a ship')
        })
    })


    describe("receiveAttack method", ()=>{

        test("Out of bounds coordinates", ()=>{
            expect(() => board.receiveAttack(-1, 0)).toThrow('Chosen coordinates are out of bounds');
            expect(() => board.receiveAttack(11, 0)).toThrow('Chosen coordinates are out of bounds');
            expect(() => board.receiveAttack(0, -1)).toThrow('Chosen coordinates are out of bounds');
            expect(() => board.receiveAttack(0, 11)).toThrow('Chosen coordinates are out of bounds');
        });

        test("Hit a ship", ()=>{
            board.placeShip(0, 0, 'Destroyer');
            expect(board.receiveAttack(0, 0)).toStrictEqual({ result: true, ship: 'Destroyer' });
            expect(board.grid[0][0].isShot).toBe(true);
        })

        test("Sunk a ship", ()=> {
            board.placeShip(0, 0, 'Destroyer');
            board.placeShip(0, 1, 'Destroyer');
            board.receiveAttack(0, 0);
            board.receiveAttack(0, 1);
            expect(board.remaining).toBe(4);
        })

        test("Missed a ship", () => {
            expect(board.receiveAttack(0, 0)).toStrictEqual({ result: false, ship: ''});
        })

        test("Already attacked cell", ()=>{
            expect(()=>{
                board.placeShip(0, 0, 'Destroyer');
                board.receiveAttack(0, 0);
                board.receiveAttack(0, 0);
            }).toThrow('You have already attacked this cell. Try a different one.')
        })

    })

    describe("allSunk method", ()=>{
        test("Not all are sunk", ()=>{
            board.placeShip(0, 0, 'Destroyer');
            board.placeShip(0, 1, 'Destroyer');
            board.receiveAttack(0, 0);
            board.receiveAttack(0, 1);
            expect(board.allSunk()).toBe(false);
        });

        test("All ships are sunk", ()=>{
            board.placeShip(0, 0, 'Destroyer');
            board.placeShip(0, 1, 'Destroyer');
            console.log(board.grid);
            board.placeShip(1, 0, 'Submarine');
            board.placeShip(1, 1, 'Submarine');
            board.placeShip(1, 2, 'Submarine');
            board.placeShip(2, 0, 'Cruiser');
            board.placeShip(2, 1, 'Cruiser');
            board.placeShip(2, 2, 'Cruiser');
            board.placeShip(3, 0, 'Battleship');
            board.placeShip(3, 1, 'Battleship');
            board.placeShip(3, 2, 'Battleship');
            board.placeShip(3, 3, 'Battleship');
            board.placeShip(4, 0, 'Carrier');
            board.placeShip(4, 1, 'Carrier');
            board.placeShip(4, 2, 'Carrier');
            board.placeShip(4, 3, 'Carrier');
            board.placeShip(4, 4, 'Carrier');
            board.receiveAttack(0, 0);
            board.receiveAttack(0, 1);
            board.receiveAttack(1, 0);
            board.receiveAttack(1, 1);
            board.receiveAttack(1, 2);
            board.receiveAttack(2, 0);
            board.receiveAttack(2, 1);
            board.receiveAttack(2, 2);
            board.receiveAttack(3, 0);
            board.receiveAttack(3, 1);
            board.receiveAttack(3, 2);
            board.receiveAttack(3, 3);
            board.receiveAttack(4, 0);
            board.receiveAttack(4, 1);
            board.receiveAttack(4, 2);
            board.receiveAttack(4, 3);
            board.receiveAttack(4, 4);
            expect(board.allSunk()).toBe(true);
        })
    })

    
})