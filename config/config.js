const { Client } = require('pg');
const env = require('dotenv').config();

const config = new Client({
  host: 'localhost',
  port: '5432',
  user: 'postgres',
  password: 'ingurat1991',
  database: 'rects_api'
});

module.exports = config;