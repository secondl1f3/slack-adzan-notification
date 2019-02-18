/**
 * Interface act Adzan
 * 
 * author : rio.bastian
 * created : 2019-02-18 14:22
 */
class Adzan {
    /*
     * Default Constructor
     */
    constructor(){
        // do nothing
    }
    /**
     * Charge Endpoint
     */
    charge(){
        throw new Error('Should be implemented');
    }
    /*
     * Get Dzuhur Times, 
     * should be return the following time format "00:00"
     * in 24 hr base.
     */
    getDzuhur(){
        throw new Error('Should be implemented');
    }
    /*
     * Get Ashar Times, 
     * should be return the following time format "00:00"
     * in 24 hr base.
     */
    getAshar(){
        throw new Error('Should be implemented');
    }
    /*
     * Get Maghrib Times, 
     * should be return the following time format "00:00"
     * in 24 hr base.
     */
    getMaghrib(){
        throw new Error('Should be implemented');
    }
    /*
     * Get Isya Times, 
     * should be return the following time format "00:00"
     * in 24 hr base.
     */
    getIsya(){
        throw new Error('Should be implemented');
    }
    /*
     * Get Subuh Times, 
     * should be return the following time format "00:00"
     * in 24 hr base.
     */
    getSubuh(){
        throw new Error('Should be implemented');
    }
}

// Expose the class
module.exports = Adzan;