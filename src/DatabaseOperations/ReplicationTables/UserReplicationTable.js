let oracle = require('oracledb');
let _ = require('underscore');
let config = require('./../../config');


async function insert(aRawListOfUsers) {
    return new Promise(async (resolve,reject)=> {
        let conn = null;
        try {
            let currentLoadTime = new Date().toISOString();
            let sql = 'INSERT INTO ADIR_USERS_E (' +
                            'ACCOUNTEXPIRES, ' +
                            'C, ' +
                            'CO,' +
                            'COMPANY, ' +
                            'COUNTRYCODE, ' +
                            'DEPARTMENT,' +
                            'DESCRIPTION, ' +
                            'DISPLAYNAME, ' +
                            'DISTINGUISHEDNAME, ' +
                            'EMPLOYEEID, ' +
                            'EXTENSIONATTRIBUTE1, ' +
                            'EXTENSIONATTRIBUTE2, ' +
                            'EXTENSIONATTRIBUTE3, ' +
                            'EXTENSIONATTRIBUTE4, ' +
                            'EXTENSIONATTRIBUTE5, ' +
                            'EXTENSIONATTRIBUTE8, ' +
                            'EXTENSIONATTRIBUTE10, ' +
                            'EXTENSIONATTRIBUTE12, ' +
                            'EXTENSIONATTRIBUTE15, ' +
                            'FACSIMILETELEPHONENUMBER, ' +
                            'GIVENNAME, ' +
                            'IPPHONE, ' +
                            'L, ' +
                            'MAIL, ' +
                            'MANAGEDOBJECTS, ' +
                            'MEMBEROF, ' +
                            'MOBILE,' +
                            'MSEXCHHIDEFROMADDRESSLISTS,' +
                            'OBJECTCATEGORY, ' +
                            'OBJECTGUID,' +
                            'OTHERTELEPHONE, ' +
                            'PHYSICALDELIVERYOFFICENAME, ' +
                            'POSTALCODE,' +
                            'PROXYADDRESSES, ' +
                            'ROOMNUMBER, ' +
                            'SAMACCOUNTNAME, ' +
                            'SN,' +
                            'STREETADDRESS, ' +
                            'TELEPHONENUMBER,' +
                            'TITLE,' +
                            'WHENCHANGED, ' +
                            'WHENCREATED, ' +
                            'SAMACCOUNTTYPE,'+
                            'MSEXCHEXTENSIONATTRIBUTE20, ' +
                            'INFO, ' +
                            'LASTLOGON, ' +
                            'EXTENSIONATTRIBUTE9, ' +
                            'MSEXCHREQUIREAUTHTOSENDTO, ' +
                            'EXPORTDATETIME) ' +
                'VALUES(' +
                            ':accountExpires,' +
                            ':c,' +
                            ':co,' +
                            ':company,' +
                            ':countryCode,' +
                            ':department,' +
                            ':description,' +
                            ':displayName,' +
                            ':distinguishedName,' +
                            ':employeeID,' +
                            ':extensionAttribute1,' +
                            ':extensionAttribute2,' +
                            ':extensionAttribute3,' +
                            ':extensionAttribute4,' +
                            ':extensionAttribute5,' +
                            ':extensionAttribute8,' +
                            ':extensionAttribute10,' +
                            ':extensionAttribute12,' +
                            ':extensionAttribute15,' +
                            ':facsimileTelephoneNumber,' +
                            ':givenName,' +
                            ':ipPhone,' +
                            ':l,' +
                            ':mail,' +
                            ':managedObjects,' +
                            ':memberOf,' +
                            ':mobile,' +
                            ':msExchHideFromAddressLists,' +
                            ':objectCategory,' +
                            ':objectGUID,' +
                            ':otherTelephone,' +
                            ':physicalDeliveryOfficeName,' +
                            ':postalCode,' +
                            ':proxyAddresses,' +
                            ':roomNumber,' +
                            ':sAMAccountName,' +
                            ':sn,' +
                            ':streetAddress,' +
                            ':telephoneNumber,' +
                            ':title,' +
                            ':whenChanged,' +
                            ':whenCreated,' +
                            ':sAMAccountType,' +
                            ':msExchExtensionAttribute20,' +
                            ':info,' +
                            ':lastLogon,' +
                            ':extensionAttribute9,' +
                            ':msExchRequireAuthToSendTo,' +
                            ':EXPORTDATETIME' +
                ')';

            let filtered_arr = [];
            _.each(aRawListOfUsers, (currentUser) => {
                let usr = currentUser.toObject();
               usr.EXPORTDATETIME = currentLoadTime;

               if(typeof usr.memberOf !== 'string')
                    usr.memberOf? usr.memberOf=usr.memberOf.join(';'):usr.memberOf=null;

               if(typeof usr.managedObjects !== 'string')
                    usr.managedObjects? usr.managedObjects=usr.managedObjects.join(';'):usr.managedObjects=null;

                if(typeof usr.proxyAddresses !== 'string')
                    usr.proxyAddresses? usr.proxyAddresses=usr.proxyAddresses.join(';'):usr.proxyAddresses=null;

               filtered_arr.push(usr);
            });
            conn = await oracle.getConnection({user: config.database.user, password: config.database.password, connectString: config.database.connectString});
            await conn.execute('truncate table ADIR_USERS_E DROP STORAGE');
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