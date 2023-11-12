const { validationResult, body } = require("express-validator")
const HttpError = require("../models/http-error")
const pool = require("../db")
const localPool = require("../db")

const createOrder = async (req, res, next) => {

    // // see if any data submitted didn't match with checks in our router file
    // const errors = validationResult(req)

    // if (!errors.isEmpty()) {
    //     console.log(errors)
    //     return new HttpError("Please make sure all field are filled out! (Name, Drink Name, and Quantity)")
    // }

    // pull data from req.body
    const { user_id, drinkTitle, customDrinkTitle, drinkCost, quantity, tip_amount, comments } = req.body

    const total = Math.floor(drinkCost * quantity)

    let orderText = "INSERT INTO orders(user_id, drink, quantity, total, tip_amount, comments, is_paid, is_completed, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, false, false, NOW(), NOW()) RETURNING *"
    
    let newOrder

    try {
        newOrder = await localPool.query(orderText, [user_id, drinkTitle || customDrinkTitle, quantity, total, tip_amount, comments])
    } catch (err) {
        console.log(`Error creating order: ${err}`)
        return next(
            new HttpError(
                "Error creating order", 500
            )
        )
    }

    res.status(201).json({ message: "Created Order!", order: newOrder.rows })
}

const getOrders = async (req, res, next) => {
    let text = "SELECT * FROM orders WHERE is_completed != true ORDER BY created_at ASC"
    let response

    try {
        response = await localPool.query(text)
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                "Error getting orders", 500
            )
        )
    }

    // const results = { 'results': response ? response.rows : null } 

    let results = response.rows

    if (response.rowCount === 0) {
        results = "empty"
    }

    res.status(200).json({ results: results })
}

const updateTip = async (req, res, next) => {

    const { order_id } = req.params
    const { tip_amount } = req.body

    let query = "UPDATE orders set tip_amount = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *"

    let response
    try {
        response = await localPool.query(query, [ tip_amount, order_id ])
    } catch (error) {
        console.log(`Error updating tip amount on order #${order_id}`)

        return next(
            new HttpError(
                `Error updating tip amount on order #${order_id}`, 500
            )
        )
    }

    res.status(201).json({ message: `Updated tip amount on order #${order_id} to ${tip_amount}`, response: response.rows[0]})
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
        response = await localPool.query(text, [ paidStatus, order_id ])
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                `Error updating Order ${order_id}'s paid status`, 500
            )
        )
    }
    
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
        response = await localPool.query(text, [ completedStatus, order_id ])
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                `Error updating Order ${order_id}'s completed status`, 500
            )
        )
    }

    // console.log(`Updating Order #${order_id} to ${completedStatus}`)
    
    res.status(201).json({ message: `Updated completedStatus of Order ${ order_id } to ${ completedStatus }`, newValue: completedStatus,response: response.rows[0] })
}

const getOrdersAdmin = async (req, res, next) => {
    let incompleteQuery = "SELECT * FROM orders WHERE is_completed = FALSE ORDER BY created_at ASC"

    let completedQuery = "SELECT * FROM orders WHERE is_completed = TRUE ORDER BY created_at ASC"

    let incompleteResponse, completeResponse

    // INCOMPLETE TRY/CATCH
    try {
        incompleteResponse = await localPool.query(incompleteQuery)
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
        completeResponse = await localPool.query(completedQuery)
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
    let paidQuery = "SELECT * FROM user_totals WHERE orders_total_unpaid = 0"

    let unpaidQuery = "SELECT * FROM user_totals WHERE orders_total_unpaid > 0"

    let paidResponse, unpaidResponse

    try {
        paidResponse = await localPool.query(paidQuery)
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                "Error getting orders grouped by usernames COMPLETE", 500
            )
        )
    }

    try {
        unpaidResponse = await localPool.query(unpaidQuery)
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
    let query = "SELECT user_id, username, amount_paid, adjusted_donations FROM user_totals WHERE amount_paid > 0 ORDER BY amount_paid DESC LIMIT 10;"

    let sumQuery = "SELECT * FROM d4k_total"

    let response, sumResponse, sumTotal

    try {
        response = await localPool.query(query)
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                "Error getting orders for leaderboard", 500
            )
        )
    }

    try {
        sumResponse = await localPool.query(sumQuery)
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                "Error getting overall total for leaderboard", 500
            )
        )
    }

    if (response.rowCount === 0) {
        response = "empty"
        sumTotal = 0
    } else {
        response = response.rows
        sumTotal = sumResponse.rows[0].d4k_total
    }

    res.status(200).json({message: "Retrieved orders for leaderboard!", response: response, sumTotal: sumTotal })
}

const closeTab = async (req, res, next) => {
    // grab username from params and run query to close all upaid
    const { user_id } = req.params

    let text = "UPDATE orders SET is_paid = TRUE, updated_at = NOW() WHERE user_id = $1 RETURNING *"

    let response
    try {
        response = await localPool.query(text, [ user_id ])
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                `Error setting user ${user_id}'s orders to paid`, 500
            )
        )
    }

    res.status(201).json({ message: `Set user #${ user_id }'s ${ response.rowCount } orders to paid`, response: response.rows })
}

const deleteOrder = async (req, res, next) => {
    const { order_id } = req.params

    let text = "UPDATE orders SET voided_at = NOW(), updated_at = NOW() WHERE order_id = $1"

    let response

    try {
        response = await localPool.query(text, [ order_id ])
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                `Error voiding order #${order_id}`, 500
            )
        )
    }

    res.status(200).json({ message: `Voided order #${order_id}`, response: response})
}

const unvoidOrder = async (req, res, next) => {
    const { order_id } = req.params

    let text = "UPDATE orders SET voided_at = NULL, updated_at = NOW() WHERE order_id = $1"

    let response
    
    try {
        response = await localPool.query(text, [ order_id ])
    } catch (error) {
        console.log(`Error unvoiding order #${order_id}`)

        return next(
            new HttpError(
                `Error unvoiding order #${order_id}`, 500
            )
        )
    }

    res.status(200).json({ message: `Unvoided order #${ order_id }`, response: response})
}

const pullUserTab = async (req, res, next) => {
    const { user_id } = req.params

    let text = "SELECT * FROM user_totals WHERE user_id = $1"

    let response

    try {
        response = await localPool.query(text, [ user_id ])
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                `Error getting user # ${user_id}'s tab`, 500
            )
        )
    }
    
    res.status(200).json({ message: `Fetched User #${user_id}'s tab!`, response: response.rows })
}

exports.createOrder = createOrder
exports.getOrders = getOrders
exports.updateTip = updateTip
exports.updatePaid = updatePaid
exports.updateCompleted = updateCompleted
exports.getOrdersAdmin = getOrdersAdmin
exports.getOrdersGrouped = getOrdersGrouped
exports.getOrdersLeaderboard = getOrdersLeaderboard
exports.closeTab = closeTab
exports.deleteOrder = deleteOrder
exports.unvoidOrder = unvoidOrder
exports.pullUserTab = pullUserTab