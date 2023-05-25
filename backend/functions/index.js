const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
const express = require('express');
const { check, validationResult } = require('express-validator');
const HttpError = require('./models/http-error')
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db')
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// app.use(cors);

app.use(bodyParser.json());

// // // ORDERS ROUTES/CONTROLLERS

// CREATE ORDER
app.post('/order', [check('username').notEmpty()], async (req, res, next) => {

    // see if any data submitted didn't match with checks in our router file
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        console.log(errors)
        return new HttpError("Please make sure all field are filled out! (Name, Drink Name, and Quantity)")
    }

    // pull data from req.body
    const { username, drinkTitle, customDrinkTitle, drinkCost, quantity, donationAmount, comments } = req.body

    const total = Math.floor(drinkCost * quantity)

    let orderText = "INSERT INTO orders(username, drink, quantity, total, comments, is_paid, is_completed, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, false, false, NOW(), NOW()) RETURNING *"

    let newOrder, newDonation

    try {
        const client = await pool.connect();
        newOrder = await client.query(orderText, [username, drinkTitle || customDrinkTitle, quantity, total, comments])
        client.release()

    } catch (error) {
        logger.error(`Error creating order`, error)

        return next(new HttpError(`Error Creating Order: ${error}`), 500)
    }

    if (donationAmount > 0) {
        let donationText = "INSERT INTO donations(username, amount, is_paid, created_at, updated_at) VALUES ($1, $2, FALSE, NOW(), NOW()) RETURNING *"

        try {
            const client = await pool.connect()
            newDonation = await client.query(donationText, [username, donationAmount])
            client.release();

        } catch (error) {
            logger.error(`Error creating donation along with order`, error)

            return next(new HttpError(`Error creating donation along with order: ${error}`), 500)
        }
    }

    res.status(201).json({ message: "Created order!", order: newOrder.rows, donation: donationAmount > 0 ? newDonation.rows : null})
})

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

// UPDATE PAID
app.patch('order/:order_id/updatePaid', async (req, res, next) => {
    // grab ID from url and paidStatus from req body
    const { order_id } = req.params
    const { isPaid } = req.body

    // use paidStatus to determine what to switch the DB value to
    // if paidStatus is currently FALSE in DB, we assign it to TRUE here to switch and vice versa
    // console.log(`Currently in DB as: ${isPaid}`)
    const paidStatus = isPaid ? false : true
    let text = "UPDATE orders SET is_paid = $1, updated_at = NOW () WHERE order_id = $2 RETURNING *"

    let response

    try {
        const client = await pool.connect();
        response = await client.query(text, [ paidStatus, order_id ]);
        client.release()

    } catch (error) {
        logger.error(`Error updating Order #${order_id}'s paid status. ${error}`, 500)

        return next(
            new HttpError(`Error updating Order #${order_id}'s paid status. ${error}`, 500)
        )
    }

    res.status(201).json({ message: `Updated paidStatus of Order ${ order_id } to ${ paidStatus }`, newValue: paidStatus, response: response.rows[0]})
})

// // UPDATE COMPLETED
// app.patch('order/:order_id/updateCompleted', async (req, res, next) => {

// })

// // GET ORDERS ADMIN
// app.get('order/admin', async (req, res, next) => {

// })

// // GET ORDERS GROUPED
// app.get('order/grouped', async (req, res, next) => {

// })

// // GET LEADERBOARD
// app.get('order/leaderboard', async (req, res, next) => {

// })

// // CLOSE TAB
// app.post('order/:username/closeTab', async (req, res, next) => {

// })

// // DELETE ORDER
// app.delete('order/:order_id', async (req, res, next) => {

// })

// // PULL USER TAB
// app.patch('order/:username/pullTab', async (req, res, next) => {

// })

// // // // DONATION ROUTES

// // CREATE DONATION
// app.post('/donation', async (req, res, next) => {

// })

// // GET DONATIONS ADMIN
// app.get('/donation', async (req, res, next) => {

// })

// // UPDATE PAID
// app.patch('donation/:donation_id/updatePaid', async (req, res, next) => {

// })

// // UPDATE AMOUNT
// app.patch('donation/:donation_id/amount', async (req, res, next) => {

// })

// // DELETE ORDER
// app.delete('donation/:donation_id', async (req, res, next) => {

// })

// // CLOSE USER DONATIONS
// app.post('donation/:username/closeDonations', async (req, res, next) => {

// })

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