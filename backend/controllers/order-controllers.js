const { validationResult, body } = require("express-validator")
const HttpError = require("../models/http-error")
const pool = require("../db")

const createOrder = async (req, res, next) => {

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
        newOrder = await pool.query(orderText, [username, drinkTitle || customDrinkTitle, quantity, total, comments])
    } catch (err) {
        console.log(`Error creating order: ${err}`)
        return next(
            new HttpError(
                "Error creating order", 500
            )
        )
    }

    if (donationAmount > 0) {

        let donationText = "INSERT INTO donations(username, amount, is_paid, created_at, updated_at) VALUES ($1, $2, FALSE, NOW(), NOW()) RETURNING *"

        try {
            newDonation = await pool.query(donationText, [ username, donationAmount ])
        } catch (error) {
            console.log(error)

            return next(
                new HttpError(
                    "Error creating donation along with order", 500
                )
            )
        }
    }

    console.log("Order created!")

    res.status(201).json({ message: "Created Order!", order: newOrder.rows, donation: donationAmount > 0 ? newDonation.rows : null })
}

const getOrders = async (req, res, next) => {
    let text = "SELECT * FROM orders WHERE is_completed != true ORDER BY created_at ASC"
    let response

    try {
        response = await pool.query(text)
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                "Error getting orders", 500
            )
        )
    }

    // const results = { 'results': response ? response.rows : null } 

    const message = "Retrieved orders!"

    console.log(message)

    res.status(200).json({message: message, results: response.rows})
}

const updatePaid = async (req, res, next) => {
    // grab ID from url and paidStatus from req body
    const { order_id } = req.params
    const { isPaid } = req.body

    // use paidStatus to determine what to switch the DB value to
    // if paidStatus is currently FALSE in DB, we assign it to TRUE here to switch and vice versa
    console.log(`Currently in DB as: ${isPaid}`)
    const paidStatus = isPaid ? false : true
    let text = "UPDATE orders SET is_paid = $1, updated_at = NOW () WHERE order_id = $2 RETURNING *"

    let response
    try {
        response = await pool.query(text, [ paidStatus, order_id ])
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                `Error updating Order ${order_id}'s paid status`, 500
            )
        )
    }

    console.log(`Updating Order #${order_id} to ${paidStatus}`)
    
    res.status(201).json({ message: `Updated paidStatus of Order ${ order_id } to ${ paidStatus }`, newValue: paidStatus, response: response.rows[0]})
}

const updateCompleted = async (req, res, next) => {
    // similar to updatePaid, except now checking the order's current completed status
    const { order_id } = req.params
    const { isCompleted } = req.body

    const completedStatus = isCompleted ? false : true
    let text = "UPDATE orders SET is_completed = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *"

    let response
    try {
        response = await pool.query(text, [ completedStatus, order_id ])
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                `Error updating Order ${order_id}'s completed status`, 500
            )
        )
    }

    console.log(`Updating Order #${order_id} to ${completedStatus}`)
    
    res.status(201).json({ message: `Updated completedStatus of Order ${ order_id } to ${ completedStatus }`, newValue: completedStatus,response: response.rows[0] })
}

const getOrdersAdmin = async (req, res, next) => {
    let incompleteQuery = "SELECT * FROM orders WHERE is_completed = FALSE ORDER BY created_at ASC"

    let completedQuery = "SELECT * FROM orders WHERE is_completed = TRUE ORDER BY created_at ASC"

    let incompleteResponse, completeResponse

    // INCOMPLETE TRY/CATCH
    try {
        incompleteResponse = await pool.query(incompleteQuery)
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                "Error getting incomplete orders", 500
            )
        )
    }

    // COMPLETED TRY/CATCH
    try {
        completeResponse = await pool.query(completedQuery)
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                "Error getting completed orders", 500
            )
        )
    }

    res.status(200).json({ message: "Retrieved orders!", incompleteOrders: incompleteResponse.rows, completedOrders: completeResponse.rows })
}

const getOrdersGrouped = async (req, res, next) => {
    let paidQuery = "SELECT * FROM user_totals WHERE total_unpaid IS NULL"

    let unpaidQuery = "SELECT * FROM user_totals WHERE total_unpaid > 0"

    let paidResponse, unpaidResponse

    try {
        paidResponse = await pool.query(paidQuery)
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                "Error getting orders grouped by usernames COMPLETE", 500
            )
        )
    }

    try {
        unpaidResponse = await pool.query(unpaidQuery)
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                "Error getting orders grouped by usernames INCOMPLETE", 500
            )
        )
    }

    res.status(200).json({ message: "Retrieved orders grouped by usernames!", paid: paidResponse.rows, unpaid: unpaidResponse.rows })
}

const getOrdersLeaderboard = async (req, res, next) => {
    let query = "SELECT * FROM user_totals ORDER BY total DESC limit 10"

    let sumQuery = "SELECT SUM(total) from user_totals"

    let response, sumResponse

    try {
        response = await pool.query(query)
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                "Error getting orders for leaderboard", 500
            )
        )
    }

    try {
        sumResponse = await pool.query(sumQuery)
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                "Error getting overall total for leaderboard", 500
            )
        )
    }

    res.status(200).json({message: "Retrieved orders for leaderboard!", response: response.rows, sumTotal: sumResponse.rows[0]})
}

const closeTab = async (req, res, next) => {
    // grab username from params and run query to close all upaid
    const { username } = req.params

    let text = "UPDATE orders SET is_paid = TRUE, updated_at = NOW() WHERE UPPER(username) = UPPER($1) RETURNING *"

    let response
    try {
        response = await pool.query(text, [ username ])
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                `Error setting user ${username}'s orders to paid`, 500
            )
        )
    }

    res.status(201).json({ message: `Set ${ username }'s ${ response.rowCount } orders to paid`, response: response.rows })
}

const deleteOrder = async (req, res, next) => {
    const { order_id } = req.params

    let text = "DELETE FROM orders WHERE order_id = $1"

    let response

    try {
        response = await pool.query(text, [ order_id ])
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                `Error deleting order #${order_id}`, 500
            )
        )
    }

    res.status(200).json({ message: `Deleted order #${order_id}`, response: response})
}

exports.createOrder = createOrder
exports.getOrders = getOrders
exports.updatePaid = updatePaid
exports.updateCompleted = updateCompleted
exports.getOrdersAdmin = getOrdersAdmin
exports.getOrdersGrouped = getOrdersGrouped
exports.getOrdersLeaderboard = getOrdersLeaderboard
exports.closeTab = closeTab
exports.deleteOrder = deleteOrder