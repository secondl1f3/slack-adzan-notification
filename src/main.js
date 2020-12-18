/**
 * Sholat Time Slack Notification v1.0
 * 
 * author : rio.bastian@metraplasa.co.id
 * created : 2017-12-07 20:09
 */
var cronjob  = require('cron').CronJob;
var schedule = require('./schedule');
var constant = require('./constant');

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
        // Aladhan
        var Aladhan = require('./impl/Aladhan');
        let adzan   = new Aladhan();
        // Kemenag RI
        // var Kemenag = require('./impl/Kemenag');
        // let adzan   = new Kemenag();

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

        console.log("Reload Sholat Time, success " + new Date());
    }
};

// Success log
console.log("-- Slack Adzan Notification started.")
console.log("-- Parameter : ")
console.log("-- Channel Web Hook [" + constant.SLACK_CHWEB_HOOK + "]");
console.log("-- Location Country [" + constant.LOCATION_COUNTRY + "]");
console.log("-- Location City    [" + constant.LOCATION_CITY + "]");
console.log("--")

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