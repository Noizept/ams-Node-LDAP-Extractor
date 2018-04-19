let ldapLib=require('ldapjs');
let ContactLdap = require('../../Models/ContactLdap');
let _ = require('underscore');
let config = require('./../../config');

let entries = [];
let client = ldapLib.createClient({url: config.ldap.url});
let contactsOptions = {
    attributes: [
        "description",
        "displayName",
        "distinguishedName",
        "givenName",
        "name",
        "objectGUID",
        "sn",
        "telephoneNumber",
        "whenCreated",
        "whenChanged",
        "cn",
        "company",
        "mail",
        "mailNickname",
        "memberOf",
        "msExchHideFromAddressLists",
        "objectCategory",
        "proxyAddresses",
        "msExchExtensionAttribute20",
        "msExchRequireAuthToSendTo",
        "EXPORTDATETIME"
    ],
    scope: "sub",
    //filter: "(objectClass=contact)", //TODO: MY FILTER, has way moreee contacts 600+
    filter: "(&(objectCategory=person)(objectClass=contact))",
    paged :true,
    reconnect : false
};

module.exports.getContacts = function getContacts() {
    return new Promise((resolve, reject) => {
        client.bind(config.ldap.bindUser, config.ldap.bindPassword, (err) => {
            if(err) {
                client.destroy();
                reject(err);
            }
            client.search('DC=office,DC=amsiag,DC=com', contactsOptions, (err, res) => {
                res.on('searchEntry', function (entry) {
                    entries.push(new ContactLdap(contactsOptions.attributes,entry));
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
