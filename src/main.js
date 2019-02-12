/**
 * Sholat Time Slack Notification v1.0
 * 
 * author : rio.bastian@metraplasa.co.id
 * created : 2017-12-07 20:09
 */
var cron    = require('cron');
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
const SLACK_CHWEB_HOOK = 'https://hooks.slack.com/services/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'
const ADZAN_PUBLIIC_WS = 'http://api.aladhan.com/timingsByCity?city=Jakarta&country=ID&method=2';

var PrayerTimes = {
    // Get Sholat Time from api.aladhan.com
    reload : function(){
        var res = request('GET', ADZAN_PUBLIIC_WS);
        var parsedJson = JSON.parse(res.getBody());

        t_dzhur = tools.subtractMinuteCron(parsedJson.data.timings.Dhuhr   , REMIND_IN_MINUTE);
        t_ashar = tools.subtractMinuteCron(parsedJson.data.timings.Asr     , REMIND_IN_MINUTE);
        t_magrb = tools.subtractMinuteCron(parsedJson.data.timings.Maghrib , REMIND_IN_MINUTE);
        t_ishaa = tools.subtractMinuteCron(parsedJson.data.timings.Isha    , REMIND_IN_MINUTE);
        t_subuh = tools.subtractMinuteCron(parsedJson.data.timings.Fajr    , REMIND_IN_MINUTE);

        console.log("Reload Sholat Time, success " + new Date());
        console.log(parsedJson.data.timings);
    },
    // Notify to Slack
    notify : function(note){
        var resn = request('POST', SLACK_CHWEB_HOOK, {
            json: { "text" : note }
        });
    },
    // Centralize Message Generator
    generateMsg : function(t, n){
        return  "<!channel> \n" +
                "Assalamualaikum, Ikhwan fillah,. \n" +
                REMIND_IN_MINUTE + " menit lagi masuk waktu " + n + ", yuk siap siap sholat\n" +
                "Waktu " + n + " hari ini pukul " + t.hours + ":" + t.minutes + " WIB";
    }
};

// Do Reload at First launch
PrayerTimes.reload();

/**
 * Crawl Adzan times every midnight
 */
var JobPrayerTimes = new cron.CronJob({
    cronTime: '00 30 01 * * *',
    onTick: function() {
        PrayerTimes.reload();
    },
    start: false
});
JobPrayerTimes.start();

/**
 * Send Sholat Notification to slack 10 minutes before Sholat Dzuhur
 */
var JobNotifyPrayerTimesDzuhur = new cron.CronJob({
    cronTime: '00 ' + t_dzhur.minutes + ' ' + t_dzhur.hours + ' * * *',
    onTick: function() {
        var msg = PrayerTimes.generateMsg(t_dzhur, "Dzuhur");
            console.log(new Date() + " - " + msg);
            PrayerTimes.notify(msg);
    },
    start: false
});
JobNotifyPrayerTimesDzuhur.start();

/**
 * Send Sholat Notification to slack 10 minutes before Sholat Ashar
 */
var JobNotifyPrayerTimesAshar = new cron.CronJob({
    cronTime: '00 ' + t_ashar.minutes + ' ' + t_ashar.hours + ' * * *',
    onTick: function() {
        var msg = PrayerTimes.generateMsg(t_ashar, "Ashar");
        console.log(new Date() + " - " + msg);
        PrayerTimes.notify(msg);
    },
    start: false
});
JobNotifyPrayerTimesAshar.start();

/**
 * Send Sholat Notification to slack 10 minutes before Sholat Magrib
 */
var JobNotifyPrayerTimesMagrib = new cron.CronJob({
    cronTime: '00 ' + t_magrb.minutes + ' ' + t_magrb.hours + ' * * *',
    onTick: function() {
        var msg = PrayerTimes.generateMsg(t_magrb, "Magrib");
        console.log(new Date() + " - " + msg);
        PrayerTimes.notify(msg);
    },
    start: false
});
JobNotifyPrayerTimesMagrib.start();

/**
 * Send Sholat Notification to slack 10 minutes before Sholat Isha
 */
var JobNotifyPrayerTimesIsha = new cron.CronJob({
    cronTime: '00 ' + t_ishaa.minutes + ' ' + t_ishaa.hours + ' * * *',
    onTick: function() {
        var msg = PrayerTimes.generateMsg(t_ishaa, "Isha");
        console.log(new Date() + " - " + msg);
        PrayerTimes.notify(msg);
    },
    start: false
});
JobNotifyPrayerTimesIsha.start();

/**
 * Send Sholat Notification to slack 10 minutes before Sholat Subuh
 */
var JobNotifyPrayerTimesSubuh = new cron.CronJob({
    cronTime: '00 ' + t_subuh.minutes + ' ' + t_subuh.hours + ' * * *',
    onTick: function() {
        var msg = PrayerTimes.generateMsg(t_subuh, "Subuh");
        console.log(new Date() + " - " + msg);
        PrayerTimes.notify(msg);
    },
    start: false
});
JobNotifyPrayerTimesSubuh.start();

