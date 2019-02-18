/**
 * adzan.js
 * Used to initilize Adzan Times
 * 
 * author : rio.bastian
 * created : 2019-02-14 11:40
 */
var cron    = require('cron').CronJob;
var notif   = require('./notification');
var common  = require('./common');
var constn  = require('./constant');

module.exports = {
    /**
     * Set Adzan Dzuhur Schedule Time
     * @param {*} adzan 
     */
    setDzuhurTimes(adzan){
        return this.setTimes(adzan.getDzuhur(), "Dzuhur");
    },
    /**
     * Set Adzan Ashar Schedule Time
     * @param {*} adzan 
     */
    setAsharTimes(adzan){
        return this.setTimes(adzan.getAshar(), "Ashar");
    },
    /**
     * Set Adzan Maghrib Schedule Time
     * @param {*} adzan 
     */
    setMaghribTimes(adzan){
        return this.setTimes(adzan.getMaghrib(), "Maghrib");
    },
    /**
     * Set Adzan Isya Schedule Time
     * @param {*} adzan 
     */
    setIsyaTimes(adzan){
        return this.setTimes(adzan.getIsya(), "Isya");
    },
    /**
     * Set Adzan Subuh Schedule Time
     * @param {*} adzan 
     */
    setSubuhTimes(adzan){
        return this.setTimes(adzan.getSubuh(), "Subuh");
    },
    /**
     * Initialize Adzan Times
     * @param {*} times 
     * @param {*} label 
     */
    setTimes : function(times, label){
        // Convert Time String to Adzan Times
        var objectTimes = common.toTimeObject(times);
        // Adzan times notification, 
        // set to be notfied 10 minute before Actual Adzan Times.
        var notifyTimes = common.subtractMinute(objectTimes , constn.REMIND_IN_MINUTE);

        return new cron({
            cronTime: this.cronFormat(notifyTimes),
            onTick: function() {
                notif.notify(objectTimes, label);
            }, 
            start: true
        });
    },
    /**
     * Prepare Cron Format, based on adzan times
     * @param {*} times 
     */
    cronFormat : function(times){
        return '00 ' + times.minutes + ' ' + times.hours + ' * * *';
    }
}