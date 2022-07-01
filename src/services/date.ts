
//import moment from "moment-timezone"
const moment = require('moment-timezone')
export default class CustomDate {
   
    public static getDate() {
        const t = moment().tz("Asia/Bangkok");
        return t._d
    }
    public static Onlytime() {
        const t = moment().tz("Asia/Bangkok");
        let time = t.toString().substring(16, 25)
        return time
    }
    public static OnlyDate() {
        const t = moment().tz("Asia/Bangkok");
       // let d = t.toString().substring()
        return t._d
    }
}