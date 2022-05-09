const { Client }  = require('pg');
const env = process.env;

// const config = new Client({
//   host: env.DB_HOST,
//   port: env.DB_PORT,
//   user: env.DB_USERNAME,
//   password: env.DB_PASSWORD,
//   database: env.DB_DATABASE
// });

const config = new Client({
  host: 'localhost',
  port: '5432',
  user: 'postgres',
  password: '',
  database: 'task_mgt_api'
});

module.exports = config;