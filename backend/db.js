const Pool = require("pg").Pool

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    max: 10,
    min: 0
})

const localPool = new Pool({
    user: process.env.LOCAL_DATABASE_USER,
    host: process.env.LOCAL_DATABASE_HOST,
    database: process.env.LOCAL_DATABASE,
    port: process.env.LOCAL_DATABASE_PORT,
    password: process.env.LOCAL_DATABASE_PASSWORD,
})

module.exports = pool
module.exports = localPool

