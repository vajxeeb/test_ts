import { Sequelize } from "sequelize-typescript"
require('dotenv').config({ path: __dirname+'/.env' });

export const sequlize = new Sequelize(
  process.env.DB_NAME || 'db_restaurant',
  process.env.USER_NAME || 'root',
  process.env.DB_PASS || '', 
  {
   host: process.env.HOST || 'localhost',
   dialect: 'mysql',
   models: [__dirname + '/models']  
  }
);