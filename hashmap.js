class HashMap {
    constructor(initialCapacity = 8) {
        this.length = 0;
        // holds all of the data
        this._hashTable = [];
        // will grow in chunks as you resize to a larger array when the hash table is full
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    // takes a string and hashes it (djb2 algorithm,), outputting a number
    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            //Bitwise left shift with 5 0s - this would be similar to
            //hash*31, 31 being the decent prime number
            //but bit shifting is a faster way to do this
            //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure hash is unsigned - meaning non-negtive number. 
        return hash >>> 0;
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }
        return this._hashTable[index].value;
    }

    // method and helper function (_findSlot()) for locating the correct slot for an item and adding the item to the hash map
    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        // MAX_LOAD_RATIO is used to keep track of how full the hasmap is. When it is a certain % full, we move to a bigger hash table using the SIZE_RATIO so we reduce the # of collisions 

        // initally checks if the load ratio is greater than the given maximum
        // if so, resize the the has map using the private _resize() function
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        //Find the slot where this key should be in
        const index = this._findSlot(key);

        // adds an object to the array containing the key/value pair, increasing the length
        // best case and average case - O(1)
        // worst case - O(n) if a collision takes place
        if (!this._hashTable[index]) {
            this.length++;
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        };
    }

    // finds the correct slot for the key, and sets the deleted flag to true
    // decreases the length and increases the delete count
    // on resize, you can clear out all of the deleted items
    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }

    // used to find the correct slot for a given key
    // uses the private _hashString() function to calculate the hash of the key, and then uses the modulus to find a slot for the key within the current capacity
    // best case and average case - O(1)
    // worst case - O(n) if you have to search through each slot
    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;

        //  loops through the array, stopping when it finds the slot with a matching key or an empty slot
        // function will always return a slot because of the max load factor in the _hashTable array
        for (let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._hashTable[index];
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index;
            }
        }
    }

    // recreate the hash map from scratch with larger capacity to make sure that each item lives in the correct location
    // best case and average case - O(n) because you have to call set() 1 time for each item
    // worst case O(n^2)
    // on resize, you can clear out all of the deleted items
    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value);
            }
        }
    }
}

module.exports = HashMap