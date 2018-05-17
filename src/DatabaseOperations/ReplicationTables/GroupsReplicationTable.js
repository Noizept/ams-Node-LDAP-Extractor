let oracle = require('oracledb');
let _ = require('underscore');
let config = require('./../../config');


async function insert(aRawListOfUsers) {
    return new Promise(async (resolve,reject)=> {
        let conn = null;
        try {
            let currentLoadTime = new Date().toISOString();
            let sql ='INSERT INTO ADIR_GROUPS_E (' +
                'DESCRIPTION, ' +
                'DISPLAYNAME,' +
                'DISTINGUISHEDNAME, ' +
                'GROUPTYPE, ' +
                'MAIL,' +
                'MANAGEDBY, ' +
                'MEMBEROF, ' +
                'MSEXCHHIDEFROMADDRESSLISTS,' +
                'OBJECTCATEGORY, ' +
                'OBJECTGUID, ' +
                'PROXYADDRESSES,' +
                'SAMACCOUNTNAME, ' +
                'SAMACCOUNTTYPE, ' +
                'WHENCHANGED,' +
                'WHENCREATED,' +
                'INFO,' +
                'MAILNICKNAME, ' +
                'MSEXCHALOBJECTVERSION, ' +
                'MSEXCHARBITRATIONMAILBOX,' +
                'MSEXCHRECIEPIENTDISPLAYTYPE, ' +
                'SHOWINADDRESSBOOK, ' +
                'MEMBERS,' +
                'MSEXCHCOMANAGEDBYLINK, ' +
                'MSEXCHREQUIREAUTHTOSENDTO, ' +
                'GIDNUMBER,' +
                'MSEXCHEXTENSIONATTRIBUTE20,' +
                'DLMEMSUBMITPERMS, ' +
                'EXPORTDATETIME) ' +
                'VALUES (' +
                ':description,' +
                ':displayName,' +
                ':distinguishedName,' +
                ':groupType,' +
                ':mail,' +
                ':managedBy,' +
                ':memberOf,' +
                ':msExchHideFromAddressLists,' +
                ':objectCategory,' +
                ':objectGUID,' +
                ':proxyAddresses,'+
                ':sAMAccountName,' +
                ':sAMAccountType,' +
                ':whenChanged,' +
                ':whenCreated,' +
                ':info,' +
                ':mailNickname,' +
                ':msExchALObjectVersion,' +
                ':msExchArbitrationMailbox,' +
                ':msExchRecipientDisplayType,' +
                ':showInAddressBook,' +
                ':member,' +
                ':msExchCoManagedByLink,' +
                ':msExchRequireAuthToSendTo,' +
                ':gidNumber,' +
                ':msExchExtensionAttribute20,' +
                ':dLMemSubmitPerms,' +
                ':EXPORTDATETIME)';

            let filtered_arr = [];
            _.each(aRawListOfUsers, (currentUser) => {
                let usr = currentUser.toObject();
               usr.EXPORTDATETIME = currentLoadTime;

               if(typeof usr.memberOf !== 'string')
                    usr.memberOf? usr.memberOf=usr.memberOf.join(';'):usr.memberOf=null;
                if(typeof usr.proxyAddresses !== 'string')
                    usr.proxyAddresses? usr.proxyAddresses=usr.proxyAddresses.join(';'):usr.proxyAddresses=null;
                if(typeof usr.showInAddressBook !== 'string')
                    usr.showInAddressBook? usr.showInAddressBook=usr.showInAddressBook.join(';'):usr.showInAddressBook=null;
                if(typeof usr.member !== 'string')
                    usr.member? usr.member=usr.member.join(';'):usr.member=null;
                if(typeof usr.managedBy !== 'string')
                    usr.managedBy? usr.managedBy=usr.managedBy.join(';'):usr.managedBy=null;
                if(typeof usr.msExchCoManagedByLink !== 'string')
                    usr.msExchCoManagedByLink? usr.msExchCoManagedByLink=usr.msExchCoManagedByLink.join(';'):usr.msExchCoManagedByLink=null;
                if(typeof usr.dLMemSubmitPerms !== 'string')
                    usr.dLMemSubmitPerms? usr.dLMemSubmitPerms=usr.dLMemSubmitPerms.join(';'):usr.dLMemSubmitPerms=null;


                    filtered_arr.push(usr);
            });
            conn = await oracle.getConnection({user: config.database.user, password: config.database.password, connectString: config.database.connectString});
            await conn.execute('truncate table ADIR_GROUPS_E DROP STORAGE');

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