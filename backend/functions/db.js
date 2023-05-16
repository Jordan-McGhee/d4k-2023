const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  port: process.env.DATABASE_POST,
  max: 10,
  min: 0,
});

module.exports = pool;

