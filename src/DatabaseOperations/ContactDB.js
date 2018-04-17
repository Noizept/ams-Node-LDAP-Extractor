let oracle = require('oracledb');
let _ = require('underscore');
let config = require('../config');
let ldapDateFormater = require('../Utils/ldap2date');

async function insert(aRawListOfContacts) {
    return new Promise(async (resolve,reject)=> {
        let conn = null;
        try {
            let sql = 'INSERT INTO ' +
                'ADI_CONTACTS (' +
                                                'DESCRIPTION,' +
                                                'DISPLAYNAME,' +
                                                'DISTINGUISHEDNAME,' +
                                                'GIVENNAME,' +
                                                'CONTACTNAME,' +
                                                'OBJECTGUID,' +
                                                'SN,' +
                                                'TELEPHONENUMBER,' +
                                                'WHENCHANGED,' +
                                                'WHENCREATED,' +
                                                'ETL_DATETIME,' +
                                                'CN,' +
                                                'COMPANY,' +
                                                'MAIL,' +
                                                'MAILNICKNAME,' +
                                                'MSEXCHHIDEFROMADDRESSLISTS,' +
                                                'OBJECTCATEGORY, ' +
                                                'PROXYADDRESSES,' +
                                                'msExchExtensionAttribute20,' +
                                                'MSEXCHREQUIREAUTHTOSENDTO ' +
                                                ') ' +
                'VALUES ( ' +
                            ':description,' +
                            ':displayName,' +
                            ':distinguishedName,' +
                            ':givenName,' +
                            ':name,' +
                            ':objectGUID,' +
                            ':sn,' +
                            ':telephoneNumber,' +
                            ':whenChanged,' +
                            ':whenCreated,' +
                            ':ETL_DATETIME,' +
                            ':cn,' +
                            ':company,' +
                            ':mail,' +
                            ':mailNickname,' +
                            ':msExchHideFromAddressLists,' +
                            ':objectCategory,' +
                            ':proxyAddresses,' +
                            ':msExchExtensionAttribute20,' +
                            ':msExchRequireAuthToSendTo)';

            let filtered_arr = [];
            _.each(aRawListOfContacts, (currentContact) => {
                let contact = currentContact.toObject();

                contact.whenChanged = ldapDateFormater.parse(contact.whenChanged);
                contact.whenCreated = ldapDateFormater.parse(contact.whenCreated);
                contact.ETL_DATETIME = new Date();
                contact.proxyAddresses = null;      // TODO : TUDO A NULL ? Lista como String ?!?!?!?!
                filtered_arr.push(contact);
            });

            conn = await oracle.getConnection({user: config.database.user, password: config.database.password, connectString: config.database.connectString});
            let result = await conn.executeMany(sql,filtered_arr);
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