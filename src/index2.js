'use strict';
let ldapUsers = require('./Services/ReplicationTables/UsersReplicationService');
let UserDatabase = require('./DatabaseOperations/ReplicationTables/UserReplicationTable');


let ldapContacts = require('./Services/ReplicationTables/ContactsReplicationService');
let ContactsDatabase = require('./DatabaseOperations/ReplicationTables/ContactsReplicationTable');


let ldapGroups = require('./Services/ReplicationTables/GroupsReplicationService');
let GroupsDatabase = require('./DatabaseOperations/ReplicationTables/GroupsReplicationTable');

let users;
let contacts;
let groups;




async function init(){

     try {
         console.log('start');
         console.log(new Date());
         /* FETCH USERS */
         users = await ldapUsers.getUsers();
         await UserDatabase.insert(users);

         /* FETCH CONTACTS */
         contacts = await ldapContacts.getContacts();
         await ContactsDatabase.insert(contacts);

         /* FETCH Groups */
         groups= await ldapGroups.getGroups();
         await GroupsDatabase.insert(groups);

         console.log('end');
         console.log(new Date());
         process.exit(1);


     }

     catch (e) {
         console.log(e);
         process.exit(1);
     }

}

init();