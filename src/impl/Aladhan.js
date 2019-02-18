var request = require('sync-request');
var Adzan   = require('../api/Adzan');

/**
 * Aladhan, 
 * Aladhan is one of the Free Adzan API,
 * This is the class which implement AdzanEndpoint.
 * 
 * author : rio.bastian
 * created : 2019-02-18 14:22
 */
class Aladhan extends Adzan {
    /*
     * Default Constructor
     */
    constructor(){
        super();
        this.charge();
    }
    /*
     * Aladhan Endpoint API
     */
    endpoint(){
        return 'http://api.aladhan.com/timingsByCity?city=Jakarta&country=ID&method=5';
    }
    /*
     * Charge API
     * @Override
     */
    charge(){
        var res = request('GET', this.endpoint());
        this.parsedJson = JSON.parse(res.getBody());
        console.log(this.parsedJson.data.timings);
    }
    /*
     * Get Dzuhur Time
     * @Override
     */
    getDzuhur(){
        return this.parsedJson.data.timings.Dhuhr;
    }
    /*
     * Get Ashar Time
     * @Override
     */
    getAshar(){
        return this.parsedJson.data.timings.Asr;
    }
    /*
     * Get Maghrib Time
     * @Override
     */
    getMaghrib(){
        return this.parsedJson.data.timings.Maghrib;
    }
    /*
     * Get Isya Time
     * @Override
     */
    getIsya(){
        return this.parsedJson.data.timings.Isha;
    }
    /*
     * Get Subuh Time
     * @Override
     */
    getSubuh(){
        return this.parsedJson.data.timings.Fajr;
    }
}

// Expose the Class
module.exports = Aladhan;