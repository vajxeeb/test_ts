import Results from "./message";
const LOGGER = require('../config/logger')
const logger = LOGGER.getLogger();

export default class LogRQS {

    public static LogReq = (method: any, originalUrl: any, info: any) => {
        logger.info(`${method}${originalUrl}`, info)
    }
    public static LogRes = (message: string,status: number, data: any) => {
        logger.info(JSON.stringify(Results.getResponse(message,status, data)))
    }
}