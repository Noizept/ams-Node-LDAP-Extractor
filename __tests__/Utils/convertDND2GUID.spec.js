const converter = require('../../src/Utils/convertDN2GUID');

let user;
let group;


describe('Conversion of DN to GUIDS',()=>{
   describe('Conversion of MemberOf from USERS',()=>{
       beforeEach(()=>{
           user= [    {
               "accountExpires": "9223372036854775807",
               "c": "PT",
               "co": "Portugal",
               "company": "ams AG",
               "countryCode": "620",
               "department": "IT Application Development FNC, PT_FUNCHAL",
               "description": "(IT)APPLICATION DEVELOPMENT",
               "displayName": "Sergio Viula",
               "distinguishedName": "CN=Viula Sergio,OU=Premstaetten_IT-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
               "employeeID": "7039454",
               "extensionAttribute1": "http://intranet.office.amsiag.com/vd_facility_whoiswho/SVIU.jpg",
               "extensionAttribute2": "20180417",
               "extensionAttribute3": "Mr.",
               "extensionAttribute4": "2920",
               "extensionAttribute5": "2623011",
               "extensionAttribute8": null,
               "extensionAttribute9": "active",
               "extensionAttribute10": "EN",
               "extensionAttribute12": "rodriguesviulasergiomiguelrodriguesviula0sviupmdpggtdptgtjapdpggmmggtdjpmdpggtdptgtja0ptgt",
               "extensionAttribute15": "No",
               "facsimileTelephoneNumber": null,
               "givenName": "Sergio",
               "ipPhone": "+43 3136 500 270115",
               "l": "Funchal",
               "mail": "sergio.viula@ams.com",
               "mobile": null,
               "msExchHideFromAddressLists": null,
               "objectCategory": "CN=Person,CN=Schema,CN=Configuration,DC=amsiag,DC=com",
               "objectGUID": "9cf78cc9-5e35-4244-8c99-080094df6893",
               "otherTelephone": null,
               "physicalDeliveryOfficeName": "PT_FUNCHAL",
               "postalCode": "9020-105",
               "roomNumber": null,
               "sAMAccountName": "sviu",
               "sn": "Viula",
               "streetAddress": "Madeira Tecnopolo 2°",
               "telephoneNumber": null,
               "title": null,
               "whenChanged": "20180417154439.0Z",
               "whenCreated": "20171004090450.0Z",
               "sAMAccountType": "805306368",
               "userAccountControl": "544",
               "ETL_DATETIME": null,
               "msExchExtensionAttribute20": "employee",
               "info": "@Create-Ticket:IM0017964836\r\n@Create-Requestor:OFFICE\\e_pgab\r\n@Create-Manager:OFFICE\\pbi\r\n@Create-On:2017-10-04\r\n@Create-AccountExpires:\r\n",
               "lastLogon": "131679099105406631",
               "msExchRequireAuthToSendTo": null,
               "memberOf": [
                   "CN=_IT.DS.AD.PRT,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "CN=_pg_FUN_Team_IT_Development_s,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "CN=_pg_FUN_Team_IT_Development_w,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "CN=_all_users,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "CN=_Site.Funchal,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "CN=_IT.DS.Oracle,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "CN=_IT.DS,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "CN=_Angestellte_Subs,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",/*
                "CN=S_OPE_APPD_AIC,OU=GG,OU=Premstaetten_IT-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com", // TODO: TA FDD
                "CN=G_ARCHIVE_PAM4,OU=Archiv,DC=office,DC=amsiag,DC=com",
                "CN=Exch_Limit_1000,OU=ams groups,OU=ams ressourcen,DC=office,DC=amsiag,DC=com",
                "CN=G_ARCHIV_nopst,OU=Archiv,DC=office,DC=amsiag,DC=com",
                "CN=G_Archiv,OU=Archiv,DC=office,DC=amsiag,DC=com",
                "CN=_English,OU=ams groups,OU=ams ressourcen,DC=office,DC=amsiag,DC=com",
                "CN=S_OPE_APPD,OU=GG,OU=Premstaetten_IT-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                "CN=G_IT,OU=ams groups,OU=ams ressourcen,DC=office,DC=amsiag,DC=com"*/
               ],
               "proxyAddresses": [
                   "sip:sergio.viula@ams.com",
                   "SMTP:sergio.viula@ams.com"
               ]
           }];
           group =[
               {
                   "distinguishedName": "CN=_Angestellte_Subs,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "objectGUID": "83614988-a4cb-4ddc-b5c9-3745c625aab2",
                   "userAccountControl": null,
                   "description": null,
                   "displayName": "_Angestellte_Subs",
                   "groupType": "-2147483646",
                   "mail": "Angestellte_Subs@ams.com",
                   "msExchHideFromAddressLists": null,
                   "objectCategory": "CN=Group,CN=Schema,CN=Configuration,DC=amsiag,DC=com",
                   "sAMAccountName": "_Angestellte_Subs",
                   "sAMAccountType": "268435456",
                   "whenChanged": "20180417075359.0Z",
                   "whenCreated": "20130529060412.0Z",
                   "ETL_DATETIME": null,
                   "info": null,
                   "mailNickname": "Angestellte_Subs",
                   "msExchALObjectVersion": null,
                   "msExchArbitrationMailbox": "CN=SystemMailbox{1f05a927-23ea-4b85-b857-92fb0948371f},CN=Users,DC=amsiag,DC=com",
                   "msExchRecipientDisplayType": "1073741833",
                   "showInAddressBook": [
                       "CN=All Distribution Lists,CN=All Address Lists,CN=Address Lists Container,CN=Austria Mikro Systeme,CN=Microsoft Exchange,CN=Services,CN=Configuration,DC=amsiag,DC=com",
                       "CN=Default Global Address List,CN=All Global Address Lists,CN=Address Lists Container,CN=Austria Mikro Systeme,CN=Microsoft Exchange,CN=Services,CN=Configuration,DC=amsiag,DC=com",
                       "CN=All Groups,CN=All Address Lists,CN=Address Lists Container,CN=Austria Mikro Systeme,CN=Microsoft Exchange,CN=Services,CN=Configuration,DC=amsiag,DC=com"
                   ],
                   "msExchCoManagedByLink": [
                       "CN=Schein Melanie,OU=Premstaetten_HumanRes-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                       "CN=Reyes Marianne,OU=Premstaetten_HumanRes-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                       "CN=Klug-Jud Katrin,OU=Premstaetten_HumanRes-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                       "CN=Happe Cornelia,OU=Premstaetten_HumanRes-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                       "CN=Stessl Lisa,OU=Premstaetten_HumanRes-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com"
                   ],
                   "msExchRequireAuthToSendTo": "TRUE",
                   "gidNumber": null,
                   "msExchExtensionAttribute20": "Distribution_Group",
                   "dLMemSubmitPerms": "CN=_DL_Senders_MGMT,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "managedBy": "CN=Bernhardt Barbara,OU=Premstaetten_HumanRes-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                   "proxyAddresses": "SMTP:Angestellte_Subs@ams.com"
               },
               {
                   "distinguishedName": "CN=_IT.DS,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "objectGUID": "e34a9ce2-0d0d-4537-a916-e7f74268146b",
                   "userAccountControl": null,
                   "description": null,
                   "displayName": "_IT.DS",
                   "groupType": "-2147483646",
                   "mail": "IT.DS@ams.com",
                   "msExchHideFromAddressLists": null,
                   "objectCategory": "CN=Group,CN=Schema,CN=Configuration,DC=amsiag,DC=com",
                   "sAMAccountName": "IT.DS",
                   "sAMAccountType": "268435456",
                   "whenChanged": "20171102134333.0Z",
                   "whenCreated": "20150108080206.0Z",
                   "ETL_DATETIME": null,
                   "info": "Owners: Bichler Peter, Poetscher Michael, Bristow Beatrix ",
                   "mailNickname": "IT.DS",
                   "msExchALObjectVersion": null,
                   "msExchArbitrationMailbox": "CN=SystemMailbox{1f05a927-23ea-4b85-b857-92fb0948371f},CN=Users,DC=amsiag,DC=com",
                   "msExchRecipientDisplayType": "1073741833",
                   "showInAddressBook": [
                       "CN=All Distribution Lists,CN=All Address Lists,CN=Address Lists Container,CN=Austria Mikro Systeme,CN=Microsoft Exchange,CN=Services,CN=Configuration,DC=amsiag,DC=com",
                       "CN=All Groups,CN=All Address Lists,CN=Address Lists Container,CN=Austria Mikro Systeme,CN=Microsoft Exchange,CN=Services,CN=Configuration,DC=amsiag,DC=com",
                       "CN=Default Global Address List,CN=All Global Address Lists,CN=Address Lists Container,CN=Austria Mikro Systeme,CN=Microsoft Exchange,CN=Services,CN=Configuration,DC=amsiag,DC=com"
                   ],
                   "msExchCoManagedByLink": [
                       "CN=Poetscher Michael,OU=Premstaetten_IT-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                       "CN=Bristow Beatrix,OU=Premstaetten_IT-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com"
                   ],
                   "msExchRequireAuthToSendTo": "TRUE",
                   "gidNumber": null,
                   "msExchExtensionAttribute20": "Distribution_Group",
                   "dLMemSubmitPerms": null,
                   "managedBy": "CN=Bichler Peter,OU=Premstaetten_IT-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                   "proxyAddresses": [
                       "smtp:IT.AD@ams.com",
                       "SMTP:IT.DS@ams.com"
                   ]
               },
               {
                   "distinguishedName": "CN=_IT.DS.Oracle,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "objectGUID": "d5004eee-bd50-4e68-b6e4-d3802d786896",
                   "userAccountControl": null,
                   "description": null,
                   "displayName": "_IT.DS.Oracle",
                   "groupType": "-2147483646",
                   "mail": "IT.DS.Oracle@ams.com",
                   "msExchHideFromAddressLists": null,
                   "objectCategory": "CN=Group,CN=Schema,CN=Configuration,DC=amsiag,DC=com",
                   "sAMAccountName": "IT.DS.Oracle",
                   "sAMAccountType": "268435456",
                   "whenChanged": "20171114074857.0Z",
                   "whenCreated": "20151218112625.0Z",
                   "ETL_DATETIME": null,
                   "info": "Owners: Bichler Peter, Poetscher Michael, Bristow Beatrix",
                   "mailNickname": "IT.DS.Oracle",
                   "msExchALObjectVersion": null,
                   "msExchArbitrationMailbox": "CN=SystemMailbox{1f05a927-23ea-4b85-b857-92fb0948371f},CN=Users,DC=amsiag,DC=com",
                   "msExchRecipientDisplayType": "1073741833",
                   "showInAddressBook": [
                       "CN=All Distribution Lists,CN=All Address Lists,CN=Address Lists Container,CN=Austria Mikro Systeme,CN=Microsoft Exchange,CN=Services,CN=Configuration,DC=amsiag,DC=com",
                       "CN=All Groups,CN=All Address Lists,CN=Address Lists Container,CN=Austria Mikro Systeme,CN=Microsoft Exchange,CN=Services,CN=Configuration,DC=amsiag,DC=com",
                       "CN=Default Global Address List,CN=All Global Address Lists,CN=Address Lists Container,CN=Austria Mikro Systeme,CN=Microsoft Exchange,CN=Services,CN=Configuration,DC=amsiag,DC=com"
                   ],
                   "msExchCoManagedByLink": [
                       "CN=Poetscher Michael,OU=Premstaetten_IT-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                       "CN=Bristow Beatrix,OU=Premstaetten_IT-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com"
                   ],
                   "msExchRequireAuthToSendTo": "TRUE",
                   "gidNumber": null,
                   "msExchExtensionAttribute20": "Distribution_Group",
                   "dLMemSubmitPerms": null,
                   "managedBy": "CN=Bichler Peter,OU=Premstaetten_IT-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                   "proxyAddresses": [
                       "smtp:IT.AD.Oracle@ams.com",
                       "SMTP:IT.DS.Oracle@ams.com"
                   ]
               },
               {
                   "distinguishedName": "CN=_Site.Funchal,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "objectGUID": "9303732b-2e01-459b-9023-124b8fa74e1e",
                   "userAccountControl": null,
                   "description": null,
                   "displayName": "_Site.Funchal",
                   "groupType": "-2147483646",
                   "mail": "Site.Funchal@ams.com",
                   "msExchHideFromAddressLists": null,
                   "objectCategory": "CN=Group,CN=Schema,CN=Configuration,DC=amsiag,DC=com",
                   "sAMAccountName": "Site.Funchal",
                   "sAMAccountType": "268435456",
                   "whenChanged": "20180403131738.0Z",
                   "whenCreated": "20160719075210.0Z",
                   "ETL_DATETIME": null,
                   "info": "Owners: Agostinho Teixeira,Pedro Nunes, Susana Pita ",
                   "mailNickname": "Site.Funchal",
                   "msExchALObjectVersion": null,
                   "msExchArbitrationMailbox": "CN=SystemMailbox{1f05a927-23ea-4b85-b857-92fb0948371f},CN=Users,DC=amsiag,DC=com",
                   "msExchRecipientDisplayType": "1073741833",
                   "showInAddressBook": [
                       "CN=All Distribution Lists,CN=All Address Lists,CN=Address Lists Container,CN=Austria Mikro Systeme,CN=Microsoft Exchange,CN=Services,CN=Configuration,DC=amsiag,DC=com",
                       "CN=All Groups,CN=All Address Lists,CN=Address Lists Container,CN=Austria Mikro Systeme,CN=Microsoft Exchange,CN=Services,CN=Configuration,DC=amsiag,DC=com",
                       "CN=Default Global Address List,CN=All Global Address Lists,CN=Address Lists Container,CN=Austria Mikro Systeme,CN=Microsoft Exchange,CN=Services,CN=Configuration,DC=amsiag,DC=com"
                   ],
                   "msExchCoManagedByLink": "CN=Nunes Pedro,OU=Funchal-FU,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                   "msExchRequireAuthToSendTo": "TRUE",
                   "gidNumber": null,
                   "msExchExtensionAttribute20": "Distribution_Group",
                   "dLMemSubmitPerms": null,
                   "managedBy": "CN=Teixeira Agostinho,OU=Funchal-FU,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                   "proxyAddresses": "SMTP:Site.Funchal@ams.com"
               },
               {
                   "distinguishedName": "CN=_all_users,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "objectGUID": "f521e9a8-e7c9-4599-b151-5d5f32fa0834",
                   "userAccountControl": null,
                   "description": null,
                   "displayName": "_all_users",
                   "groupType": "-2147483646",
                   "mail": "all_users@ams.com",
                   "msExchHideFromAddressLists": "TRUE",
                   "objectCategory": "CN=Group,CN=Schema,CN=Configuration,DC=amsiag,DC=com",
                   "sAMAccountName": "all_users",
                   "sAMAccountType": "268435456",
                   "whenChanged": "20180417125926.0Z",
                   "whenCreated": "20170720120056.0Z",
                   "ETL_DATETIME": null,
                   "info": "Owners: Bernhardt Barbara, Klug-Jud Katrin, Happe Cornelia, Stessl Lisa",
                   "mailNickname": "all_users",
                   "msExchALObjectVersion": null,
                   "msExchArbitrationMailbox": "CN=SystemMailbox{1f05a927-23ea-4b85-b857-92fb0948371f},CN=Users,DC=amsiag,DC=com",
                   "msExchRecipientDisplayType": "1073741833",
                   "showInAddressBook": null,
                   "msExchCoManagedByLink": [
                       "CN=Klug-Jud Katrin,OU=Premstaetten_HumanRes-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                       "CN=Happe Cornelia,OU=Premstaetten_HumanRes-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                       "CN=Stessl Lisa,OU=Premstaetten_HumanRes-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com"
                   ],
                   "msExchRequireAuthToSendTo": "TRUE",
                   "gidNumber": null,
                   "msExchExtensionAttribute20": "Distribution_Group",
                   "dLMemSubmitPerms": "CN=_DL_Senders_MGMT,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "managedBy": "CN=Bernhardt Barbara,OU=Premstaetten_HumanRes-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                   "proxyAddresses": "SMTP:all_users@ams.com"
               },
               {
                   "distinguishedName": "CN=_IT.DS.AD.PRT,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "objectGUID": "eeb0ccd8-42db-4d72-8ca0-c74da235db59",
                   "userAccountControl": null,
                   "description": null,
                   "displayName": "_IT.DS.AD.PRT",
                   "groupType": "-2147483646",
                   "mail": "IT.DS.AD.PRT@ams.com",
                   "msExchHideFromAddressLists": null,
                   "objectCategory": "CN=Group,CN=Schema,CN=Configuration,DC=amsiag,DC=com",
                   "sAMAccountName": "IT.DS.AD.PRT",
                   "sAMAccountType": "268435456",
                   "whenChanged": "20171107173353.0Z",
                   "whenCreated": "20171009113254.0Z",
                   "ETL_DATETIME": null,
                   "info": "Owners: Bichler Peter, Angelova Silviya, Ramprecht Renate",
                   "mailNickname": "IT.DS.AD.PRT",
                   "msExchALObjectVersion": null,
                   "msExchArbitrationMailbox": "CN=SystemMailbox{bb558c35-97f1-4cb9-8ff7-d53741dc928c},CN=Users,DC=amsiag,DC=com",
                   "msExchRecipientDisplayType": "1073741833",
                   "showInAddressBook": [
                       "CN=All Distribution Lists,CN=All Address Lists,CN=Address Lists Container,CN=Austria Mikro Systeme,CN=Microsoft Exchange,CN=Services,CN=Configuration,DC=amsiag,DC=com",
                       "CN=All Groups,CN=All Address Lists,CN=Address Lists Container,CN=Austria Mikro Systeme,CN=Microsoft Exchange,CN=Services,CN=Configuration,DC=amsiag,DC=com",
                       "CN=Default Global Address List,CN=All Global Address Lists,CN=Address Lists Container,CN=Austria Mikro Systeme,CN=Microsoft Exchange,CN=Services,CN=Configuration,DC=amsiag,DC=com"
                   ],
                   "msExchCoManagedByLink": [
                       "CN=Angelova Silviya,OU=Funchal-FU,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                       "CN=Ramprecht Renate,OU=Premstaetten_Finance_Ctrlg-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com"
                   ],
                   "msExchRequireAuthToSendTo": "TRUE",
                   "gidNumber": null,
                   "msExchExtensionAttribute20": "Distribution_Group",
                   "dLMemSubmitPerms": null,
                   "managedBy": "CN=Bichler Peter,OU=Premstaetten_IT-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                   "proxyAddresses": "SMTP:IT.DS.AD.PRT@ams.com"
               },
               {
                   "distinguishedName": "CN=_pg_FUN_Team_IT_Development_s,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "objectGUID": "9759e1d2-745f-4cc4-9a82-bff543023158",
                   "userAccountControl": null,
                   "description": "FUN_IT_Development_SECURE_scripted",
                   "displayName": "_pg_FUN_Team_IT_Development_s",
                   "groupType": "-2147483646",
                   "mail": "pg_FUN_Team_IT_Development_s@ams.com",
                   "msExchHideFromAddressLists": "TRUE",
                   "objectCategory": "CN=Group,CN=Schema,CN=Configuration,DC=amsiag,DC=com",
                   "sAMAccountName": "pg_FUN_Team_IT_Development_s",
                   "sAMAccountType": "268435456",
                   "whenChanged": "20171005091426.0Z",
                   "whenCreated": "20171004140754.0Z",
                   "ETL_DATETIME": null,
                   "info": "InitialOwners: Bichler Peter, Teixeira Agostinho",
                   "mailNickname": "pg_FUN_Team_IT_Development_s",
                   "msExchALObjectVersion": null,
                   "msExchArbitrationMailbox": "CN=SystemMailbox{1f05a927-23ea-4b85-b857-92fb0948371f},CN=Users,DC=amsiag,DC=com",
                   "msExchRecipientDisplayType": "1073741833",
                   "showInAddressBook": null,
                   "msExchCoManagedByLink": "CN=Teixeira Agostinho,OU=Funchal-FU,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                   "msExchRequireAuthToSendTo": "TRUE",
                   "gidNumber": null,
                   "msExchExtensionAttribute20": "Permission_Group",
                   "dLMemSubmitPerms": null,
                   "managedBy": "CN=Bichler Peter,OU=Premstaetten_IT-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                   "proxyAddresses": "SMTP:pg_FUN_Team_IT_Development_s@ams.com"
               },
               {
                   "distinguishedName": "CN=_pg_FUN_Team_IT_Development_w,OU=SPSamsContacts,DC=office,DC=amsiag,DC=com",
                   "objectGUID": "498ce51b-c213-4620-834d-bf941fee45a5",
                   "userAccountControl": null,
                   "description": "FUN_IT_Development_CHANGE_scripted",
                   "displayName": "_pg_FUN_Team_IT_Development_w",
                   "groupType": "-2147483646",
                   "mail": "pg_FUN_Team_IT_Development_w@ams.com",
                   "msExchHideFromAddressLists": "TRUE",
                   "objectCategory": "CN=Group,CN=Schema,CN=Configuration,DC=amsiag,DC=com",
                   "sAMAccountName": "pg_FUN_Team_IT_Development_w",
                   "sAMAccountType": "268435456",
                   "whenChanged": "20171005085518.0Z",
                   "whenCreated": "20171004140753.0Z",
                   "ETL_DATETIME": null,
                   "info": "InitialOwners: Bichler Peter, Teixeira Agostinho",
                   "mailNickname": "pg_FUN_Team_IT_Development_w",
                   "msExchALObjectVersion": null,
                   "msExchArbitrationMailbox": "CN=SystemMailbox{1f05a927-23ea-4b85-b857-92fb0948371f},CN=Users,DC=amsiag,DC=com",
                   "msExchRecipientDisplayType": "1073741833",
                   "showInAddressBook": null,
                   "msExchCoManagedByLink": "CN=Teixeira Agostinho,OU=Funchal-FU,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                   "msExchRequireAuthToSendTo": "TRUE",
                   "gidNumber": null,
                   "msExchExtensionAttribute20": "Permission_Group",
                   "dLMemSubmitPerms": null,
                   "managedBy": "CN=Bichler Peter,OU=Premstaetten_IT-UP,OU=office,OU=ams user,DC=office,DC=amsiag,DC=com",
                   "proxyAddresses": "SMTP:pg_FUN_Team_IT_Development_w@ams.com"
               }
           ];
       });


       test('ItShouldConvertMemberOf_To_GUID',()=>{
           converter.setUsersMemberOf(user,group);
           expect(user[0].memberOf[0]).toEqual('eeb0ccd8-42db-4d72-8ca0-c74da235db59');
       });


       test('ItShouldConvert_all_the_8_Groups',()=>{
           converter.setUsersMemberOf(user,group);
           expect(user[0].memberOf.length).toEqual(8);
       });

   });




});