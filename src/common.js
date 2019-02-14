/**
 * tools.js
 * Used to collecting all common utility function
 * 
 * author : rio.bastian
 * created : 2019-02-12 14:45
 */
var constn     = require('./constant');
var dateformat = require('dateformat');

module.exports = {
    /**
     * Convert string time to object
     * {
     *     hours : {{hours}}, 
     *     minutes : {{minutes}}
     *  }
     * 
     */
    toTimeObject : function(param){
        var d = param.split(":");
        return {
            hours : d[0], 
            minutes : d[1]
        } 
    },
    /*
     * Subtract Formatted Minute, 
     * parameter :
     * - time (should be as the following format, e.g. 15:30)
     * - minute (minute reference)
     * return :
     * time Object
     * 
     */
    subtractMinute : function(time, minute){
        return this.toTimeObject(
                this.subtractMinuteFormat(
                    time, minute, "HH:MM"));
        
    }, 
    /*
     * Subtract Formatted Minute, 
     * parameter :
     * - time (should be as the following format, e.g. 15:30)
     * - minute (minute reference)
     * - formatResult (date format)
     * return :
     * plain text with specific date format
     * 
     */
    subtractMinuteFormat : function(time, minute, formatResult){
        // Prepare Temporary Date
        var d1 = new Date();
        d1.setHours(time.hours);
        d1.setMinutes(time.minutes);

        // Subtract Date
        var d2 = new Date(d1.getTime() - minute * constn.MILIS_PER_MINUTE);
        return dateformat(d2, formatResult);
    }
};