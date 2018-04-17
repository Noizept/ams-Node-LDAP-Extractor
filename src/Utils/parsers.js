module.exports = {

    /***
     * Converts a Byte ObjectGUID from LDAP to String format
     * @param objectGUID - Byte parameters coming from LDAP
     * @returns {string} - Formate GUID
     */
    formatGUID: function formatGUID(objectGUID) {
        let data = new Buffer(objectGUID, 'binary');
        let template = '{3}{2}{1}{0}-{5}{4}-{7}{6}-{8}{9}-{10}{11}{12}{13}{14}{15}';
        // check each byte
        for (let i = 0; i < data.length; i++) {
            // get the current character from that byte
            let dataStr = data[i].toString(16);
            dataStr = data[i] >= 16 ? dataStr : '0' + dataStr;
            // insert that character into the template
            template = template.replace(new RegExp('\\{' + i + '\\}', 'g'), dataStr);
        }
        return template;
    },
    /***
     * Convert a Interval from LDAP to it's date Value
     * @param aNumber - String number to be converted
     * @returns {Date} - Date Object
     */
    ldapIntervalToDate : function ldapIntervalToDate(aNumber){
        let numb= aNumber;

        if(typeof numb ==='number')
            numb=numb.toString();
        if(numb==="0") {
            let dateTime = new Date();
            dateTime.setFullYear(2499);
            return dateTime;
        }
        if(typeof numb ==="string") {
            let dateTime = new Date(Number(numb) / 1e4 - 1.16444736e13);
            if(dateTime.getFullYear()>2400)
                dateTime.setFullYear(2499);
            return dateTime;
        }
        return new Date();
    }

};