
// External dependencies
const logger = require('firebase-functions/logger');

// Internal dependencies
const HttpError = require("../models/http-error");
const pool = require("../db");
const twilioControllers = require("../controllers/twilio-controllers");

// --- Order Controllers ---

const createOrder = async (req, res, next) => {
    const { user_id, drinkTitle, customDrinkTitle, drinkCost, quantity, tip_amount, comments } = req.body;

    const total = Math.floor(drinkCost * quantity);

    const orderText = `INSERT INTO orders(user_id, drink, quantity, total, tip_amount, comments, is_paid, is_completed, created_at, updated_at) 
                       VALUES ($1, $2, $3, $4, $5, $6, false, false, NOW(), NOW()) RETURNING *`;

    let newOrder;

    try {
        newOrder = await pool.query(orderText, [user_id, drinkTitle || customDrinkTitle, quantity, total, tip_amount, comments]);
    } catch (error) {
        logger.error('Error creating order', error);
        return next(new HttpError(`Error Creating Order: ${error}`, 500));
    }
    
    res.status(201).json(newOrder?.rows[0]);
};

// Get all active orders
const getOrders = async (req, res, next) => {
    const query = `SELECT u.username, o.* 
                   FROM orders o 
                   JOIN users u ON u.user_id = o.user_id 
                   WHERE is_completed != true AND status = 'pending' AND voided_at IS NULL 
                   ORDER BY created_at ASC`;

    try {
        const result = await pool.query(query);
        const orders = result.rows;
        res.status(200).json(orders);
    } catch (error) {
        logger.error('Error getting orders', error);
        return next(new HttpError(`Error getting orders: ${error}`, 500));
    }
};

// Get a single order by ID
const getOrder = async (req, res, next) => {
    const { order_id } = req.params;

    const query = `SELECT u.username, o.* 
                   FROM orders o 
                   JOIN users u ON u.user_id = o.user_id 
                   WHERE o.order_id = $1 AND voided_at IS NULL 
                   ORDER BY created_at ASC`;

    let orderResponse;

    try {
        orderResponse = await pool.query(query, [order_id]);
    } catch (error) {
        logger.error('Error getting order', error);
        return next(new HttpError(`Error getting order: ${error}`, 500));
    }

    if (orderResponse.rows.length > 0) {
        res.status(200).json({ 
            message: `Found order info for order #${order_id}`, 
            response: orderResponse.rows[0] 
        });
    } else {
        res.status(200).json({ 
            message: `No orders found with id ${order_id}`, 
            response: null 
        });
    }
};

// Update tip amount for an order
const updateTip = async (req, res, next) => {
    const { order_id } = req.params;
    const { tip_amount } = req.body;

    const query = "UPDATE orders SET tip_amount = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *";

    let response;
    try {
        response = await pool.query(query, [tip_amount, order_id]);
    } catch (error) {
        logger.error(`Error updating tip amount on order #${order_id}`, error);
        return next(new HttpError(`Error updating tip amount on order #${order_id}`, 500));
    }

    res.status(201).json(response.rows[0]);
};

// Assign bartender to an order
const updateBartender = async (req, res, next) => {
    const { order_id } = req.params;
    const { bartender_id } = req.body;

    const query = "UPDATE orders SET bartender_id = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *";
    
    let response;
    try {
        response = await pool.query(query, [bartender_id, order_id]);
    } catch (error) {
        logger.error(`Error updating bartender on order #${order_id}`, error);
        return next(new HttpError(`Error updating bartender on order #${order_id}`, 500));
    }

    res.status(201).json(response.rows[0]);
};

// Update status for an order
const updateStatus = async (req, res, next) => {
    const { order_id } = req.params;
    const { status } = req.body;

    let order;

    if(status === 'made'){
        try {
            const query = `
                SELECT o.text_message_sent, o.drink, o.quantity, u.phone_number 
                FROM orders o 
                JOIN users u ON o.user_id = u.user_id 
                WHERE o.order_id = $1
            `;
            const combinedResponse = await pool.query(query, [order_id]);
            const orderData = combinedResponse.rows[0];
            const phone_number = orderData?.phone_number;
            
            // only send a text if one hasn't already for this order
            if(phone_number && !orderData.text_message_sent){
                twilioControllers.sendMessage(phone_number, `Your order for ${orderData.drink}${orderData.quantity > 1 ? ` x${orderData.quantity}` : ''} is ready! Come to the bar for pick up 🎅`);
                // Update status AND text_message_sent in a single query
                const query = "UPDATE orders SET status = $1, text_message_sent = TRUE, updated_at = NOW() WHERE order_id = $2 RETURNING *";
                const orderResponse = await pool.query(query, [status, order_id]);
                order = orderResponse.rows[0];
            } else {
                // Just update status if no text to send
                const query = "UPDATE orders SET status = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *";
                const orderResponse = await pool.query(query, [status, order_id]);
                order = orderResponse.rows[0];
            }
        } catch (error) {
            logger.error(`Error sending text to user for order ${order_id}: ${error}`, error);
            return next(new HttpError(`Error updating order status: ${error}`, 500));
        }
    } else {
        // For non-'made' statuses, single update query
        const query = "UPDATE orders SET status = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *";
        try {
            const orderResponse = await pool.query(query, [status, order_id]);
            order = orderResponse.rows[0];
        } catch (error) {
            logger.error(`Error updating status on order #${order_id}`, error);
            return next(new HttpError(`Error updating status on order #${order_id}: ${error}`, 500));
        }
    }

    res.status(201).json(order);
};

// Toggle paid status for an order
const updatePaid = async (req, res, next) => {
    const { order_id } = req.params;
    const { isPaid } = req.body;

    // Toggle the paid status
    const paidStatus = isPaid ? false : true;
    const query = "UPDATE orders SET is_paid = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *";

    let response;

    try {
        response = await pool.query(query, [paidStatus, order_id]);
    } catch (error) {
        logger.error(`Error updating Order #${order_id}'s paid status`, error);
        return next(new HttpError(`Error updating Order #${order_id}'s paid status: ${error}`, 500));
    }

    res.status(201).json({ 
        message: `Updated paidStatus of Order ${order_id} to ${paidStatus}`, 
        newValue: paidStatus, 
        response: response.rows[0] 
    });
};

// Toggle completed status for an order
const updateCompleted = async (req, res, next) => {
    const { order_id } = req.params;
    const { isCompleted } = req.body;

    const completedStatus = isCompleted ? false : true;
    const query = "UPDATE orders SET is_completed = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *";

    let response;
    const client = await pool.connect();

    try {
        response = await client.query(query, [completedStatus, order_id]);
    } catch (error) {
        logger.error(`Error updating Order #${order_id}'s completed status`, error);
        return next(new HttpError(`Error updating Order #${order_id}'s completed status: ${error}`, 500));
    } finally {
        client.release();
    }

    res.status(201).json({ 
        message: `Updated completedStatus of Order ${order_id} to ${completedStatus}`, 
        newValue: completedStatus, 
        response: response.rows[0] 
    });
};

// Get orders for admin view
const getOrdersAdmin = async (req, res, next) => {
    const { limit } = req.params;
    const { excludeDelivered } = req.query;

    let query = `SELECT u.username, o.* 
                   FROM orders o 
                   JOIN users u ON u.user_id = o.user_id 
                   WHERE voided_at IS NULL`;

    if (excludeDelivered === 'true') {
        query += ` AND status != 'delivered'`;
    }

    query += ` ORDER BY is_completed, status = 'delivered', created_at DESC LIMIT $1`;
    
    let response;

    try {
        response = await pool.query(query, [limit]);
    } catch (error) {
        logger.error('Error getting orders for admin', error);
        return next(new HttpError("Error getting incomplete orders", 500));
    }
    
    res.status(200).json(response.rows);
};

// Get orders grouped by user
const getOrdersGrouped = async (req, res, next) => {
    const query = "SELECT * FROM user_totals";
    
    let response;

    try {
        response = await pool.query(query);
    } catch (error) {
        logger.error('Error getting orders grouped by usernames', error);
        return next(new HttpError("Error getting orders grouped by usernames", 500));
    }

    res.status(200).json(response.rows);
};

// Get leaderboard data for orders
const getOrdersLeaderboard = async (req, res, next) => {
    const { userId } = req.query;

    // Query for the top 10 users
    const topUsersQuery = `WITH user_leaderboard AS (
                               SELECT user_id, photo_url, username, drink_quantity, shot_quantity, amount_paid, adjusted_donations, 
                                      (SELECT COUNT(*) FROM user_totals) AS total_users 
                               FROM leaderboard_totals 
                               WHERE amount_paid + adjusted_donations > 0 
                               ORDER BY amount_paid + adjusted_donations DESC LIMIT 10
                           ) 
                           SELECT *, total_users FROM user_leaderboard`;

    // Query for the rank of a specific user
    const userRankQuery = `SELECT user_id, photo_url, username, drink_quantity, shot_quantity, amount_paid, adjusted_donations, rank 
                           FROM ( 
                               SELECT user_id, photo_url, username, drink_quantity, shot_quantity, amount_paid, adjusted_donations, 
                                      RANK() OVER (ORDER BY amount_paid + adjusted_donations DESC) AS rank 
                               FROM leaderboard_totals 
                           ) ranked 
                           WHERE user_id = $1`;

    // Query for the total donations sum
    const sumQuery = `SELECT * FROM d4k_total`;

    let topUsersResponse, userRankResponse, sumResponse, drinkCountResponse;

    try {
        topUsersResponse = await pool.query(topUsersQuery);
    } catch (error) {
        logger.error('Error getting top users for leaderboard', error);
        return next(new HttpError(`Error getting top users for leaderboard: ${error}`, 500));
    }

    try {
        sumResponse = await pool.query(sumQuery);
    } catch (error) {
        logger.error('Error getting overall total for leaderboard', error);
        return next(new HttpError(`Error getting overall total for leaderboard: ${error}`, 500));
    }

    // Check if user_id is provided to calculate their rank
    if (userId) {
        try {
            userRankResponse = await pool.query(userRankQuery, [userId]);
        } catch (error) {
            logger.error('Error getting rank for user', error);
            return next(new HttpError(`Error getting rank for user: ${error}`, 500));
        }
    }

    // Combined query for drinks and shots
    const drinkCountQuery = `WITH drink_counts AS (
                                 SELECT *, 
                                        SUM(CASE WHEN type != 'shot' THEN total_orders ELSE 0 END) OVER () AS drink_quantity, 
                                        SUM(CASE WHEN type = 'shot' THEN total_orders ELSE 0 END) OVER () AS shot_quantity 
                                 FROM order_totals
                             ) 
                             SELECT *, drink_quantity, shot_quantity 
                             FROM drink_counts 
                             ORDER BY total_orders DESC`;

    try {
        drinkCountResponse = await pool.query(drinkCountQuery);
    } catch (error) {
        logger.error('Error getting drink counts for leaderboard', error);
        return next(new HttpError(`Error getting drink counts for leaderboard: ${error}`, 500));
    }

    // Grab total count for drinks and shots
    const drinkQuantity = drinkCountResponse.rows[0]?.drink_quantity || 0;
    const shotQuantity = drinkCountResponse.rows[0]?.shot_quantity || 0;

    res.status(200).json({
        message: "Retrieved orders for leaderboard!",
        topUsers: topUsersResponse.rows,
        userRank: userRankResponse ? userRankResponse.rows[0] : null,
        sumTotal: sumResponse?.rows[0]?.d4k_total,
        totalUsers: topUsersResponse ? topUsersResponse.rows[0].total_users : 0,
        drinkQuantity: drinkQuantity,
        shotQuantity: shotQuantity
    });
};


// Soft delete (void) an order
const deleteOrder = async (req, res, next) => {
    const { order_id } = req.params;

    const query = "UPDATE orders SET voided_at = NOW(), updated_at = NOW() WHERE order_id = $1";

    let response;

    try {
        response = await pool.query(query, [order_id]);
    } catch (error) {
        logger.error(`Error voiding order #${order_id}`, error);
        return next(new HttpError(`Error voiding order #${order_id}: ${error}`, 500));
    }

    res.status(200).json({ message: `Voided order #${order_id}`, response: response });
};

// Unvoid an order
const unvoidOrder = async (req, res, next) => {
    const { order_id } = req.params;
    const query = "UPDATE orders SET voided_at = NULL, updated_at = NOW() WHERE order_id = $1";

    let response;

    try {
        response = await pool.query(query, [order_id]);
    } catch (error) {
        logger.error(`Error unvoiding order #${order_id}`, error);
        return next(new HttpError(`Error unvoiding order #${order_id}`, 500));
    }

    res.status(200).json({ message: `Unvoided order #${order_id}`, response: response });
};

// Get detailed leaderboard stats
const getLeaderboardStats = async (req, res, next) => {
    let topUsersResponse, sumResponse, drinkCountResponse, ingredientResponse;

    // Top 10 users
    const topUsersQuery = `WITH user_leaderboard AS (
                               SELECT user_id, photo_url, username, drink_quantity, shot_quantity, amount_paid, adjusted_donations, 
                                      (SELECT COUNT(*) FROM user_totals) AS total_users 
                               FROM leaderboard_totals 
                               WHERE amount_paid + adjusted_donations > 0 
                               ORDER BY amount_paid + adjusted_donations DESC LIMIT 11
                           ) 
                           SELECT *, total_users FROM user_leaderboard`;

    try {
        topUsersResponse = await pool.query(topUsersQuery);
    } catch (error) {
        logger.error('Error getting top ten for leaderboard', error);
        return next(new HttpError(`Error getting top ten for leaderboard: ${error}`, 500));
    }

    // D4K total
    const sumQuery = `SELECT * FROM d4k_total`;

    try {
        sumResponse = await pool.query(sumQuery);
    } catch (error) {
        logger.error('Error getting sum total for leaderboard', error);
        return next(new HttpError(`Error getting overall total for leaderboard: ${error}`, 500));
    }

    // Combined query for drinks and shots
    const drinkCountQuery = `WITH drink_counts AS (
                                 SELECT *, 
                                        SUM(CASE WHEN type != 'shot' THEN total_orders ELSE 0 END) OVER () AS drink_quantity, 
                                        SUM(CASE WHEN type = 'shot' THEN total_orders ELSE 0 END) OVER () AS shot_quantity 
                                 FROM order_totals
                             ) 
                             SELECT *, drink_quantity, shot_quantity 
                             FROM drink_counts 
                             ORDER BY total_orders DESC`;

    try {
        drinkCountResponse = await pool.query(drinkCountQuery);
    } catch (error) {
        logger.error('Error getting drink counts for leaderboard', error);
        return next(new HttpError(`Error getting drink counts for leaderboard: ${error}`, 500));
    }

    // Ingredient totals
    const ingredientQuery = `SELECT *
                             FROM ingredient_totals
                             ORDER BY type, ingredient_totals_ml DESC`;

    try {
        ingredientResponse = await pool.query(ingredientQuery);
    } catch (error) {
        logger.error('Error getting ingredient totals for leaderboard', error);
        return next(new HttpError(`Error getting ingredient totals for leaderboard: ${error}`, 500));
    }

    // Separate the results
    const drinksResponse = drinkCountResponse.rows.filter(drink => drink.type !== "shot");
    const shotsResponse = drinkCountResponse.rows.filter(drink => drink.type === "shot");

    // Grab total count for drinks and shots
    const drinkQuantity = drinkCountResponse.rows[0]?.drink_quantity || 0;
    const shotQuantity = drinkCountResponse.rows[0]?.shot_quantity || 0;

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
    });
};

const getNonDeliveredOrderCount = async (req, res, next) => {
    const query = "SELECT COUNT(*) as count FROM orders WHERE status != 'delivered' AND voided_at IS NULL";
    
    let response;
    try {
        response = await pool.query(query);
    } catch (error) {
        logger.error(`Error fetching non-delivered order count. ${error}`);
        return next(new HttpError(`Error fetching non-delivered order count. ${error}`, 500));
    }

    res.status(200).json({ count: parseInt(response.rows[0].count) });
};

// Export all controller functions
exports.createOrder = createOrder;
exports.getOrder = getOrder;
exports.getOrders = getOrders;
exports.updateTip = updateTip;
exports.updatePaid = updatePaid;
exports.updateCompleted = updateCompleted;
exports.updateBartender = updateBartender;
exports.updateStatus = updateStatus;
exports.getOrdersAdmin = getOrdersAdmin;
exports.getOrdersGrouped = getOrdersGrouped;
exports.getOrdersLeaderboard = getOrdersLeaderboard;
exports.deleteOrder = deleteOrder;
exports.unvoidOrder = unvoidOrder;
exports.getLeaderboardStats = getLeaderboardStats;
exports.getNonDeliveredOrderCount = getNonDeliveredOrderCount;