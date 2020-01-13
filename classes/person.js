'use strict';

class Person {
    constructor(firstName, lastName, hair, favoriteFoods, married, kids) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.hair = hair;
        this.favoriteFoods = favoriteFoods;
        this.married = married;
        this.kids = kids;
    }
}


module.exports = Person;