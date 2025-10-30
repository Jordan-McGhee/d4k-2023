
// External dependencies
const logger = require('firebase-functions/logger');

// Internal dependencies
const HttpError = require("../models/http-error");
const pool = require("../db");
const twilioControllers = require("../controllers/twilio-controllers");

// --- Order Controllers ---

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
    twilioControllers.sendMessage(6787361277, `Order received for ${drinkTitle || customDrinkTitle}`)

    res.status(201).json(newOrder?.rows[0])
}

// Get all active orders
const getOrders = async (req, res, next) => {
    const query = 'SELECT u.username, o.* FROM orders o JOIN users u ON u.user_id = o.user_id WHERE is_completed != true AND voided_at IS NULL ORDER BY created_at ASC';

    try {
        const result = await pool.query(query);
        const orders = result.rows;
        res.status(200).json(orders);

    } catch (error) {
        logger.error('Error getting orders', error);
        return next(new HttpError(`Error getting orders: ${error}`, 500));
    }
}

// Get a single order by ID
const getOrder = async (req, res, next) => {
    const { order_id } = req.params

    const query = `
    SELECT u.username, o.* 
    FROM orders o 
    JOIN users u ON u.user_id = o.user_id 
    WHERE o.order_id = $1
        AND voided_at IS NULL ORDER BY created_at ASC`;

    let orderResponse

    try {
        orderResponse = await pool.query(query, [order_id])
    } catch (error) {
        logger.error('Error getting orders', error);

        return next(new HttpError(`Error getting orders: ${error}`, 500));
    }

    if (orderResponse.rows.length > 0) {
        res.status(200).json({ message: `Found order info for order #${order_id}`, response: orderResponse.rows[0] })
    } else {
        res.status(200).json({ message: `No orders found with id ${order_id}`, response: null })
    }
}

// Update tip amount for an order
const updateTip = async (req, res, next) => {

    const { order_id } = req.params
    const { tip_amount } = req.body

    let query = "UPDATE orders set tip_amount = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *"

    let response
    try {
        //const client = await pool.connect()
        response = await pool.query(query, [tip_amount, order_id])
        //client.release()
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


// Assign bartender to an order
const updateBartender = async (req, res, next) => {

    const { order_id } = req.params
    const { bartender_id } = req.body

    let query = "UPDATE orders set bartender_id = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *"
    let response
    try {
        response = await pool.query(query, [bartender_id, order_id])
    } catch (error) {
        logger.error(`Error updating bartender on order #${order_id}`)

        return next(
            new HttpError(`Error updating bartender on order #${order_id}`, 500)
        )
    }

    res.status(201).json(response.rows[0])
}

// Toggle paid status for an order
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

// Toggle completed status for an order
const updateCompleted = async (req, res, next) => {
    // similar to updatePaid, except now checking the order's current completed status
    const { order_id } = req.params
    const { isCompleted } = req.body

    const completedStatus = isCompleted ? false : true
    let text = "UPDATE orders SET is_completed = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *"

    let response
    const client = await pool.connect()

    try {
        response = await client.query(text, [completedStatus, order_id])

    } catch (error) {
        logger.error(`Error updating Order #${order_id}'s completed status. ${error}`, 500)

        return next(new HttpError(`Error updating Order #${order_id}'s completed status. ${error}`, 500))
    }
    client.release()

    res.status(201).json({ message: `Updated completedStatus of Order ${order_id} to ${completedStatus}`, newValue: completedStatus, response: response.rows[0] })
}

// Get orders for admin view
const getOrdersAdmin = async (req, res, next) => {
    let { limit } = req.params
    let query = `SELECT u.username, o.* 
                FROM orders o 
                JOIN users u ON u.user_id = o.user_id 
                WHERE voided_at IS NULL 
                ORDER BY is_completed, created_at desc LIMIT $1`
    let response

    try {
        response = await pool.query(query, [limit])
    } catch (error) {
        logger.error(`Error getting incomplete orders. ${error}`, 500)
        return next(new HttpError("Error getting incomplete orders", 500))
    }
    res.status(200).json(response.rows)
}

// Get orders grouped by user
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

// Get leaderboard data for orders
const getOrdersLeaderboard = async (req, res, next) => {
    // Grab user_id from query params if given
    const { userId } = req.query;

    // Query for the top 10 users
    let topUsersQuery =
        "WITH user_leaderboard AS (SELECT user_id, photo_url, username, drink_quantity, shot_quantity, amount_paid, adjusted_donations, (SELECT COUNT(*) FROM user_totals) AS total_users FROM leaderboard_totals WHERE amount_paid + adjusted_donations > 0 ORDER BY amount_paid + adjusted_donations DESC LIMIT 10) SELECT *, total_users FROM user_leaderboard";



    // Query for the rank of a specific user
    let userRankQuery = `
        SELECT user_id, photo_url, username, drink_quantity, shot_quantity, amount_paid, adjusted_donations, rank FROM ( SELECT user_id, photo_url, username, drink_quantity, shot_quantity, amount_paid, adjusted_donations, RANK() OVER (ORDER BY amount_paid + adjusted_donations DESC) AS rank FROM leaderboard_totals ) ranked WHERE user_id = $1 `;

    // Query for the total donations sum
    let sumQuery = `SELECT * FROM d4k_total`;

    let topUsersResponse, userRankResponse, sumResponse;

    try {
        topUsersResponse = await pool.query(topUsersQuery);
    } catch (error) {
        logger.error(`Error getting top users for leaderboard. ${error}`, 500);
        return next(new HttpError(`Error getting top users for leaderboard. ${error}`, 500));
    }

    try {
        sumResponse = await pool.query(sumQuery);
    } catch (error) {
        logger.error(`Error getting overall total for leaderboard. ${error}`, 500);
        return next(new HttpError(`Error getting overall total for leaderboard. ${error}`, 500));
    }

    // Check if user_id is provided to calculate their rank
    if (userId) {
        try {
            userRankResponse = await pool.query(userRankQuery, [userId]);
        } catch (error) {
            logger.error(`Error getting rank for user. ${error}`, 500);
            return next(new HttpError(`Error getting rank for user. ${error}`, 500));
        }
    }

    // Combined query for drinks and shots
    let drinkCountQuery = `WITH drink_counts AS (SELECT *, SUM(CASE WHEN type != 'shot' THEN total_orders ELSE 0 END) OVER () AS drink_quantity, SUM(CASE WHEN type = 'shot' THEN total_orders ELSE 0 END) OVER () AS shot_quantity FROM order_totals) SELECT *, drink_quantity, shot_quantity FROM drink_counts ORDER BY total_orders DESC`

    try {
        drinkCountResponse = await pool.query(drinkCountQuery)
    } catch (error) {
        logger.error(`Error getting drink counts for leaderboard. ${error}`, 500)
        return next(new HttpError(`Error getting drink counts for leaderboard. ${error}`, 500))
    }

    // grab total count for drinks and shots
    const drinkQuantity = drinkCountResponse.rows[0]?.drink_quantity || 0
    const shotQuantity = drinkCountResponse.rows[0]?.shot_quantity || 0

    res.status(200).json({
        message: "Retrieved orders for leaderboard!",
        topUsers: topUsersResponse.rows,
        userRank: userRankResponse ? userRankResponse.rows[0] : null,
        sumTotal: sumResponse?.rows[0]?.d4k_total,
        totalUsers: topUsersResponse.rows[0].total_users,
        drinkQuantity: drinkQuantity,
        shotQuantity: shotQuantity
    });
};


// Soft delete (void) an order
const deleteOrder = async (req, res, next) => {
    const { order_id } = req.params

    let text = "UPDATE orders SET voided_at = NOW(), updated_at = NOW() WHERE order_id = $1"

    let response

    try {
        response = await pool.query(text, [order_id])
    } catch (error) {
        logger.error(`Error voiding order #${order_id}. ${error}`, 500)
        return next(new HttpError(`Error voiding order #${order_id}. ${error}`, 500))
    }

    res.status(200).json({ message: `Voided order #${order_id}`, response: response })
}

// Unvoid an order
const unvoidOrder = async (req, res, next) => {
    const { order_id } = req.params
    let text = "UPDATE orders SET voided_at = NULL, updated_at = NOW() WHERE order_id = $1"

    let response

    try {
        response = await pool.query(text, [order_id])
    } catch (error) {
        logger.error(`Error unvoiding order #${order_id}`)
        return next(new HttpError(`Error unvoiding order #${order_id}`, 500))
    }

    res.status(200).json({ message: `Unvoided order #${order_id}`, response: response })
}

// Get detailed leaderboard stats
const getLeaderboardStats = async (req, res, next) => {
    // responses
    let topUsersResponse, sumResponse, drinkCountResponse, ingredientResponse

    // top 10 users
    let topUsersQuery = `
        WITH user_leaderboard AS (SELECT user_id, photo_url, username, drink_quantity, shot_quantity, amount_paid, adjusted_donations, (SELECT COUNT(*) FROM user_totals) AS total_users FROM leaderboard_totals WHERE amount_paid + adjusted_donations > 0 ORDER BY amount_paid + adjusted_donations DESC LIMIT 11) SELECT *, total_users FROM user_leaderboard`

    try {
        topUsersResponse = await pool.query(topUsersQuery)
    } catch (error) {
        logger.error(`Error getting top ten for leaderboard. ${error}`, 500)
        return next(new HttpError(`Error getting top ten for leaderboard. ${error}`, 500))
    }

    // d4k total
    let sumQuery = `SELECT * FROM d4k_total`

    try {
        sumResponse = await pool.query(sumQuery)
    } catch (error) {
        logger.error(`Error getting sum total for leaderboard. ${error}`, 500)
        return next(new HttpError(`Error getting overall total for leaderboard. ${error}`, 500))
    }

    // Combined query for drinks and shots
    let drinkCountQuery = `WITH drink_counts AS (SELECT *, SUM(CASE WHEN type != 'shot' THEN total_orders ELSE 0 END) OVER () AS drink_quantity, SUM(CASE WHEN type = 'shot' THEN total_orders ELSE 0 END) OVER () AS shot_quantity FROM order_totals) SELECT *, drink_quantity, shot_quantity FROM drink_counts ORDER BY total_orders DESC`

    try {
        drinkCountResponse = await pool.query(drinkCountQuery)
    } catch (error) {
        logger.error(`Error getting drink counts for leaderboard. ${error}`, 500)
        return next(new HttpError(`Error getting drink counts for leaderboard. ${error}`, 500))
    }

    // ingredient totals
    let ingredientQuery = `
        SELECT *
        FROM ingredient_totals
        ORDER BY type, ingredient_totals_ml DESC
    `

    try {
        ingredientResponse = await pool.query(ingredientQuery)
    } catch (error) {
        logger.error(`Error getting ingredient totals for leaderboard. ${error}`, 500)
        return next(new HttpError(`Error getting ingredient totals for leaderboard. ${error}`, 500))
    }

    // Separate the results
    const drinksResponse = drinkCountResponse.rows.filter(drink => drink.type !== "shot")
    const shotsResponse = drinkCountResponse.rows.filter(drink => drink.type === "shot")

    // grab total count for drinks and shots
    const drinkQuantity = drinkCountResponse.rows[0]?.drink_quantity || 0
    const shotQuantity = drinkCountResponse.rows[0]?.shot_quantity || 0

    res.status(200).json({
        message: "Retrieved leaderboard data!",
        topUsers: topUsersResponse.rows,
        totalUsers: topUsersResponse.rows[0].total_users,
        sumTotal: sumResponse?.rows[0]?.d4k_total,
        drinkCount: drinksResponse,
        drinkQuantity: drinkQuantity,
        shots: shotsResponse,
        shotQuantity: shotQuantity,
        ingredientCount: ingredientResponse.rows
    })
}



exports.createOrder = createOrder
exports.getOrder = getOrder
exports.getOrders = getOrders
exports.updateTip = updateTip
exports.updatePaid = updatePaid
exports.updateCompleted = updateCompleted
exports.updateBartender = updateBartender
exports.getOrdersAdmin = getOrdersAdmin
exports.getOrdersGrouped = getOrdersGrouped
exports.getOrdersLeaderboard = getOrdersLeaderboard
exports.deleteOrder = deleteOrder
exports.unvoidOrder = unvoidOrder
exports.getLeaderboardStats = getLeaderboardStats