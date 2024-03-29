const HttpError = require("../models/http-error")
const pool = require("../db")
const logger = require('firebase-functions/logger')

const createOrder = async (req, res, next) => {
    const { user_id, drinkTitle, customDrinkTitle, drinkCost, quantity, tip_amount, comments } = req.body

    const total = Math.floor(drinkCost * quantity)

    let orderText = `INSERT INTO orders(user_id, drink, quantity, total, tip_amount, comments, is_paid, is_completed, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, false, false, NOW(), NOW()) RETURNING *`

    let newOrder

    try {
        newOrder = await pool.query(orderText, [user_id, drinkTitle || customDrinkTitle, quantity, total, tip_amount, comments])
    } catch (error) {
        logger.error(`Error creating order`, error)

        return next(new HttpError(`Error Creating Order: ${error}`), 500)
    }

    res.status(201).json(newOrder?.rows[0])
}

const getOrders = async (req, res, next) => {
    const query = 'SELECT u.username, o.* FROM orders o JOIN users u ON u.user_id = o.user_id WHERE is_completed != true AND voided_at IS NULL ORDER BY created_at ASC';

    try {
        const client = await pool.connect();
        const result = await client.query(query);
        const orders = result.rows;
        client.release();
        res.status(200).json(orders);

    } catch (error) {
        logger.error('Error getting orders', error);

        return next(new HttpError(`Error getting orders: ${error}`, 500));
    }
}

const updateTip = async (req, res, next) => {

    const { order_id } = req.params
    const { tip_amount } = req.body

    let query = "UPDATE orders set tip_amount = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *"

    let response
    try {
        const client = await pool.connect()
        response = await client.query(query, [ tip_amount, order_id ])
        client.release()
    } catch (error) {
        logger.error(`Error updating tip amount on order #${order_id}`)

        return next(
            new HttpError(
                `Error updating tip amount on order #${order_id}`, 500
            )
        )
    }

    res.status(201).json(response.rows[0])
}

const updatePaid = async (req, res, next) => {
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
        response = await pool.query(text, [paidStatus, order_id]);
    } catch (error) {
        logger.error(`Error updating Order #${order_id}'s paid status. ${error}`, 500)
        return next(new HttpError(`Error updating Order #${order_id}'s paid status. ${error}`, 500))
    }

    res.status(201).json({ message: `Updated paidStatus of Order ${order_id} to ${paidStatus}`, newValue: paidStatus, response: response.rows[0] })
}

const updateCompleted = async (req, res, next) => {
    // similar to updatePaid, except now checking the order's current completed status
    const { order_id } = req.params
    const { isCompleted } = req.body

    const completedStatus = isCompleted ? false : true
    let text = "UPDATE orders SET is_completed = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *"

    let response

    try {
        const client = await pool.connect()
        response = await client.query(text, [completedStatus, order_id])
        client.release()

    } catch (error) {
        logger.error(`Error updating Order #${order_id}'s completed status. ${error}`, 500)

        return next(new HttpError(`Error updating Order #${order_id}'s completed status. ${error}`, 500))
    }

    res.status(201).json({ message: `Updated completedStatus of Order ${order_id} to ${completedStatus}`, newValue: completedStatus, response: response.rows[0] })
}

const getOrdersAdmin = async (req, res, next) => {
    let query = `SELECT u.username, o.* FROM orders o JOIN users u ON u.user_id = o.user_id WHERE voided_at IS NULL ORDER BY is_completed, created_at ASC`
    let response

    try {
        response = await pool.query(query)
    } catch (error) {
        logger.error(`Error getting incomplete orders. ${error}`, 500)
        return next(new HttpError("Error getting incomplete orders", 500))
    }
    res.status(200).json(response.rows)
}

const getOrdersGrouped = async (req, res, next) => {
    let query = "SELECT * FROM user_totals"
    let response

    try {
        response = await pool.query(query)
    } catch (error) {
        logger.error(`Error getting orders grouped by usernames ${error}`, 500)
        return next(new HttpError("Error getting orders grouped by usernames", 500))
    }

    res.status(200).json(response.rows)
}

const getOrdersLeaderboard = async (req, res, next) => {
    let query = "SELECT user_id, username, quantity, amount_paid, adjusted_donations FROM user_totals WHERE amount_paid + adjusted_donations > 0 ORDER BY amount_paid + adjusted_donations DESC LIMIT 10;"

    let sumQuery = "SELECT * FROM d4k_total"

    let response, sumResponse, sumTotal

    try {
        const client = await pool.connect()
        response = await client.query(query)
        client.release()
    } catch (error) {
        logger.error(`Error getting orders for leaderboard. ${error}`, 500)
        return next(new HttpError(`Error getting orders for leaderboard. ${error}`, 500))
    }

    try {
        const client = await pool.connect()
        sumResponse = await client.query(sumQuery)
        client.release()
    } catch (error) {
        logger.error(`Error getting orders for leaderboard. ${error}`, 500)

        return next(new HttpError(`Error getting overall total for leaderboard. ${error}`, 500))
    }

    res.status(200).json({ message: "Retrieved orders for leaderboard!", response: response.rows, sumTotal: sumResponse?.rows[0]?.d4k_total })
}

const deleteOrder = async (req, res, next) => {
    const { order_id } = req.params

    let text = "UPDATE orders SET voided_at = NOW(), updated_at = NOW() WHERE order_id = $1"

    let response

    try {
        const client = await pool.connect()
        response = await client.query(text, [order_id])
        client.release()
    } catch (error) {
        logger.error(`Error voiding order #${order_id}. ${error}`, 500)
        return next(new HttpError(`Error voiding order #${order_id}. ${error}`, 500))
    }

    res.status(200).json({ message: `Voided order #${order_id}`, response: response })
}

const unvoidOrder = async (req, res, next) => {
    const { order_id } = req.params
    let text = "UPDATE orders SET voided_at = NULL, updated_at = NOW() WHERE order_id = $1"

    let response 

    try {
        const client = await pool.connect()
        response = await client.query(text, [ order_id ])
        client.release()
    } catch (error) {
        logger.error(`Error unvoiding order #${order_id}`)
        return next(new HttpError(`Error unvoiding order #${ order_id }`, 500))
    }

    res.status(200).json({ message: `Unvoided order #${ order_id }`, response: response })
}

exports.createOrder = createOrder
exports.getOrders = getOrders
exports.updateTip = updateTip
exports.updatePaid = updatePaid
exports.updateCompleted = updateCompleted
exports.getOrdersAdmin = getOrdersAdmin
exports.getOrdersGrouped = getOrdersGrouped
exports.getOrdersLeaderboard = getOrdersLeaderboard
exports.deleteOrder = deleteOrder
exports.unvoidOrder = unvoidOrder