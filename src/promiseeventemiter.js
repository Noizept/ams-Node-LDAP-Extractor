let conv = require('./Utils/parsers');
let contacts = require('./Services/GroupsService');
const fs = require('fs');
const _ = require('underscore');

async function bakeMeSomeBurgers () {

    let canIHave = await canIHazACheezBurger();
if (canIHave)
    console.log('Hehe, you can have...');
else
    console.log('NOPE');

// Here we create an await our promise:
await new Promise((resolve, reject) => {
    // Here invoke our event emitter:
    let cook = new BurgerCooking('cheez');
    // a normal event callback:
    cook.on('update', percent => {
        console.log(`The burger is ${percent}% done`);
    });
    cook.on('end', resolve); // call resolve when its done
    cook.on('error', reject); // don't forget this
});

console.log('I\'ve finished the burger!');
if (canIHave)
    console.log('Here, take it :)');
else
    console.log('Too bad you can\'t have it >:)');
}

console.log(conv.ldapIntervalToDate('131665457517612497 '));



async function testit(){


    let ddd = await contacts.getGroups();
    fs.writeFile('groups.json', JSON.stringify(ddd), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

}

function k(a){
    _.map(a,(element)=>{  element.description =1234;});
}
testit();