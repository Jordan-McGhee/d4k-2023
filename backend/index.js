const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const HttpError = require("./models/http-error")
const Pool = require("pg").Pool;
const dotenv = require("dotenv")
dotenv.config()

const donationRoutes = require("./routes/donation-routes")
const orderRoutes = require("./routes/order-routes")

const app = express()
const PORT = process.env.DATABASE_PORT

// want to parse the information we receive from the user before it reaches our other middlewares
// this converts all incoming json data into regular javascript
app.use(bodyParser.json())

// middleware to work around CORS errors since our front and backend are on separate servers
// attaches headers on its responses to prevent the browser from blocking the response
app.use((req, res, next) => {
    // determines which domains have access, the * means all are acceptable
    res.setHeader("Access-Control-Allow-Origin", "*")

    // specifies which headers are allowed on incoming requests to be handled by this API
    // Content-Type and Authorization are the only 2 that aren't default in this group
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization")

    // allowed methods for incoming requests
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")

    next()
})

// ROUTE VARIABLES
app.use("/donation", donationRoutes)
app.use("/order", orderRoutes)


// TEST ROUTE
// const testDatabaseConnection = async () => {
//     const pool = new Pool({
//         host: process.env.DATABASE_HOST,
//         database: process.env.DATABASE,
//         user: process.env.DATABASE_USER,
//         port: process.env.DATABASE_PORT,
//         password: process.env.DATABASE_PASSWORD,
//     });

//     try {
//         const client = await pool.connect();
//         console.log('Connected to the PostgreSQL database');
//         client.release();
//     } catch (error) {
//         console.error('Failed to connect to the PostgreSQL database:', error);
//     } finally {
//         pool.end();
//     }
// };

// testDatabaseConnection()

// ERROR ROUTE
// middleware with 4 parameters is treated as a special middleware by express and will only be executed on requests that have an error associated with it
app.use((error, req, res, next) => {

    // checks to see if we've already sent the error response with a header to the end user
    if (res.headerSent) {
        return next(error)
    }

    // if we reach this code, no error message has been sent, so we will send one now
    // Checks for a code/message attached to the error object, or sets it to 500 and a default error message
    // this is triggered by either throwing an error or passing an error to next() in our routes
    // HAS TO BE PASSED IN NEXT() IF ASYNC CODE
    res
        .status(error.code || 500)
        .json({ message: error.message || "Something went wrong!" })

})

    .listen(5000, () => console.log(`Server has started on ${PORT}`))
