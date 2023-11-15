const Pool = require("pg").Pool

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    max: 150,
    min: 0
})

module.exports = pool

