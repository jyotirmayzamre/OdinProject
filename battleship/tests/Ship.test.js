const Ship = require("../src/scripts/Ship");

describe('Ship', () => {

    test.each([
        [2],[3],[4],[5]
    ])('Initialize the ship', (length)=>{
        const ship = new Ship(length);
        expect(ship.length).toBe(length);
        expect(ship.hitNum).toBe(0);
        expect(ship.sunk).toBe(false);
    });

    test.each([
        [2], [3], [4], [5]
    ])('Testing isSunk function', (length)=>{
        const ship = new Ship(length);
        for(let i=0; i < length; i++){
            ship.hit();
        }
        ship.isSunk();
        expect(ship.sunk).toBe(true);
    })
})