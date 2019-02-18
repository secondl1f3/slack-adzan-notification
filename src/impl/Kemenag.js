var formentity = require('form-urlencoded').default;
var dateformat = require('dateformat');
var request    = require('sync-request');
var Adzan      = require('../api/Adzan');

/**
 * Kemenag, 
 * Kemenag is Adzan API from Kementrian Agama RI,
 * This is the class which implement Adzan.
 * 
 * author : rio.bastian
 * created : 2019-02-18 14:22
 */
class Kemenag extends Adzan {
    /*
     * Default Constructor
     */
    constructor(){
        super();
        this.charge();
    }
    /*
     * Kemenag Endpoint API
     */
    endpoint(){
        return 'https://bimasislam.kemenag.go.id/ajax/getShalatbln';
    }
    /*
     * Encrypted Province (DKI Jakarta)
     */
    provinsi(){
        return 'yY1joPRsIUoHPRR%2B1bcpqJkxfMscZ71EePZh%2F572aRiZjPeYTwVGBZ2D83PbLO3M%2FnQ2E%2Bgo9%2BxSAtRyghMujw%3D%3D';
    }
    /*
     * Encrypted City (Kota Jakarta)
     */
    kabupaten(){
        return 'C7YCdurJq9xFXDoFk4UmP88%2FW38HtIsHhI0pQ6OKLS%2BKG4tfH2xV%2BtmUdhWP5QB8jU179M7SZu7tpYYdzyeByg%3D%3D';
    }
    /*
     * Encryption Key
     */
    key(){
        return 'PHPSESSID=ikbdcrpii29le25uf7rvcpbtf0';
    }
    /*
     * Content Type
     */
    type(){
        return 'application/x-www-form-urlencoded';
    }
    /*
     * Charge API
     * @Override
     */
    charge(){
        // Prepare Parameter
        var today = new Date();
        var respn = request('POST', this.endpoint(), {
            headers: {
                'Content-Type' : this.type(),
                'Cookie' : this.key()
            },
            body: formentity({
                x : this.provinsi(),
                y : this.kabupaten(),
                bln : today.getMonth() + 1,
                thn : today.getFullYear()
            })
        });

        // Prepare Result
        var datef = dateformat(today, 'yyyy-mm-dd');
        this.parsedJson = JSON.parse(respn.getBody()).data[datef];
        console.log(this.parsedJson);
    }
    /*
     * Get Dzuhur Time
     * @Override
     */
    getDzuhur(){
        return this.parsedJson.dzuhur;
    }
    /*
     * Get Ashar Time
     * @Override
     */
    getAshar(){
        return this.parsedJson.ashar;
    }
    /*
     * Get Maghrib Time
     * @Override
     */
    getMaghrib(){
        return this.parsedJson.maghrib;
    }
    /*
     * Get Isya Time
     * @Override
     */
    getIsya(){
        return this.parsedJson.isya;
    }
    /*
     * Get Subuh Time
     * @Override
     */
    getSubuh(){
        return this.parsedJson.subuh;
    }
}

// Expose the Class
module.exports = Kemenag;