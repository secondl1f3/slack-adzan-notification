/**
 * Sholat Time Slack Notification v1.0
 * 
 * author : rio.bastian@metraplasa.co.id
 * created : 2017-12-07 20:09
 */
var adzan   = require('./adzan');
var constn  = require('./constant');
var request = require('sync-request');
var cronjob = require('cron').CronJob;

var adzanDzuhur,
    adzanAshar,
    adzanMagrib,
    adzanIsya,
    adzanSubuh;

var PrayerTimes = {
    // Get Sholat Time from api.aladhan.com
    reload : function(){
        var res = request('GET', constn.ADZAN_PUBLIIC_WS);
        var parsedJson = JSON.parse(res.getBody());

        // Set Adzan Notification Times
        adzan.setTimes(adzanDzuhur  , parsedJson.data.timings.Dhuhr   , "Dzuhur");
        adzan.setTimes(adzanAshar   , parsedJson.data.timings.Asr     , "Ashar");
        adzan.setTimes(adzanMagrib  , parsedJson.data.timings.Maghrib , "Maghrib");
        adzan.setTimes(adzanIsya    , parsedJson.data.timings.Isha    , "Isya");
        adzan.setTimes(adzanSubuh   , parsedJson.data.timings.Fajr    , "Subuh");

        // Success log
        console.log("Reload Sholat Time, success " + new Date());
        console.log(parsedJson.data.timings);
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