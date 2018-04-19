let oracle = require('oracledb');
let _ = require('underscore');
let config = require('../config');
const dn2guide = require('../Utils/convertDN2GUID');


async function insert(aRawListOfMembers,aRawListOfGroups) {
    return new Promise(async (resolve,reject)=> {
        let conn = null;
        try {
            let sql ='INSERT INTO SVIU.ADI_GROUP_ITEMS ' +
                '(GRP_ID, ITEM_ROLE, ITEM_USR_ID, ITEM_GRP_ID, ITEM_CNT_ID,ETL_DATETIME, ITEM_TYPE)' +
                'VALUES ' +
                '(:GRP_ID ,:ITEM_ROLE ,:ITEM_USR_ID ,:ITEM_GRP_ID ,:ITEM_CNT_ID ,:ETL_DATETIME ,:ITEM_TYPE)';


            let objectUsers = [];
            let objectGroups =[];
            _.each(aRawListOfMembers, (currentMember) => { objectUsers.push(currentMember.toObject());});
            _.each(aRawListOfGroups, (currentGroup) => { objectGroups.push(currentGroup.toObject());});
            dn2guide.setUsersMemberOf(objectUsers,objectGroups);
            let relationships = await getRelationshipJson(objectUsers);
            conn = await oracle.getConnection({user: config.database.user, password: config.database.password, connectString: config.database.connectString});
            let result = await conn.executeMany(sql,relationships);
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

async function getRelationshipJson(aListOfUsers)
{
    return new Promise((resolve,reject)=> {
            let relationshipArra = [];
            _.each(aListOfUsers, (currentUser) => {
                _.each(currentUser.memberOf, (currentGroup) => {
                    relationshipArra.push({
                        GRP_ID: currentGroup,
                        ITEM_ROLE: 'MEMBER',
                        ITEM_USR_ID: currentUser.objectGUID,
                        ITEM_GRP_ID: null,
                        ITEM_CNT_ID: null,
                        ETL_DATETIME: new Date(),
                        ITEM_TYPE: 'USER'
                    });
                });
            });
        resolve(relationshipArra);

    })
}


module.exports.insert = insert;