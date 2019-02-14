/**
 * slack.js
 * Used to Send Notification to Slack
 * 
 * author : rio.bastian
 * created : 2019-02-14 11:40
 */
var request = require('sync-request');
var constn  = require('./constant');

module.exports = {
    /*
     * Slack Notification Procedure
     * parameter :
     * - message (message to be notified)
     * 
     */
    call : function(message){
        var resn = request('POST', constn.SLACK_CHWEB_HOOK, {
            json: { "text" : message }
        });
    },
    /*
     * Message Formatter
     * parameter :
     * - adzanTimes (Adzan Times)
     * - adzanLabel (Adzan Label)
     * 
     */
    msgformat : function(adzanTimes, adzanLabel){
        return  "<!channel> \n" +
                "Assalamualaikum, Ikhwan fillah,.\n" +
                "*" + constn.REMIND_IN_MINUTE + "* menit lagi masuk waktu " + adzanLabel + ", yuk siap siap sholat\n" +
                "Waktu *" + adzanLabel + "* hari ini pukul *" + adzanTimes.hours + ":" + adzanTimes.minutes + " WIB.*";
    },
    /*
     * Notify generated Message to Slack
     * parameter :
     * - adzanTimes (Adzan Times)
     * - adzanLabel (Adzan Label)
     * 
     */
    notify : function(adzanTimes, adzanLabel){
        this.call(
            this.msgformat(
                adzanTimes, adzanLabel));
    }
}