let oracle = require('oracledb');
let _ = require('underscore');
let config = require('../config');
let ldapDateFormater = require('../Utils/ldap2date');

async function insert(aRawListOfUsers) {
    return new Promise(async (resolve,reject)=> {
        let conn = null;
        try {
            let sql = 'INSERT INTO ' +
                'ADI_GROUPS (' +
                                                'DISTINGUISHEDNAME,' +
                                                'OBJECTGUID,' +
                                                'STATE,' +
                                                'DESCRIPTION,' +
                                                'DISPLAYNAME,' +
                                                'GROUPTYPE,' +
                                                'MAIL,' +
                                                'MSEXCHHIDEFROMADDRESSLISTS,' +
                                                'OBJECTCATEGORY,' +
                                                'SAMACCOUNTNAME,' +
                                                'SAMACCOUNTTYPE,' +
                                                'WHENCHANGED,' +
                                                'WHENCREATED,' +
                                                'ETL_DATETIME,' +
                                                'INFO,' +
                                                'MAILNICKNAME, ' +
                                                'MSEXCHALOBJECTVERSION,' +
                                                'MSEXCHARBITRATIONMAILBOX, ' +
                                                'MSEXCHRECIEPIENTDISPLAYTYPE, ' +
                                                'SHOWINADDRESSBOOK,' +
                                                'MSEXCHCOMANAGEDBYLINK,' +
                                                'MSEXCHREQUIREAUTHTOSENDTO,' +
                                                'GIDNUMBER,' +
                                                'MSEXCHEXTENSIONATTRIBUTE20,' +
                                                'DLMEMSUBMITPERMS ) ' +
                'VALUES (  ' +
                        ':distinguishedName,' +
                        ':objectGUID,' +
                        ':userAccountControl,' +
                        ':description, ' +
                        ':displayName,' +
                        ':groupType,' +
                        ':mail,' +
                        ':msExchHideFromAddressLists,' +
                        ':objectCategory,' +
                        ':sAMAccountName,' +
                        ':sAMAccountType,' +
                        ':whenChanged,' +
                        ':whenCreated,' +
                        ':ETL_DATETIME,' +
                        ':info,' +
                        ':mailNickname,' +
                        ':msExchALObjectVersion,' +
                        ':msExchArbitrationMailbox,' +
                        ':msExchRecipientDisplayType,' +
                        ':showInAddressBook,' +
                        ':msExchCoManagedByLink,' +
                        ':msExchRequireAuthToSendTo,' +
                        ':gidNumber,' +
                        ':msExchExtensionAttribute20,' +
                        ':dLMemSubmitPerms' +
                ')';

            let filtered_arr = [];
            _.each(aRawListOfUsers, (currentGroup) => {
                let grp = currentGroup.toObject();
                grp.msExchHideFromAddressLists  === "TRUE" ? grp.userAccountControl = 'inactive'
                                                                               : grp.userAccountControl = 'active';

                grp.whenChanged = ldapDateFormater.parse(grp.whenChanged);
                grp.whenCreated = ldapDateFormater.parse(grp.whenCreated);
                grp.ETL_DATETIME = new Date();
                grp.showInAddressBook = null;      // TODO : TUDO A NULL ? Lista como String ?!?!?!?!
                grp.msExchCoManagedByLink = null;  // TODO : TUDO A NULL ? Lista como String ?!?!?!?!
                grp.dLMemSubmitPerms = null;       // TODO : TUDO A NULL ? Lista como String ?!?!?!?!
                delete grp.managedBy;
                delete grp.proxyAddresses;
                filtered_arr.push(grp);
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