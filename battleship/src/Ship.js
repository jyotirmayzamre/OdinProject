class Ship {
    constructor(length){
        this.length = length;
        this.hitNum = 0;
        this.sunk = false;
    }

    hit(){
        if(this.hitNum >= this.length){
            return;
        }
        this.hitNum++;
    }

    isSunk(){
        if(this.hitNum == this.length){
            this.sunk = true;
            return true;
        }
        return false;
    }

}

module.exports = Ship;