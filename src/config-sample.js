'use strict';
const config = {
        database : {
            user: process.env.dbUser ,
            password: process.env.dbPassword ,
            connectString :  process.env.dbUrl ,
        },
        ldap : {
            url :process.env.ldapUrl,
            bindUser : process.env.ldapUser,
            bindPassword : process.env.ldapPassword
        }
};

module.exports = config;