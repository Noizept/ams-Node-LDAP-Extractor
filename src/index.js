'use strict';
let ldapUsers = require('./Services/UsersService');
let ldapGroups = require('./Services/GroupsService');
let ldapContacts = require('./Services/ContactsService');


let _ = require('underscore');
let UserDatabase = require('./DatabaseOperations/UserDB');
let GroupDatabase = require('./DatabaseOperations/GroupDB');
let ContactDatabase = require('./DatabaseOperations/ContactDB');


let users;
let groups;
let contacts;

async function init(){

     try {
         console.log(new Date());
       //  users = await ldapUsers.getUsers();
        // await UserDatabase.insert(users);
       //  groups = await ldapGroups.getGroups();
       //  await GroupDatabase.insert(groups);

      //   console.log(new Date());

         contacts = await ldapContacts.getContacts();
          await ContactDatabase.insert(contacts);
         process.exit(1);
     }

     catch (e) {
         console.log(e);
         process.exit(1);
     }

}

init();