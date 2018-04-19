'use strict';
const _ = require ('underscore');

function setUsersMemberOf(aListOfUsers,aListOfGroups) {


    _.map(aListOfUsers,(currentUser)=>{
        let temporaryMemberOfGuids =[];
        _.each(currentUser.memberOf,(groupDN)=>{
            let groupObject = aListOfGroups.find(o => o.distinguishedName === groupDN);
            if(groupObject)
                temporaryMemberOfGuids.push(groupObject.objectGUID);

        });
        currentUser.memberOf = temporaryMemberOfGuids;
    });

}





module.exports.setUsersMemberOf = setUsersMemberOf;