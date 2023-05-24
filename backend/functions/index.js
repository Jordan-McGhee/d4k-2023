const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
const express = require('express');
const { check } = require('express-validator');
const HttpError = require('./models/http-error')
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db')
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// app.use(cors);

app.use(bodyParser.json());

// ORDERS ROUTES/CONTROLLERS


// GET ORDERS
app.get('/order', async (req, res, next) => {
    const query = 'SELECT * FROM orders WHERE is_completed != true ORDER BY created_at ASC';

    try {
        const client = await pool.connect();
        const result = await client.query(query);
        const orders = result.rows;
        client.release();

        if (orders.length === 0) {
            res.status(200).json({ results: 'empty' });
        } else {
            res.status(200).json({ results: orders });
        }
    } catch (error) {
        logger.error('Error getting orders', error);

        return next(new HttpError(`Error getting orders: ${error}`, 500));
    }
});

// ERROR ROUTE
// middleware with 4 parameters is treated as a special middleware by express and will only be executed on requests that have an error associated with it
app.use((error, req, res, next) => {
    // checks to see if we've already sent the error response with a header to the end user
    if (res.headerSent) {
        return next(error);
    }

    // if we reach this code, no error message has been sent, so we will send one now
    // Checks for a code/message attached to the error object, or sets it to 500 and a default error message
    // this is triggered by either throwing an error or passing an error to next() in our routes
    // HAS TO BE PASSED IN NEXT() IF ASYNC CODE
    res
        .status(error.code || 500)
        .json({ message: error.message || "Something went wrong!" });
});


exports.app = onRequest(
    { cors: true },
    app
);