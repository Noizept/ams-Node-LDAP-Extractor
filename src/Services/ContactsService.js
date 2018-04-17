let ldapLib=require('ldapjs');
let ContactLdap = require('../Models/GroupLdap');
let _ = require('underscore');
let config = require('../config');

let entries = [];
let client = ldapLib.createClient({url: config.ldap.url});
let contactsOptions = {
    attributes: [
        "description",                                      //TODO: DOES NOT EXIST IN LDAP..THEY MADE  displayName as this field
        "displayName",
        "distinguishedName",
        "givenName",                                        //TODO: ALL NULL IN DB, Does not exist in ldap....
        "name",                                             // Its CONTACTNAME on the database
        "objectGUID",
        "sn",                                               //TODO: ALL NULL IN DB, Does not exist in ldap....
        "telephoneNumber",                                  //TODO: ALL NULL IN DB, Does not exist in ldap....
        "whenChanged",
        "whenCreated",
        "ETL_DATETIME",
        "cn",
        "company",
        "mail",
        "mailNickname",
        "msExchHideFromAddressLists",
        "objectCategory",
        "proxyAddresses",                                   // TODO : TUDO A NULL ? Lista como String ?!?!?!?!
        "msExchExtensionAttribute20",
        "msExchRequireAuthToSendTo"
    ],
    scope: "sub",
    filter: "(objectClass=contact)",
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
            client.search('OU=SPSAddressList,DC=office,DC=amsiag,DC=com', contactsOptions, (err, res) => {
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
