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
     * @param {*} param 
     * @returns {*} {
     *     hours : hours-value, 
     *     minutes : minute-value
     *  }
     */
    toTimeObject : function(param){
        var d = param.split(":");
        return {
            hours : d[0], 
            minutes : d[1]
        } 
    },
    /**
     * Subtract Formatted Minute
     * @param {*} time 
     * @param {*} minute
     * @returns {*} Substracted TimesObject 
     */
    subtractMinute : function(time, minute){
        return this.toTimeObject(
                this.subtractMinuteFormat(
                    time, minute, "HH:MM"));
        
    }, 
    /**
     * Subtract Minute, with formatted Times String
     * @param {*} time 
     * @param {*} minute 
     * @param {*} formatResult 
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