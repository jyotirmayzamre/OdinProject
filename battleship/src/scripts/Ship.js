class Ship {
    constructor(length){
        this.length = length;
        this.hitNum = 0;
        this.sunk = false;
    }

    hit(){
        if(!this.sunk){
            this.hitNum++;
        }
        
    }

    isSunk(){
        if(this.hitNum == this.length){
            this.sunk = true;
        }
        return this.sunk;
    }

}

module.exports = Ship;