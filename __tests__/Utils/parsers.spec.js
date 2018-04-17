const parser = require('../../src/Utils/parsers');

describe('Parser Functions on src/Utils',()=>{

    describe('Test LDAP Interval Converstions',()=>{

        test('ExceptToReturnTodaysDateAtYear2499_WhenPassing_0',()=>{
            /** ARRANGE */
            let date = new Date();
            date.setMilliseconds(0);
            date.setFullYear(2499);

            /** ACT */
            let testedDate = parser.ldapIntervalToDate("0");
            testedDate.setMilliseconds(0);

            /** ASSERT */
            expect(testedDate).toEqual(date);
        });

        test('ExpectToGet26March2018_WhenPassing_131665457517612497',()=>{
            /** ARRANGE */
            let date = new Date(1522072152*1000);

            /** ACT */
            let testedDate = parser.ldapIntervalToDate("131665457517612497");

            /** ASSERT */
            expect(testedDate.getFullYear()).toEqual(date.getFullYear());
            expect(testedDate.getMonth()).toEqual(date.getMonth());
            expect(testedDate.getDay()).toEqual(date.getDay());
            expect(testedDate.getHours()).toEqual(date.getHours());
            expect(testedDate.getMinutes()).toEqual(date.getMinutes());

        });


        test('ExceptNewDate_WhenPassing_Null',()=>{
            /** ARRANGE */
            let date = new Date();
            date.setMilliseconds(0);

            /** ACT */
            let testedDate = parser.ldapIntervalToDate(null);
            testedDate.setMilliseconds(0);

            /** ASSERT */
            expect(testedDate).toEqual(date);
        });
    });



});