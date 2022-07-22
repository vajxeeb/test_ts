import { Sequelize } from "sequelize-typescript"
import moment from 'moment-timezone';
import CustomDate from './services/date';
require('dotenv').config({ path: __dirname + '/.env' });

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'db_restaurant',
  process.env.USER_NAME || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.HOST || 'localhost',
    dialect: 'mysql',
    models: [__dirname + '/models'],
    logging: true,    
    pool: {
      max: 20,
      idle: 10000,
    }
  }
  
);