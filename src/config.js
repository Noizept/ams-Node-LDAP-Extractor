'use strict';
const config = {
        database : {
            user: 'ADIR_OWNER',
            password: 'dement0r',
            connectString : 'ITASDEV.AMSINT.COM'
        },
        ldap : {
            url :'ldap://ams-ldap.amsiag.com:389',
            bindUser : 'svc_ldap',
            bindPassword : 'Ams123!'
        }
};

module.exports = config;