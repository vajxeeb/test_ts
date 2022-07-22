const log4js = require("log4js");
module.exports = log4js.configure({
    appenders: { cheese: { type: "file", filename: "src/logger/api.log" } },
    categories: {
        default:
        {
            appenders: ["cheese"],
            level: "info",
            level1: 'error',
            level2: 'warn',
            level3: 'debug'
        }
    }
});

