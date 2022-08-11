import { Sequelize } from "sequelize-typescript"
import 'dotenv/config'

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'db_restaurant',
  process.env.USER_NAME || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.HOST || 'localhost',
    dialect: 'mysql',
    models: [__dirname + '/models'],
    logging: false,
    timezone: "+07:00",  
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  },

);

export const SyncDB = () => {
  sequelize.authenticate().then(async () => {
    console.log("Database Connected.")
    try {

      await sequelize.sync({ force: true, alter: true})

    } catch (error: any) {
      console.log("Sync Database Failed. ", error.message)
    }
  }).catch((e: any) => {
    console.log("Connect To Database Failed. ", e.message)
  })
}