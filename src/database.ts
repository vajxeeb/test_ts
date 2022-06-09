import { Sequelize } from "sequelize-typescript"

export const sequlize = new Sequelize(
   'db_ts',
   'root',
   '', {
   host: 'localhost',
   dialect: 'mysql',
   models: [__dirname + '/models']
});