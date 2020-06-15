const HashMap = require('./hashmap')

function main() {
    const lotr = new HashMap()

    lotr.MAX_LOAD_RATIO = 0.5
    lotr.SIZE_RATIO = 3

    // console.log(lotr.MAX_LOAD_RATIO, lotr.SIZE_RATIO)

    lotr.set('Hobbit', 'Bilbo')
    lotr.set('Hobbit', 'Frodo')
    lotr.set('Wizard', 'Gandalf')
    lotr.set('Human', 'Aragorn')
    lotr.set('Elf', 'Legolas')
    lotr.set('Maiar', 'The Necromancer')
    lotr.set('Maiar', 'Sauron')
    lotr.set('RingBearer', 'Gollum')
    lotr.set('LadyOfLight', 'Galadriel')
    lotr.set('HalfElven', 'Arwen')
    lotr.set('Ent', 'Treebeard')

    console.log(JSON.stringify(lotr))

    console.log(lotr.get('Maiar'))

    // The first values for Hobbit and Maiar get written over because they have the same key
    console.log('Maiar key:', lotr.get('Maiar')) // Sauron
    console.log('Hobbit key:', lotr.get('Hobbit')) // Frodo
}

main()

// 2. WhatDoesThisDo
// DO NOT run the following code before solving the problem.

// What is the output of the following code? explain your answer.

const WhatDoesThisDo = function () {
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1, 10); // -> key: 'Hello World.', value: 10
    map1.set(str2, 20); // -> (keys are the same) value: 20 
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3, 20); // key: 'Hello World.', value: 20
    map2.set(str4, 10); // value: 10

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}

// 3. Demonstrate understanding of Hash maps
// *You don't need to write code for the following two drills. use any drawing app or simple pen and paper *

// 1) Show your hash map after the insertion of keys 10, 22, 31, 4, 15, 28, 17, 88, 59 into a hash map of length 11 using open addressing and a hash function k mod m, where k is the key and m is the length.

// 2) Show your hash map after the insertion of the keys 5, 28, 19, 15, 20, 33, 12, 17, 10 into the hash map with collisions resolved by separate chaining. Let the hash table have a length m = 9, and let the hash function be k mod m.

// 4. Remove duplicates
// Implement a function to delete all duplicated characters in a string and keep only the first occurrence of each character. For example, if the input is string “google”, the result after deletion is “gole”. Test your program with a sentence as well such as "google all that you think can think of".

// 5. Any permutation a palindrome
// Write an algorithm to check whether any anagram of some string is a palindrome. Given some string, "acecarr", the algorithm should return true, because the letters in "acecarr" can be rearranged to the anagram "racecar", which itself is a palindrome. In contrast, given the word "north", the algorithm should return false, because there's no anagram for "north" that would be a palindrome.

// 6. Anagram grouping
// Write an algorithm to group a list of words into anagrams. For example, if the input was ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'], the output should be: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']].

// 7. Separate Chaining
// Write another hash map implementation as above, but use separate chaining as the collision resolution mechanism.

// Test your hash map with the same values from the lotr hash map.