
//import moment from "moment-timezone"
const moment = require('moment-timezone')
export default class CustomDate {

    public static getDate() {
        const DATE = moment().tz("Asia/Bangkok");
        return DATE._d;
    }
    public static Onlytime() {
        const t = moment().tz("Asia/Bangkok");
        const TIME = t.toString().substring(16, 25);
        return TIME;
    }
    public static OnlyDate() {
        const date = new Date(Date.now());
        const year = date.getFullYear().toString();
        let month = date.getMonth().toString();
        let day = date.getDate().toString();
        if (month.length == 1) month = '0' + month
        if (day.length == 1) day = '0' + day
        const DATE = year + '-' + month + '-' + day;
        return DATE;
    }
}
