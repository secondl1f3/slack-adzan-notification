/**
 * adzan.js
 * Used to initilize Adzan Times
 * 
 * author : rio.bastian
 * created : 2019-02-14 11:40
 */
var cron    = require('cron').CronJob;
var slack   = require('./slack');
var tools   = require('./tools');
var constn  = require('./constant');

module.exports = {
    /*
     * Initialize Adzan Times
     * parameter :
     * - cronjob (supose to be CronJob object)
     * - times (adzan times string)
     * - label
     * 
     */
    setTimes : function(cronjob, times, label){
        // Validate Cron Job
        if(cronjob){
            cronjob.stop();
        }
        
        // Convert Time String to Adzan Times
        var adzanTimes  = tools.toTimeObject(times);
        // Adzan times notification, 
        // set to be notfied 10 minute before Actual Adzan Times.
        var notifyTimes = tools.subtractMinute(adzanTimes , constn.REMIND_IN_MINUTE);

        cronjob = new cron({
            cronTime: this.cronFormat(notifyTimes),
            onTick: function() {
                slack.notify(adzanTimes, label);
            }, 
            start: true
        });
    },
    /*
     * Prepare Cron Format, based on adzan times
     * parameter :
     * - times (adzan times string)
     * 
     */
    cronFormat : function(times){
        return '00 ' + times.minutes + ' ' + times.hours + ' * * *';
    }
}