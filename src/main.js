/**
 * Sholat Time Slack Notification v1.0
 * 
 * author : rio.bastian@metraplasa.co.id
 * created : 2017-12-07 20:09
 */
var cron    = require('cron').CronJob;
var time    = require('cron').CronTime;
var tools   = require('./tools');
var request = require('sync-request');
var concat  = require('concat-stream');

var t_ashar; var r_ashar;
var t_dzhur; var r_dzuhr;
var t_magrb; var r_magrb;
var t_ishaa; var r_ishaa;
var t_subuh; var r_subuh;

// Constant, Minutes before sending notification
const REMIND_IN_MINUTE = 10;
const SLACK_CHWEB_HOOK = 'https://hooks.slack.com/services/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';
const ADZAN_PUBLIIC_WS = 'http://api.aladhan.com/timingsByCity?city=Jakarta&country=ID&method=5';

var PrayerTimes = {
    // Get Sholat Time from api.aladhan.com
    reload : function(){
        var res = request('GET', ADZAN_PUBLIIC_WS);
        var parsedJson = JSON.parse(res.getBody());

        // Set Actual Adzan Times
        r_dzuhr = tools.toTimeObject(parsedJson.data.timings.Dhuhr);
        r_ashar = tools.toTimeObject(parsedJson.data.timings.Asr);
        r_magrb = tools.toTimeObject(parsedJson.data.timings.Maghrib);
        r_ishaa = tools.toTimeObject(parsedJson.data.timings.Isha);
        r_subuh = tools.toTimeObject(parsedJson.data.timings.Fajr);

        // Set Adzan Notification Times
        t_dzhur = tools.subtractMinute(r_dzuhr , REMIND_IN_MINUTE);
        t_ashar = tools.subtractMinute(r_ashar , REMIND_IN_MINUTE);
        t_magrb = tools.subtractMinute(r_magrb , REMIND_IN_MINUTE);
        t_ishaa = tools.subtractMinute(r_ishaa , REMIND_IN_MINUTE);
        t_subuh = tools.subtractMinute(r_subuh , REMIND_IN_MINUTE);

        /*
         * Set Job Times, for first time should be undefined,
         * adjust Adzan times every reload.
         */
        if(JobDzuhur) JobDzuhur.setTime(this.newCronTime(t_dzhur));
        if(JobAshar) JobAshar.setTime(this.newCronTime(t_ashar));
        if(JobMagrib) JobMagrib.setTime(this.newCronTime(t_magrb));
        if(JobIsya) JobIsya.setTime(this.newCronTime(t_ishaa));
        if(JobSubuh) JobSubuh.setTime(this.newCronTime(t_subuh));

        // Success log
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
                "Waktu *" + n + "* hari ini pukul *" + t.hours + ":" + t.minutes + " WIB*";
    },
    // Notify generated Message
    doTask : function(adzanTimes, adzanLabel){
        var msg = this.message(adzanTimes, adzanLabel);
        console.log(new Date() + " - " + msg);
        this.notify(msg);
    },
    // Prepare Cron Format, based on adzan times
    cronFormat : function(adzanTimes){
        return '00 ' + adzanTimes.minutes + ' ' + adzanTimes.hours + ' * * *'
    },
    // Prepare CronTime, based on adzan times
    newCronTime : function(adzanTimes){
        return new time(this.cronFormat(adzanTimes));
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
var JobDzuhur = new cron({
    cronTime: PrayerTimes.cronFormat(t_dzhur),
    onTick: function() {
        PrayerTimes.doTask(r_dzhur, "Dzuhur");
    },
    start: true
});

/**
 * Job Sholat Ashar
 */
var JobAshar = new cron({
    cronTime: PrayerTimes.cronFormat(t_ashar),
    onTick: function() {
        PrayerTimes.doTask(r_ashar, "Ashar");
    },
    start: true
});

/**
 * Job Sholat Magrib
 */
var JobMagrib = new cron({
    cronTime: PrayerTimes.cronFormat(t_magrb),
    onTick: function() {
        PrayerTimes.doTask(r_magrb, "Magrib");
    },
    start: true
});

/**
 * Job Sholat Isya
 */
var JobIsya = new cron({
    cronTime: PrayerTimes.cronFormat(t_ishaa),
    onTick: function() {
        PrayerTimes.doTask(r_ishaa, "Isya");
    },
    start: true
});

/**
 * Job Sholat Subuh
 */
var JobSubuh = new cron({
    cronTime: PrayerTimes.cronFormat(t_subuh),
    onTick: function() {
        PrayerTimes.doTask(r_subuh, "Subuh");
    },
    start: true
});