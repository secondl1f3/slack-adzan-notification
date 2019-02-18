/**
 * Test :: Subtract Minute
 *
 */
var tools = require("../common");

var adzantimes1 = tools.toTimeObject("15:05");
var adzantimes2 = tools.toTimeObject("15:05");

console.log(adzantimes1);
console.log(tools.subtractMinute(adzantimes1, 10));
console.log(adzantimes2);
console.log(tools.subtractMinute(adzantimes2, 10));

/**
 * Test :: Adzan Endpoint
 */
var Aladhan = require('../impl/Aladhan');
let adz = new Aladhan();
console.log(adz.parsedJson);
console.log(adz.getDzuhur());
console.log(adz.getAshar());
console.log(adz.getMaghrib());
console.log(adz.getIsya());
console.log(adz.getSubuh());
