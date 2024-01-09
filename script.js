class Node{
    constructor(key,value = null, next = null){
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

class HashMap{
    constructor() {
        this.bucketsArray = new Array(16).fill(null);
        this.loadFactor = 0.75;
        this.capacity = this.bucketsArray.length;
    }
    checkLoad(){
        let emptyBuckets = 0;
        const maxFullBuckets = this.capacity * this.loadFactor;
        this.bucketsArray.forEach(bucket => {
            if(bucket === null) emptyBuckets++
        })
        const bucketsFull = this.capacity - emptyBuckets;
        if (bucketsFull >= maxFullBuckets){
            for (let index = 0; index < 16; index++) {
                this.bucketsArray.push(null)      
            }
            this.capacity = this.bucketsArray.length;
        }
        
    }
    hash(string){
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < string.length; i++) {
          hashCode = (primeNumber * hashCode + string.charCodeAt(i)) % this.capacity;
        }
      
        return hashCode;
    }
    set(key,value){
        const code = this.hash(key);
        const newbucket = new Node (key, value);

        if (this.bucketsArray[code] && this.bucketsArray[code].key == key ) this.bucketsArray[code].value = value;
        else if (this.bucketsArray[code] && this.bucketsArray[code].key !== key){   
               while (this.bucketsArray[code].next){
                this.bucketsArray[code] = this.bucketsArray[code].next;}
                this.bucketsArray[code].next = newbucket;
                 }
        
        else {this.bucketsArray[code] = newbucket}

        this.checkLoad();
    }
    get(key){
        const code = this.hash(key);
        let currentBucket = this.bucketsArray[code];
        if (!this.bucketsArray[code])return null;
        if (this.bucketsArray[code].key == key)return this.bucketsArray[code].value
        else if (this.bucketsArray[code] &&
                 this.bucketsArray[code].key !== key){
                    while (currentBucket){
                        if (currentBucket.key === key) return currentBucket.value;
                        currentBucket = currentBucket.next
                    }
                    return null;
                 }
    }
    has(key){
        const keyExist = this.get(key);
        if (keyExist) return true
            else return false;
    }
    remove(key){
        const code = this.hash(key);
        let currentBucket = (this.bucketsArray[code]);
        let previousBucket = null;;
        if (!currentBucket) return null;

        while (currentBucket){
         if (currentBucket.key === key) {
                    if (!previousBucket){
                        if (!currentBucket.next){
                            this.bucketsArray[code] = null;
                        }else{
                            this.bucketsArray[code] = currentBucket.next;
                        }
                    }else{
                        previousBucket.next = currentBucket.next;
                    }
                    return;
    }         previousBucket = currentBucket;
              currentBucket = currentBucket.next;}
}
length(){
    let currentLength = 0;
    for (let i = 0; i < this.bucketsArray.length; i++) {
        if (this.bucketsArray[i]) {
            let currentKey = this.bucketsArray[i]
                while(currentKey){
                    currentLength++;
                    currentKey = currentKey.next;
                }
        }       
    }
    return currentLength;
}
clear(){
    for (let i = 0; i < this.bucketsArray.length; i++) {
        if (this.bucketsArray[i]) this.bucketsArray[i] = null;
        }       
}
keys(){
    const keysArray = [];
    for (let i = 0; i < this.bucketsArray.length; i++) {
        if (this.bucketsArray[i]) {
            let currentKey = this.bucketsArray[i]
               while(currentKey){
                    keysArray.push(currentKey.key);
                    currentKey = currentKey.next;
              }
        }       
    }
    return keysArray;
}
values(){
    const valuesArray = [];
    for (let i = 0; i < this.bucketsArray.length; i++) {
        if (this.bucketsArray[i]) {
            let currentKey = this.bucketsArray[i]
               while(currentKey){
                    valuesArray.push(currentKey.value);
                    currentKey = currentKey.next;
              }
        }       
    }
    return valuesArray;
}
entries(){
    const entriesArray = [];
    for (let i = 0; i < this.bucketsArray.length; i++) {
        if (this.bucketsArray[i]) {
            let currentKey = this.bucketsArray[i]
               while(currentKey){
                    entriesArray.push([currentKey.key, currentKey.value]);
                    currentKey = currentKey.next;
              }
        }       
    }
    return entriesArray;
}
}

const hash = new HashMap();

hash.set("john", "35");
hash.set("¡mqd", "3");
hash.set("ºmeb", "55");
hash.set("»mda", "15");
hash.set("ħīņl", "56");
hash.set("ēōģl", "28");
hash.set("ȩǿįk", "37");
hash.set("ǰǿņn", "12");
hash.set("Ɉơղņ", "4");
hash.set("ɉơոɲ", "0");
hash.set("ȷơռɲ", "19");
hash.set("ȷơņո", "89");

console.log(hash)