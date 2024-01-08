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
        if (this.bucketsArray[code] && 
            this.bucketsArray[code].key == key ) this.bucketsArray[code].value = value;

        else { const newbucket = new Node (key, value);
        this.bucketsArray[code] = newbucket;}

        this.checkLoad();
    }
    get(key){
        const code = this.hash(key);
        if (this.bucketsArray[code])return this.bucketsArray[code].value;
        else return null;
    }
}

const hash = new HashMap();

hash.set("john", "35");

console.log(hash)