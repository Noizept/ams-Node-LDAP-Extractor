let oracle = require('oracledb');
let _ = require('underscore');
let config = require('./../../config');


async function insert(aRawListOfUsers) {
    return new Promise(async (resolve,reject)=> {
        let conn = null;
        try {
            let currentLoadTime = new Date().toISOString();
            let sql ='INSERT INTO ADIR_CONTACTS_E (' +
                                                    'DESCRIPTION, ' +
                                                    'DISPLAYNAME,' +
                                                    'DISTINGUISHEDNAME,' +
                                                    'GIVENNAME,' +
                                                    'CONTACTNAME,' +
                                                    'OBJECTGUID,' +
                                                    'SN, ' +
                                                    'TELEPHONENUMBER,' +
                                                    'WHENCREATED, ' +
                                                    'WHENCHANGED,' +
                                                    'CN,' +
                                                    'COMPANY,' +
                                                    'MAIL,' +
                                                    'MAILNICKNAME,' +
                                                    'MEMBEROF, ' +
                                                    'MSEXCHHIDEFROMADDRESSLISTS,' +
                                                    'OBJECTCATEGORY, ' +
                                                    'PROXYADDRESSES, ' +
                                                    'MSEXCHEXTENSIONATTRIBUTE20,' +
                                                    'MSEXCHREQUIREAUTHTOSENDTO, ' +
                                                    'EXPORTDATETIME' +
                ')VALUES (' +
                                                    ':description,' +
                                                    ':displayName,' +
                                                    ':distinguishedName,' +
                                                    ':givenName,' +
                                                    ':name,' +
                                                    ':objectGUID,' +
                                                    ':sn,' +
                                                    ':telephoneNumber,' +
                                                    ':whenCreated,' +
                                                    ':whenChanged,' +
                                                    ':cn,' +
                                                    ':company,' +
                                                    ':mail,' +
                                                    ':mailNickname,' +
                                                    ':memberOf,' +
                                                    ':msExchHideFromAddressLists,' +
                                                    ':objectCategory,' +
                                                    ':proxyAddresses,' +
                                                    ':msExchExtensionAttribute20,' +
                                                    ':msExchRequireAuthToSendTo,' +
                                                    ':EXPORTDATETIME )';

            let filtered_arr = [];
            _.each(aRawListOfUsers, (currentUser) => {
                let usr = currentUser.toObject();
               usr.EXPORTDATETIME = currentLoadTime;

               if(typeof usr.memberOf !== 'string')
                    usr.memberOf? usr.memberOf=usr.memberOf.join(';'):usr.memberOf=null;
                if(typeof usr.proxyAddresses !== 'string')
                    usr.proxyAddresses? usr.proxyAddresses=usr.proxyAddresses.join(';'):usr.proxyAddresses=null;

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