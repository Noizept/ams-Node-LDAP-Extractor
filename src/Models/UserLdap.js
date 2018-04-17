'use strict';
let _  = require('underscore');
let parsers = require('../Utils/parsers');

module.exports = class UserLdap
{

    constructor(aPropertyList,aEntry)
    {
        _.each(aPropertyList,(propertyName)=>{
            if(propertyName==='objectGUID')
                this[propertyName] = parsers.formatGUID(aEntry.raw.objectGUID);
            else
                aEntry.object[propertyName] ? this[propertyName] = aEntry.object[propertyName] : this[propertyName] = null;
        });

    };

    toObject(){
        return JSON.parse(JSON.stringify(this));
    }

};
