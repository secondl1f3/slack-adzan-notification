/**
 * Sholat Time Slack Notification v1.0
 * Created By rio.bastian@metraplasa.co.id
 * Created on  07/12/2017 20:09 PM
 */

var cron = require('cron');
var request = require('sync-request');
var concat = require('concat-stream');

var factor = 10;
var t_ashar;
var t_dzhur;
var t_magrb;
var t_subuh;

var PrayerTimes = {
        // Get Sholat Time from api.aladhan.com
        reload : function(){
                var res = request('GET', 'http://api.aladhan.com/timingsByCity?city=Jakarta&country=ID&method=2');
                var parsedJson = JSON.parse(res.getBody());

                var p_dzhur = parsedJson.data.timings.Dhuhr.split(":");
                t_dzhur = {
                        hours   : p_dzhur[0],
                        minutes : p_dzhur[1],
                };
                
                var p_ashar = parsedJson.data.timings.Asr.split(":");
                t_ashar = {
                        hours   : p_ashar[0],
                        minutes : p_ashar[1],
                };
                
                var p_magrb = parsedJson.data.timings.Maghrib.split(":");
                t_magrb = {
                        hours   : p_magrb[0],
                        minutes : p_magrb[1],
                };
                
                var p_subuh = parsedJson.data.timings.Fajr.split(":");
                t_subuh = {
                        hours   : p_subuh[0],
                        minutes : p_subuh[1],
                };
                console.log("Reload Sholat Time, success " + new Date());
                console.log(parsedJson.data.timings);
        },
        // Put your slack Web Hook below
        notify : function(note){
                var resn = request('POST', 'https://hooks.slack.com/services/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', {
                        json: { "text" : note }
                });
        },
        // Centralize Message Generator
        generateMsg : function(t, n){
                return  "<!channel> \n" +
                        "Assalamualaikum, Ikhwan fillah,. \n" +
                        factor + " menit lagi masuk waktu " + n + ", yuk siap siap sholat\n" +
                        "Waktu " + n + " hari ini pukul " + t.hours + ":" + t.minutes + " WIB";
        }
};

var GeneralUtil = {
	normalizeMinute : function(n){
		var d = parseInt(n) - factor;
		if(d < 0){
			return 0;
		} else {
			return d;
		}
	}
};

// DO Reload at First launch
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
        cronTime: '00 ' + GeneralUtil.normalizeMinute(t_dzhur.minutes) + ' ' + t_dzhur.hours + ' * * *',
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
        cronTime: '00 ' + GeneralUtil.normalizeMinute(t_ashar.minutes) + ' ' + t_ashar.hours + ' * * *',
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
        cronTime: '00 ' + GeneralUtil.normalizeMinute(t_magrb.minutes) + ' ' + t_magrb.hours + ' * * *',
        onTick: function() {
                var msg = PrayerTimes.generateMsg(t_magrb, "Magrib");
                console.log(new Date() + " - " + msg);
                PrayerTimes.notify(msg);
        },
        start: false
});
JobNotifyPrayerTimesMagrib.start();

/**
 * Send Sholat Notification to slack 10 minutes before Sholat Subuh
 */
 var JobNotifyPrayerTimesSubuh = new cron.CronJob({
        cronTime: '00 ' + GeneralUtil.normalizeMinute(t_subuh.minutes) + ' ' + t_subuh.hours + ' * * *',
        onTick: function() {
                var msg = PrayerTimes.generateMsg(t_subuh, "Subuh");
                console.log(new Date() + " - " + msg);
                PrayerTimes.notify(msg);
        },
        start: false
});
JobNotifyPrayerTimesSubuh.start();

