/**
 * tools.js
 * Used to collecting all common utility function
 * 
 * author : rio.bastian
 * created : 2019-02-12 14:45
 */
var dateformat = require('dateformat');

// Millisecond number in 1 minute
const MS_PER_MINUTE = 60000;

module.exports = {
	normalizeMinute : function(n){
		var d = parseInt(n) - factor;
		if(d < 0){
			return 0;
		} else {
			return d;
		}
    },
    /*
     * Subtract Formatted Minute, 
     * parameter :
     * - param (should be as the following format, e.g. 15:30)
     * - minute (minute reference)
     */
    subtractMinuteCron : function(param, minute){
        var d = this.subtractMinuteFormat(param, minute, "HH:MM").split(":");
        return {
            hours : d[0], 
            minutes : d[1]
        }
    }, 
    /*
     * Subtract Formatted Minute, 
     * parameter :
     * - param (should be as the following format, e.g. 15:30)
     * - minute (minute reference)
     * - formatResult (date format)
     */
    subtractMinuteFormat : function(param, minute, formatResult){
        // Extract Hours and Minutes
        time = param.split(":");

        // Prepare Temporary Date
        var d1 = new Date();
        d1.setHours(time[0]);
        d1.setMinutes(time[1]);

        // Subtract Date
        var d2 = new Date(d1.getTime() - minute * MS_PER_MINUTE);
        return dateformat(d2, formatResult);
    }
};