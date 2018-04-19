let ldapLib=require('ldapjs');
let GroupLdap = require('../../Models/GroupLdap');
let _ = require('underscore');
let config = require('./../../config');

let entries = [];
let client = ldapLib.createClient({url: config.ldap.url});
let optionsGroup = {
    attributes: [
        "description",
        "displayName",
        "distinguishedName",
        "groupType",
        "mail",
        "managedBy",
        "memberOf",
        "msExchHideFromAddressLists",
        "objectCategory",
        "objectGUID",
        "proxyAddresses",
        "sAMAccountName",
        "sAMAccountType",
        "whenChanged",
        "whenCreated",
        "info",
        "mailNickname",
        "msExchALObjectVersion",
        "msExchArbitrationMailbox",
        "msExchRecipientDisplayType",
        "showInAddressBook",
        "member",
        "msExchCoManagedByLink",
        "msExchRequireAuthToSendTo",
        "gidNumber",
        "msExchExtensionAttribute20",
        "dLMemSubmitPerms",
        "EXPORTDATETIME"
    ],
    scope: "sub",
    //filter: "(objectClass=group)", //TODO: MEU FILTRO
    filter:"(&(objectCategory=group)(objectClass=group))",
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
            client.search('DC=office,DC=amsiag,DC=com', optionsGroup, (err, res) => {
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
