/**
 * notification.js
 * Used to Send Notification to Slack
 * 
 * author : rio.bastian
 * created : 2019-02-14 11:40
 */
var request = require('sync-request');
var constn  = require('./constant');
var format  = require('string-format');

module.exports = {
    /**
     * Slack Notification Procedure
     * @param {*} message 
     */
    call : function(message){
        console.log(new Date() + " " + message);
        var resn = request('POST', constn.SLACK_CHWEB_HOOK, {
            json: { "text" : message }
        });
    },
    /**
     * Message Formatter
     * @param {*} adzanTimes 
     * @param {*} adzanLabel 
     */
    msgformat : function(adzanTimes, adzanLabel){
        return format(
                '<!channel>{0}'+
                'Assalamualaikum, Ikhwan fillah,.{0}'+
                '*{1}* menit lagi masuk waktu {2}, yuk siap siap sholat.{0}'+
                'Waktu *{2}* hari ini pukul *{3}:{4} WIB.*', 
                '\n', constn.REMIND_IN_MINUTE, adzanLabel, 
                adzanTimes.hours, adzanTimes.minutes);
    },
    /**
     * Notify generated Message to Slack
     * @param {*} adzanTimes 
     * @param {*} adzanLabel 
     */
    notify : function(adzanTimes, adzanLabel){
        this.call(
            this.msgformat(
                adzanTimes, adzanLabel));
    }
}