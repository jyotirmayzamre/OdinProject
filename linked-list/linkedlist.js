import Node from "./node";

export default class LinkedList {
    constructor() {
        this.headList = null;
    }

    //prepend
    prepend(value){
        if(this.headList){
            let tmp = new Node(value);
            tmp.nextNode = this.headList;
            this.headList = tmp;
        } else{
            this.head = new Node(value);
        }
    }

    //append
    append(value){
        if(this.headList == null){
            this.headList = new Node(value);
        } else{
            let temp = this.headList;
            while(temp.nextNode){
                temp = temp.nextNode;
            }
            temp.nextNode = new Node(value); 
        }
    }

    //size
    size(){
        let num = 0;
        let temp = this.headList;
        while(temp.nextNode){
            temp = temp.nextNode;
            num++
        }
        return num;
    }

    head(){
        return this.headList;
    }

    tail(){
        let temp = this.headList;
        while(temp.nextNode){
            temp = temp.nextNode;
        }
        return temp;
    }

    at(index){
        let temp = this.headList;

        for(let i = 0; i < index; i++){
            temp = temp.nextNode;
            if (!temp){
                return "Out of bounds"
            }
        }
        return temp;

    }

    pop(){
        let temp = this.headList;
        let prev;
        while(temp.nextNode){
            prev = temp;
            temp = temp.nextNode;
        }
        prev.nextNode = null;
    }

    contains(val){
        let temp = this.headList;
        while(temp){
            if(temp.value == val){
                return true;
            }
        }
        return fakse;
    }

    find(val){
        let num = 0;
        let temp = this.headList;
        while(temp){
            if(temp.value == val){
                return num;
            }
            num++;
            temp = temp.nextNode;
        }
        return null;
    }

    toString(){
        let temp = this.headList;
        let string = "";
        while (temp){
            string += `(${temp.value}) -> `;
            temp = temp.nextNode;
        }
        return (string += 'null');
    }


}