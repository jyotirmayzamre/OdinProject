import Node from "./node";

export default class HashMap {
    constructor(){
        this.loadFactor = 0.75;
        this.buckets = new Array(16).fill(null);
        this.capacity = this.buckets.length;
        this.occupied = 0;
    }

    hash(key){
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    resize(){
        const old = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null);
        this.occupied = 0;
        old.forEach((bucket) => {
            let curr = bucket;
            while(curr){
                this.set(curr.key, curr.value);
                curr = curr.next;
            }
        })
    }

    //if the key is there, find it and overwrite the value
    //else add to LL
    set(key, value){
        if(this.occupied / this.capacity >= this.loadFactor) this.resize();

        const bucket = this.hash(key);
        if(this.has(key)){
            let curr = this.buckets[bucket];
            while(curr.key !== key) curr = curr.next;
            curr.value = value;
        } else{
            const newNode = new Node(key, value);
            if(this.buckets[bucket]){
                let curr = this.buckets[bucket];
                while(curr.next) curr = curr.next;
                curr.next = newNode;
            } else{
                this.occupied++;
                this.buckets[bucket] = newNode;
            }
        }

    }

    get(key){
        const bucket = this.hash(key);
        let curr = this.buckets[bucket];
        while(curr && curr.key != key){
            curr = curr.next;
        }
        if(!curr) return null;
        return curr.key;
    }

    has(key){
        const bucket = this.hash(key);
        let curr = this.buckets[bucket];
        while(curr && curr.key != key){
            curr = curr.next;
        }
        if(!curr) return false;
        return true;
    }

    remove(key){
        if(!this.has(key)){
            return;
        } else{

        }
    }

    length(){
        let sum = 0;
        this.buckets.forEach((bucket)=>{
            let curr = bucket;
            while(curr){
                sum += 1;
                curr = curr.next;
            }
        })
        return sum;
    }

    remove(key){
        if(!this.has(key)){
            return false;
        } else{
            const bucket = this.hash(key);
            let curr = this.buckets[bucket];
            let prev;
            while(curr && curr.key != key){
                prev = curr;
                curr = curr.next;
            }
            if(!prev && !curr.next){
                this.occupied--;
                this.buckets[bucket] = curr.next;
            } else if (!prev){
                this.buckets[bucket] = curr.next;
            } else{
                prev.next = curr.next;
            }
            return true;

        }
    }

    clear(){
        this.buckets = new Array(16).fill(null);
        this.occupied = 0;
    }

    keys(){
        let list = []
        this.buckets.forEach((bucket)=>{
            let curr = bucket;
            while(curr){
                list.push(curr.key);
                curr = curr.next;
            }
        })
        return list;
    }

    values(){
        let list = []
        this.buckets.forEach((bucket)=>{
            let curr = bucket;
            while(curr){
                list.push(curr.value);
                curr = curr.next;
            }
        })
        return list;
    }

    entries(){
        let list = []
        this.buckets.forEach((bucket)=>{
            let curr = bucket;
            while(curr){
                list.push([curr.key, curr.value]);
                curr = curr.next;
            }
        })
        return list;
    }


}