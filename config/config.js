const { Client } = require('pg');
const env = process.env;

const config = new Client({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE
});

module.exports = config;