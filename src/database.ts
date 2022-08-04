import { Sequelize } from "sequelize-typescript"
require('dotenv').config({ path: __dirname + '/.env' });
const LOGGER = require('./config/logger')
const logger = LOGGER.getLogger();

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'db_restaurant',
  process.env.USER_NAME || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.HOST || 'localhost',
    dialect: 'mysql',
    models: [__dirname + '/models'],
    logging: true,
    // timezone: "+07:00",  
    // pool: {
    //   max: 20,
    //   min: 0,
    //   acquire: 60000,
    //   idle: 10000
    // }
  },

);

export const SyncDB = () => {
  sequelize.authenticate().then(async () => {
    logger.info("Database Connected.");
    console.log("Database Connected.")
    try {

      //await sequelize.sync({ force: false, alter: false})

      logger.info("Sync Database Success.");
    } catch (error: any) {
      logger.error("Sync Database Failed. ", error.message);
      console.log("Sync Database Failed. ", error.message)
    }
  }).catch((e: any) => {
    logger.error("Connect To Database Failed. ", e.message);
    console.log("Connect To Database Failed. ", e.message)
  })
}