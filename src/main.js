/**
 * Sholat Time Slack Notification v1.0
 * 
 * author : rio.bastian@metraplasa.co.id
 * created : 2017-12-07 20:09
 */
var cron    = require('cron').CronJob;
var tools   = require('./tools');
var request = require('sync-request');
var concat  = require('concat-stream');

var t_ashar;
var t_dzhur;
var t_magrb;
var t_ishaa;
var t_subuh;

// Constant, Minutes before sending notification
const REMIND_IN_MINUTE = 10;
const SLACK_CHWEB_HOOK = 'https://hooks.slack.com/services/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';
const ADZAN_PUBLIIC_WS = 'http://api.aladhan.com/timingsByCity?city=Jakarta&country=ID&method=2';

var PrayerTimes = {
    // Get Sholat Time from api.aladhan.com
    reload : function(){
        var res = request('GET', ADZAN_PUBLIIC_WS);
        var parsedJson = JSON.parse(res.getBody());

        t_dzhur = tools.subtractMinute(parsedJson.data.timings.Dhuhr   , REMIND_IN_MINUTE);
        t_ashar = tools.subtractMinute(parsedJson.data.timings.Asr     , REMIND_IN_MINUTE);
        t_magrb = tools.subtractMinute(parsedJson.data.timings.Maghrib , REMIND_IN_MINUTE);
        t_ishaa = tools.subtractMinute(parsedJson.data.timings.Isha    , REMIND_IN_MINUTE);
        t_subuh = tools.subtractMinute(parsedJson.data.timings.Fajr    , REMIND_IN_MINUTE);

        console.log("Reload Sholat Time, success " + new Date());
        console.log(parsedJson.data.timings);
    },
    // Notify to Slack
    notify : function(note){
        var resn = request('POST', SLACK_CHWEB_HOOK, {
            json: { "text" : note }
        });
    },
    // Message Generator
    message : function(t, n){
        return  "<!channel> \n" +
                "Assalamualaikum, Ikhwan fillah,.\n" +
                "*" + REMIND_IN_MINUTE + "* menit lagi masuk waktu " + n + ", yuk siap siap sholat\n" +
                "Waktu " + n + " hari ini pukul *" + t.hours + ":" + t.minutes + " WIB*";
    },
    // Notify generated Message
    doTask : function(adzanTimes, adzanLabel){
        var msg = PrayerTimes.message(adzanTimes, adzanLabel);
        console.log(new Date() + " - " + msg);
        PrayerTimes.notify(msg);
    }
};

// Do Reload at First launch
PrayerTimes.reload();

/**
 * Crawl Adzan times every midnight
 */
new cron({
    cronTime: '00 30 01 * * *',
    onTick: function() {
        PrayerTimes.reload();
    },
    start : true
});

/**
 * Job Sholat Dzuhur
 */
new cron({
    cronTime: '00 ' + t_dzhur.minutes + ' ' + t_dzhur.hours + ' * * *',
    onTick: function() {
        PrayerTimes.doTask(t_dzhur, "Dzuhur");
    },
    start: true
});

/**
 * Job Sholat Ashar
 */
new cron({
    cronTime: '00 ' + t_ashar.minutes + ' ' + t_ashar.hours + ' * * *',
    onTick: function() {
        PrayerTimes.doTask(t_ashar, "Ashar");
    },
    start: true
});

/**
 * Job Sholat Magrib
 */
new cron({
    cronTime: '00 ' + t_magrb.minutes + ' ' + t_magrb.hours + ' * * *',
    onTick: function() {
        PrayerTimes.doTask(t_magrb, "Magrib");
    },
    start: true
});

/**
 * Job Sholat Isya
 */
new cron({
    cronTime: '00 ' + t_ishaa.minutes + ' ' + t_ishaa.hours + ' * * *',
    onTick: function() {
        PrayerTimes.doTask(t_ishaa, "Isya");
    },
    start: true
});

/**
 * Job Sholat Subuh
 */
new cron({
    cronTime: '00 ' + t_subuh.minutes + ' ' + t_subuh.hours + ' * * *',
    onTick: function() {
        PrayerTimes.doTask(t_subuh, "Subuh");
    },
    start: true
});

