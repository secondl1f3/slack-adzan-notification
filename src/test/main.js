/**
 * Test :: Subtract Minute
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
var Kemenag = require('../impl/Kemenag');
//let adzan   = new Aladhan();
let adzan   = new Kemenag();
console.log(adzan.getDzuhur());
console.log(adzan.getAshar());
console.log(adzan.getMaghrib());
console.log(adzan.getIsya());
console.log(adzan.getSubuh());

/**
 * Test :: Notification Message Format
 */
console.log(notif.msgformat(tools.toTimeObject("18:05"),'Magrib'));