const datejs = require('datejs')
// used to convert dates to a readable format
module.exports = function dateFormat(timestamp) {
    const date = new Date(timestamp).toString("d-MMM-yyyy hh:mm tt");
    return date
}