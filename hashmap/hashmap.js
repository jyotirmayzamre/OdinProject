export default class HashMap {
    constructor(){
        this.loadFactor = 0.75;
        this.buckets = new Array(16).fill(null);
        this.capacity = this.buckets.length;
    }

    hash(key){
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value){
        
    }


}