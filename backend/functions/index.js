const { onRequest } = require('firebase-functions/v2/https');
// const logger = require('firebase-functions/logger');
const express = require('express');
// const { check, validationResult } = require('express-validator');
const HttpError = require('./models/http-error')
const bodyParser = require('body-parser');
// const cors = require('cors');
// const pool = require('./db')
const dotenv = require('dotenv');
dotenv.config();

// route imports
const orderRoutes = require("./routes/order-routes")
const userRoutes = require('./routes/user-routes')

const app = express();

// app.use(cors);

app.use(bodyParser.json());

// route variables
app.use("/order", orderRoutes)
app.use("/user", userRoutes)

// // OLD ROUTES
// // // // ORDERS ROUTES/CONTROLLERS

// // CREATE ORDER
// app.post('/order', [check('username').notEmpty()], async (req, res, next) => {

//     // see if any data submitted didn't match with checks in our router file
//     const errors = validationResult(req)

//     if (!errors.isEmpty()) {
//         console.log(errors)
//         return new HttpError("Please make sure all fields are filled out! (Name, Drink Name, and Quantity)")
//     }

//     // pull data from req.body
//     const { username, drinkTitle, customDrinkTitle, drinkCost, quantity, donationAmount, comments } = req.body

//     const total = Math.floor(drinkCost * quantity)

//     let orderText = "INSERT INTO orders(username, drink, quantity, total, comments, is_paid, is_completed, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, false, false, NOW(), NOW()) RETURNING *"

//     let newOrder, newDonation

//     try {
//         const client = await pool.connect();
//         newOrder = await client.query(orderText, [username, drinkTitle || customDrinkTitle, quantity, total, comments])
//         client.release()

//     } catch (error) {
//         logger.error(`Error creating order`, error)

//         return next(new HttpError(`Error Creating Order: ${error}`), 500)
//     }

//     if (donationAmount > 0) {
//         let donationText = "INSERT INTO donations(username, amount, is_paid, created_at, updated_at) VALUES ($1, $2, FALSE, NOW(), NOW()) RETURNING *"

//         try {
//             const client = await pool.connect()
//             newDonation = await client.query(donationText, [username, donationAmount])
//             client.release();

//         } catch (error) {
//             logger.error(`Error creating donation along with order`, error)

//             return next(new HttpError(`Error creating donation along with order: ${error}`), 500)
//         }
//     }

//     res.status(201).json({ message: "Created order!", order: newOrder.rows, donation: donationAmount > 0 ? newDonation.rows : null })
// })

// // GET ORDERS
// app.get('/order', async (req, res, next) => {
//     const query = 'SELECT * FROM orders WHERE is_completed != true ORDER BY created_at ASC';

//     try {
//         const client = await pool.connect();
//         const result = await client.query(query);
//         const orders = result.rows;
//         client.release();

//         if (orders.length === 0) {
//             res.status(200).json({ results: 'empty' });
//         } else {
//             res.status(200).json({ results: orders });
//         }
//     } catch (error) {
//         logger.error('Error getting orders', error);

//         return next(new HttpError(`Error getting orders: ${error}`, 500));
//     }
// });

// // UPDATE PAID
// app.patch('/order/:order_id/updatePaid', async (req, res, next) => {
//     // grab ID from url and paidStatus from req body
//     const { order_id } = req.params
//     const { isPaid } = req.body

//     // use paidStatus to determine what to switch the DB value to
//     // if paidStatus is currently FALSE in DB, we assign it to TRUE here to switch and vice versa
//     // console.log(`Currently in DB as: ${isPaid}`)
//     const paidStatus = isPaid ? false : true
//     let text = "UPDATE orders SET is_paid = $1, updated_at = NOW () WHERE order_id = $2 RETURNING *"

//     let response

//     try {
//         const client = await pool.connect();
//         response = await client.query(text, [paidStatus, order_id]);
//         client.release()

//     } catch (error) {
//         logger.error(`Error updating Order #${order_id}'s paid status. ${error}`, 500)

//         return next(
//             new HttpError(`Error updating Order #${order_id}'s paid status. ${error}`, 500)
//         )
//     }

//     res.status(201).json({ message: `Updated paidStatus of Order ${order_id} to ${paidStatus}`, newValue: paidStatus, response: response.rows[0] })
// })

// // UPDATE COMPLETED
// app.patch('/order/:order_id/updateCompleted', async (req, res, next) => {
//     // similar to updatePaid, except now checking the order's current completed status
//     const { order_id } = req.params
//     const { isCompleted } = req.body

//     const completedStatus = isCompleted ? false : true
//     let text = "UPDATE orders SET is_completed = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *"

//     let response

//     try {
//         const client = await pool.connect()
//         response = await client.query(text, [completedStatus, order_id])
//         client.release()

//     } catch (error) {
//         logger.error(`Error updating Order #${order_id}'s completed status. ${error}`, 500)

//         return next(
//             new HttpError(`Error updating Order #${order_id}'s completed status. ${error}`, 500)
//         )
//     }

//     res.status(201).json({ message: `Updated completedStatus of Order ${order_id} to ${completedStatus}`, newValue: completedStatus, response: response.rows[0] })
// })

// // GET ORDERS ADMIN
// app.get('/order/admin', async (req, res, next) => {
//     let incompleteQuery = "SELECT * FROM orders WHERE is_completed = FALSE ORDER BY created_at ASC"

//     let completedQuery = "SELECT * FROM orders WHERE is_completed = TRUE ORDER BY created_at ASC"

//     let incompleteResponse, completeResponse

//     try {
//         const client = await pool.connect()
//         incompleteResponse = await client.query(incompleteQuery)
//         client.release()
//     } catch (error) {

//         logger.error(`Error getting incomplete orders. ${error}`, 500)

//         return next(
//             new HttpError(
//                 "Error getting incomplete orders", 500
//             )
//         )
//     }

//     try {
//         const client = await pool.connect()
//         completeResponse = await client.query(completedQuery)
//         client.release()
//     } catch (error) {

//         logger.error(`Error getting incomplete orders. ${error}`, 500)

//         return next(
//             new HttpError(
//                 "Error getting incomplete orders", 500
//             )
//         )
//     }

//     res.status(200).json({ message: "Retrieved orders!", incompleteOrders: incompleteResponse.rows, completedOrders: completeResponse.rows })
// })

// // GET ORDERS GROUPED
// app.get('/order/grouped', async (req, res, next) => {
//     let paidQuery = "SELECT * FROM user_totals WHERE orders_total_unpaid IS NULL"

//     let unpaidQuery = "SELECT * FROM user_totals WHERE orders_total_unpaid > 0"

//     let paidResponse, unpaidResponse

//     try {
//         const client = await pool.connect()
//         paidResponse = await client.query(paidQuery)
//         client.release()
//     } catch (error) {
//         logger.error(`Error getting orders grouped by usernames COMPLETE ${error}`, 500)

//         return next(
//             new HttpError(
//                 "Error getting orders grouped by usernames COMPLETE", 500
//             )
//         )
//     }

//     try {
//         const client = await pool.connect()
//         unpaidResponse = await client.query(unpaidQuery)
//         client.release()
//     } catch (error) {
//         logger.error(`Error getting orders grouped by usernames INCOMPLETE ${error}`, 500)

//         return next(
//             new HttpError(
//                 "Error getting orders grouped by usernames INCOMPLETE", 500
//             )
//         )
//     }

//     res.status(200).json({ message: "Retrieved orders grouped by usernames!", paid: paidResponse.rows, unpaid: unpaidResponse.rows })
// })

// // GET LEADERBOARD
// app.get('/order/leaderboard', async (req, res, next) => {
//     let query = "SELECT * FROM user_totals ORDER BY COALESCE(orders_total, 0) + COALESCE(donations_total, 0) DESC limit 10"

//     let sumQuery = "SELECT * FROM donations_and_orders_total"

//     let response, sumResponse, sumTotal

//     try {
//         const client = await pool.connect()
//         response = await client.query(query)
//         client.release()
//     } catch (error) {
//         logger.error(`Error getting orders for leaderboard. ${error}`, 500)
//         return next(
//             new HttpError(`Error getting orders for leaderboard. ${error}`, 500)
//         )
//     }

//     try {
//         const client = await pool.connect()
//         sumResponse = await client.query(sumQuery)
//         client.release()
//     } catch (error) {
//         logger.error(`Error getting orders for leaderboard. ${error}`, 500)

//         return next(
//             new HttpError(`Error getting overall total for leaderboard. ${error}`, 500)
//         )
//     }

//     if (response.rowCount === 0) {
//         response = "empty"
//         sumTotal = 0
//     } else {
//         response = response.rows
//         sumTotal = sumResponse.rows[0].d4k_total
//     }

//     res.status(200).json({ message: "Retrieved orders for leaderboard!", response: response, sumTotal: sumTotal })
// })

// // CLOSE TAB
// app.post('/order/:username/closeTab', async (req, res, next) => {
//     // grab username from params and run query to close all upaid
//     const { username } = req.params

//     let text = "UPDATE orders SET is_paid = TRUE, updated_at = NOW() WHERE UPPER(username) = UPPER($1) RETURNING *"

//     let response

//     try {
//         const client = await pool.connect()
//         response = await client.query(text, [username])
//         client.release()
//     } catch (error) {
//         logger.error(`Error setting ${username}'s orders to paid. ${error}`, 500)

//         return next(
//             new HttpError(`Error setting ${username}'s orders to paid. ${error}`, 500)
//         )
//     }

//     res.status(201).json({ message: `Set ${username}'s ${response.rowCount} orders to paid`, response: response.rows })
// })

// // DELETE ORDER
// app.delete('/order/:order_id', async (req, res, next) => {
//     const { order_id } = req.params

//     let text = "DELETE FROM orders WHERE order_id = $1"

//     let response

//     try {
//         const client = await pool.connect()
//         response = await client.query(text, [order_id])
//         client.release()
//     } catch (error) {
//         logger.error(`Error deleting order #${order_id}. ${error}`, 500)

//         return next(
//             new HttpError(`Error deleting order #${order_id}. ${error}`, 500)
//         )
//     }

//     res.status(200).json({ message: `Deleted order #${order_id}`, response: response })
// })

// // PULL USER TAB
// app.get('/order/:username/pullTab', async (req, res, next) => {
//     const { username } = req.params

//     let text = "SELECT * FROM user_totals WHERE UPPER(username) = UPPER($1)"

//     let response

//     try {
//         const client = await pool.connect()
//         response = await client.query(text, [username])
//         client.release()
//     } catch (error) {
//         logger.error(`Error getting user ${username}'s tab. ${error}`, 500)

//         return next(
//             new HttpError(`Error getting user ${username}'s tab. ${error}`, 500)
//         )
//     }

//     res.status(200).json({ message: `Fetched ${username}'s tab!`, response: response.rows, unpaidOrderAmount: parseInt(response.rows[0].orders_total_unpaid), unpaidDonationAmount: parseInt(response.rows[0].donations_total_unpaid) })
// })

// // // // DONATION ROUTES

// // CREATE DONATION
// app.post('/donation', async (req, res, next) => {
//     const { username, amount, comments } = req.body

//     let text = "INSERT INTO donations(username, amount, comments, is_paid, created_at, updated_at) VALUES ($1, $2, $3,  false, NOW(), NOW())"

//     let newDonation

//     try {
//         const client = await pool.connect()
//         newDonation = await client.query(text, [username, amount, comments])
//         client.release()
//     } catch (error) {
//         logger.error(`Error creating donation. ${error}`, 500)

//         return next(
//             new HttpError(`Error creating donation. ${error}`, 500)
//         )
//     }

//     res.status(201).json({ message: "Donation saved!", donation: newDonation })
// })

// // GET DONATIONS ADMIN
// app.get('/donation', async (req, res, next) => {
//     let unpaidQuery = "SELECT * FROM donations WHERE is_paid = FALSE ORDER BY created_at ASC"

//     let paidQuery = "SELECT * FROM donations WHERE is_paid = TRUE ORDER BY created_at ASC"

//     let unpaidResponse, paidResponse

//     try {
//         const client = await pool.connect()
//         unpaidResponse = await client.query(unpaidQuery)
//         client.release()
//     } catch (error) {
//         logger.error(`Error getting unpaid donations. ${error}`, 500)

//         return next(
//             new HttpError(`Error getting unpaid donations. ${error}`, 500)
//         )
//     }

//     try {
//         const client = await pool.connect()
//         paidResponse = await client.query(paidQuery)
//         client.release()
//     } catch (error) {
//         logger.error(`Error getting paid donations. ${error}`, 500)

//         return next(
//             new HttpError(`Error getting paid donations. ${error}`, 500)
//         )
//     }

//     res.status(200).json({ message: "Retrieved donations!", unpaid: unpaidResponse.rows, paid: paidResponse.rows })
// })

// // UPDATE DONATION PAID
// app.patch('/donation/:donation_id/updatePaid', async (req, res, next) => {
//     const { isPaid } = req.body
//     const { donation_id } = req.params

//     const paidStatus = isPaid ? false : true

//     let text = "UPDATE donations SET is_paid = $1, updated_at = NOW() WHERE donation_id = $2 RETURNING *"

//     let response

//     try {
//         const client = await pool.connect()
//         response = await client.query(text, [paidStatus, donation_id])
//         client.release()
//     } catch (error) {
//         logger.error(`Error updating donation #${donation_id}'s paidStatus to ${paidStatus}. ${error}`, 500)

//         return next(
//             new HttpError(`Error updating donation #${donation_id}'s paidStatus to ${paidStatus}. ${error}`, 500)
//         )
//     }

//     res.status(201).json({ message: `Updated paidStatus of donation #${donation_id} to ${paidStatus}`, newValue: paidStatus, response: response.rows })
// })

// // UPDATE DONATION AMOUNT
// app.patch('/donation/:donation_id/amount', async (req, res, next) => {
//     const { originalAmount, newAmount } = req.body
//     const { donation_id } = req.params

//     let text = "UPDATE donations SET amount = $1, updated_at = NOW() WHERE donation_id = $2 RETURNING *"

//     let response

//     try {
//         const client = await pool.connect()
//         response = await client.query(text, [newAmount, donation_id])
//         client.release()
//     } catch (error) {
//         logger.error(`Error updating donation #${donation_id}'s amount from $${originalAmount} to $${newAmount}`, 500)

//         return next(
//             new HttpError(`Error updating donation #${donation_id}'s amount from $${originalAmount} to $${newAmount}`, 500)
//         )
//     }

//     res.status(201).json({ message: `Updating donation #${donation_id}'s amount from $${originalAmount} to $${newAmount}`, response: response.rows })
// })

// // DELETE DONATION
// app.delete('/donation/:donation_id', async (req, res, next) => {
//     const { donation_id } = req.params

//     let text = "DELETE FROM donations WHERE donation_id = $1"

//     let response

//     try {
//         const client = await pool.connect()
//         response = await client.query(text, [donation_id])
//         client.release()
//     } catch (error) {
//         logger.error(`Error deleting donation #${donation_id}`, 500)

//         return next(
//             new HttpError(`Error deleting donation #${donation_id}`, 500)
//         )
//     }

//     res.status(200).json({ message: `Deleted donation #${donation_id}`, response: response })
// })

// // CLOSE USER DONATIONS
// app.post('/donation/:username/closeDonations', async (req, res, next) => {
//     const { username } = req.params

//     let text = "UPDATE donations SET is_paid = TRUE, updated_at = NOW() WHERE UPPER(username) = UPPER($1) RETURNING *"

//     let response

//     try {
//         const client = await pool.connect()
//         response = await client.query(text, [username])
//         client.release()
//     } catch (error) {
//         logger.error(`Error setting user ${username}'s donations to paid`, 500)

//         return next(
//             new HttpError(`Error setting user ${username}'s donations to paid`, 500)
//         )
//     }

//     res.status(201).json({ message: `Set ${username}'s ${response.rowCount} donations to paid`, response: response.rows })
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


exports.d4k = onRequest(
    { cors: true },
    app
);