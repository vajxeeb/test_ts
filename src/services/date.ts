
const moment = require('moment-timezone')
export default class CustomDate {

    public static getDateTime() {
        const DATE_TIME = moment().tz("Asia/Bangkok")._d;
        return DATE_TIME;
    }
    public static getTime() {
        const t = moment().tz("Asia/Bangkok");
        const TIME = t.toString().substring(16, 25);
        return TIME;
    }
    public static getDate() {
        const DATE = moment().tz("Asia/Bangkok").format(moment.HTML5_FMT.DATE);
        return DATE;
    }
}
