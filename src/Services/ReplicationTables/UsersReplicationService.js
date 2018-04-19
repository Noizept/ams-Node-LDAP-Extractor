let ldapLib=require('ldapjs');
let UserLdap = require('../../Models/UserLdap');
let _ = require('underscore');
let config = require('./../../config');

let entries = [];
let client = ldapLib.createClient({url: config.ldap.url});
let optionsUser = {
    attributes: [
        "accountExpires",
        "c",
        "co",
        "company",
        "countryCode",
        "department",
        "description",
        "displayName",
        "distinguishedName",
        "employeeID",
        "extensionAttribute1",
        "extensionAttribute2",
        "extensionAttribute3",
        "extensionAttribute4",
        "extensionAttribute5",
        "extensionAttribute8",
        "extensionAttribute10",
        "extensionAttribute12",
        "extensionAttribute15",
        "facsimileTelephoneNumber",
        "givenName",
        "ipPhone",
        "l",
        "mail",
        "managedObjects",
        "memberOf",
        "mobile",
        "msExchHideFromAddressLists",
        "objectCategory",
        "objectGUID",
        "otherTelephone",
        "physicalDeliveryOfficeName",
        "postalCode",
        "proxyAddresses",
        "roomNumber",
        "sAMAccountName",
        "sn",
        "streetAddress",
        "telephoneNumber",
         "title",
        "whenChanged",
        "whenCreated",
        "sAMAccountType",
        "msExchExtensionAttribute20",
        "info",
        "lastLogon",
        "extensionAttribute9",
        "msExchRequireAuthToSendTo",
        "EXPORTDATETIME"
    ],
    scope: "sub",
   // filter: "(objectClass=person)", //TODO: Changed my filter
    filter: "(&(objectCategory=person)(objectClass=user))",
    paged :true,
    reconnect : false
};

module.exports.getUsers = function getUsers() {
    return new Promise((resolve,reject)=>{
        client.bind(config.ldap.bindUser, config.ldap.bindPassword, (err) => {
            if(err) {
                client.destroy();
                reject(err);
            }
            client.search('DC=office,DC=amsiag,DC=com', optionsUser, (err, res) => {
                res.on('searchEntry', function (entry) {
                    entries.push(new UserLdap(optionsUser.attributes,entry));
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

