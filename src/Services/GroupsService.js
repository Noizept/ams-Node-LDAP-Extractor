let ldapLib=require('ldapjs');
let GroupLdap = require('../Models/GroupLdap');
let _ = require('underscore');
let config = require('../config');

let entries = [];
let client = ldapLib.createClient({url: config.ldap.url});
let optionsGroup = {
    attributes: [
        "distinguishedName",
        "objectGUID",
        "userAccountControl",                            //:TODO STATE ???
        "description",
        "displayName",
        "groupType",
        "mail",
        "msExchHideFromAddressLists",
        "objectCategory",
        "sAMAccountName",
        "sAMAccountType",
        "whenChanged",
        "whenCreated",
        "ETL_DATETIME",
        "info",
        "mailNickname",
        "msExchALObjectVersion",
        "msExchArbitrationMailbox",
        "msExchRecipientDisplayType",
        "showInAddressBook",                     // TODO Sempre vazio on DB ???
        "msExchCoManagedByLink",                 // TODO : TUDO A NULL ? Lista como String ?!?!?!?!
        "msExchRequireAuthToSendTo",
        "gidNumber",
        "msExchExtensionAttribute20",
        "dLMemSubmitPerms",
        "managedBy",
        "proxyAddresses",
        //  "memberOf"
    ],
    scope: "sub",
    filter: "(objectClass=group)",
    paged :true,
    reconnect : false
};

module.exports.getGroups = function getGroups() {
    return new Promise((resolve, reject) => {
        client.bind(config.ldap.bindUser, config.ldap.bindPassword, (err) => {
            if(err) {
                client.destroy();
                reject(err);
            }
            client.search('OU=SPSamsContacts,DC=office,DC=amsiag,DC=com', optionsGroup, (err, res) => {
                res.on('searchEntry', function (entry) {
                    entries.push(new GroupLdap(optionsGroup.attributes,entry));
                });

                res.on('end', function (result) {
                    client.destroy();
                    resolve(entries);
                });

                res.on('error', function (err) {
                    client.destroy();
                    reject(err);
                });

            });
        });

    });
};
