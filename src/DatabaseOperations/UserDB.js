let oracle = require('oracledb');
let _ = require('underscore');
let config = require('../config');
let ldapDateFormater = require('../Utils/ldap2date');
let ldapInterVal = require('../Utils/parsers');

async function insert(aRawListOfUsers) {
    return new Promise(async (resolve,reject)=> {
        let conn = null;
        try {
            let sql = 'INSERT INTO ADI_USERS (ID,' +
                'ACCOUNTEXPIRES,' +
                ' C,CO, ' +
                'COMPANY, COUNTRYCODE,DEPARTMENT, DESCRIPTION, DISPLAYNAME,' +
                'DISTINGUISHEDNAME, ' +
                'EMPLOYEEID, EXTENSIONATTRIBUTE1,' +
                'EXTENSIONATTRIBUTE2, EXTENSIONATTRIBUTE3, EXTENSIONATTRIBUTE4,EXTENSIONATTRIBUTE5, EXTENSIONATTRIBUTE8, EXTENSIONATTRIBUTE9,' +
                'EXTENSIONATTRIBUTE10, EXTENSIONATTRIBUTE12, EXTENSIONATTRIBUTE15,' +
                'FACSIMILETELEPHONENUMBER, GIVENNAME, IPPHONE,' +
                'L, MAIL, MOBILE,MSEXCHHIDEFROMADDRESSLISTS, OBJECTCATEGORY, ' +
                'OBJECTGUID,' +
                'OTHERTELEPHONE, PHYSICALDELIVERYOFFICENAME, POSTALCODE,' +
                'ROOMNUMBER, SAMACCOUNTNAME, SN,STREETADDRESS, TELEPHONENUMBER, TITLE,' +
                'WHENCHANGED, WHENCREATED, ' +
                'SAMACCOUNTTYPE,' +
                'STATE, ' +
                'ETL_DATETIME, ' +
                'MSEXCHEXTENSIONATTRIBUTE20,' +
                'INFO, LASTLOGON, MSEXCHREQUIREAUTHTOSENDTO' +
                ') ' +
                'VALUES(:objectGUID, :accountExpires,:c,:co,:company,:countryCode,:department,:description,:displayName,' +
                ':distinguishedName,:employeeID,:extensionAttribute1,:extensionAttribute2,:extensionAttribute3,' +
                ':extensionAttribute4,:extensionAttribute5,:extensionAttribute8,:extensionAttribute9,:extensionAttribute10,' +
                ':extensionAttribute12,:extensionAttribute15,:facsimileTelephoneNumber,:givenName,:ipPhone,:l,:mail,:mobile,' +
                ':msExchHideFromAddressLists,:objectCategory,:objectGUID,:otherTelephone,:physicalDeliveryOfficeName,' +
                ':postalCode,:roomNumber,:sAMAccountName,:sn,:streetAddress,:telephoneNumber,:title,:whenChanged,' +
                ':whenCreated,:sAMAccountType,:userAccountControl,:ETL_DATETIME,:msExchExtensionAttribute20,:info,:lastLogon,' +
                ':msExchRequireAuthToSendTo)';

            let filtered_arr = [];
            _.each(aRawListOfUsers, (currentUser) => {
                let usr = currentUser.toObject();
                usr.userAccountControl === "512" || usr.userAccountControl === "544" ||  usr.userAccountControl === "66048"||  usr.userAccountControl === "66050"
                    ? usr.userAccountControl = 'active' : usr.userAccountControl = 'inactive';

                usr.whenChanged = ldapDateFormater.parse(usr.whenChanged);
                usr.whenCreated = ldapDateFormater.parse(usr.whenCreated);
                usr.lastLogon = ldapInterVal.ldapIntervalToDate(usr.lastLogon);
                usr.accountExpires = ldapInterVal.ldapIntervalToDate(usr.accountExpires);
                usr.ETL_DATETIME = new Date();
                delete usr.memberOf;
                delete usr.proxyAddresses;
                filtered_arr.push(usr);
            });
            conn = await oracle.getConnection({user: config.database.user, password: config.database.password, connectString: config.database.connectString});
            let result = await conn.executeMany(sql, filtered_arr);
            await conn.commit();
            await conn.close();
            resolve(result);
        } catch (e) {
            if(conn)
                await conn.close();
            reject(e);
        }
    });
}


module.exports.insert = insert;