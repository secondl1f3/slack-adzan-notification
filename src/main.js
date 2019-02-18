/**
 * Sholat Time Slack Notification v1.0
 * 
 * author : rio.bastian@metraplasa.co.id
 * created : 2017-12-07 20:09
 */
var cronjob  = require('cron').CronJob;
var schedule = require('./schedule');

var adzanDzuhur,
    adzanAshar,
    adzanMaghrib,
    adzanIsya,
    adzanSubuh;

var PrayerTimes = {
    // Get Sholat Time from api.aladhan.com
    reload : function(){
        /*
         * Adzan Endpoint, 
         * you can add the implementation at ../impl/.., 
         * and adjust the assignment in the following line code
         */
        var Aladhan = require('./impl/Aladhan');
        let adzan   = new Aladhan();

        // Set Adzan Dzuhur Notification
        if(adzanDzuhur){
            adzanDzuhur.stop();
        }
        adzanDzuhur = schedule.setDzuhurTimes(adzan);

        // Set Adzan Ashar Notification
        if(adzanAshar){
            adzanAshar.stop();
        }
        adzanAshar = schedule.setAsharTimes(adzan);

        // Set Adzan Maghrib Notification
        if(adzanMaghrib){
            adzanMaghrib.stop();
        }
        adzanMaghrib = schedule.setMaghribTimes(adzan);

        // Set Adzan Isya Notification
        if(adzanIsya){
            adzanIsya.stop();
        }
        adzanIsya = schedule.setIsyaTimes(adzan);

        // Set Adzan Subuh Notification
        if(adzanSubuh){
            adzanSubuh.stop();
        }
        adzanSubuh = schedule.setSubuhTimes(adzan);

        // Success log
        console.log("Reload Sholat Time, success " + new Date());
    }
};

// Do Reload at First launch
PrayerTimes.reload();

/**
 * Crawl Adzan times every midnight
 */
new cronjob({
    cronTime: '00 30 01 * * *',
    onTick: function() {
        PrayerTimes.reload();
    },
    start : true
});