// External dependencies
const logger = require('firebase-functions/logger');

// Internal dependencies
const HttpError = require("../models/http-error");
const pool = require("../db");
const twilioControllers = require("../controllers/twilio-controllers");

// --- User Controllers ---

const createUser = async (req, res, next) => {
    const { username } = req.body;

    // Query database to see if that username is already taken
    const nameQuery = "SELECT * FROM users WHERE UPPER(username) = UPPER($1)";
    let response;

    try {
        response = await pool.query(nameQuery, [username]);
    } catch (error) {
        logger.error(`Error checking if username is available: ${error}`);
        return next(new HttpError(`Error checking if username is available: ${error}`, 500));
    }

    if (response.rows.length > 0) {
        res.status(409).json({ 
            message: "This username is taken!", 
            user_id: response.rows[0].user_id 
        });
    } else {
        // Query for inserting into database
        const query = "INSERT INTO users(username, created_at, updated_at) VALUES ($1, NOW(), NOW()) RETURNING *";
        let createResponse;

        try {
            createResponse = await pool.query(query, [username]);
        } catch (error) {
            logger.error(`Error creating user: ${error}`);
            return next(new HttpError("Error creating user.", 500));
        }

        res.status(201).json(createResponse.rows[0]);
    }
};

const createUserWithPhone = async (req, res, next) => {
    const { username, phoneNumber } = req.body;

    // Query database to see if that username is already taken
    const nameQuery = "SELECT * FROM users WHERE UPPER(username) = UPPER($1)";
    let response;

    try {
        response = await pool.query(nameQuery, [username]);
    } catch (error) {
        logger.error(`Error checking if username is available: ${error}`);
        return next(new HttpError(`Error checking if username is available: ${error}`, 500));
    }

    if (response.rows.length > 0) {
        res.status(409).json({ 
            message: "This username is taken!", 
            user_id: response.rows[0].user_id 
        });
    } else {
        // Query for inserting into database
        const query = "INSERT INTO users(username, phone_number, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *";
        let createResponse;

        try {
            createResponse = await pool.query(query, [username, phoneNumber]);
        } catch (error) {
            logger.error(`Error creating user with phone number: ${error}`);
            return next(new HttpError("Error creating user with phone number.", 500));
        }

        twilioControllers.sendMessage(phoneNumber, `Welcome to D4K, ${username}! We will send order updates to this number 🎄 Reply STOP to unsubscribe.`);

        res.status(201).json(createResponse.rows[0]);
    }
};

/** Check if username is taken already by phone number */
const getUserIdByUsername = async (req, res, next) => {
    const { username } = req.params;
    
    const query = "SELECT * FROM users WHERE UPPER(username) = UPPER($1)";
    let response;

    try {
        response = await pool.query(query, [username]);
    } catch (error) {
        logger.error(`Error searching for users: ${error}`);
        return next(new HttpError("Error searching for users.", 500));
    }
    
    res.status(200).json({ user_id: response?.rows[0]?.user_id });
};

/** Check if username is taken already by phone */
const getUserIdByPhoneNumber = async (req, res, next) => {
    const { phoneNumber } = req.params;

    const query = "SELECT * FROM users WHERE phone_number = $1";
    let response;

    try {
        response = await pool.query(query, [phoneNumber]);
    } catch (error) {
        logger.error(`Error searching for users: ${error}`);
        return next(new HttpError("Error searching for users.", 500));
    }
    
    res.status(200).json({ user_id: response?.rows[0]?.user_id });
};

/** Get a user by user_id */
const getUserById = async (req, res, next) => {
    const { user_id } = req.params;
    
    const query = "SELECT * FROM users WHERE user_id = $1";
    let response;

    try {
        response = await pool.query(query, [user_id]);
    } catch (error) {
        logger.error(`Error searching for user_id ${user_id} ${error}`);
        return next(new HttpError(`Error searching for user_id ${user_id}.`, 500));
    }
    
    console.log(response.rows[0]);
    res.status(200).json({ user: response.rows[0] });
};

const adjustDonations = async (req, res, next) => {
    const { donation_amount } = req.body;
    const { user_id } = req.params;

    const query = "UPDATE users SET adjusted_donations = $1, updated_at = NOW() WHERE user_id = $2 RETURNING *";
    let response;

    try {
        response = await pool.query(query, [donation_amount, user_id]);
    } catch (error) {
        logger.error(`Error updating user #${user_id}'s donation amount`);
        return next(new HttpError(`Error updating user #${user_id}'s donation amount`, 500));
    }

    res.status(201).json(true);
};

const getAllUsers = async (req, res, next) => {
    const query = "SELECT * from users";
    let response;

    try {
        response = await pool.query(query);
    } catch (error) {
        logger.error(`Error retrieving users: ${error}`);
        return next(new HttpError("Error retrieving users.", 500));
    }

    res.status(200).json(response.rows);
};

const updateUsername = async (req, res, next) => {
    const { user_id } = req.params;
    const { username } = req.body;

    const nameQuery = "SELECT * FROM users WHERE UPPER(username) = UPPER($1)";
    let nameQueryResponse;

    try {
        nameQueryResponse = await pool.query(nameQuery, [username]);
    } catch (error) {
        logger.error(`Error checking if username is available: ${error}`);
        return next(new HttpError(`Error checking if username is available: ${error}`, 500));
    }

    if (nameQueryResponse.rows.length > 0) {
        res.status(409).json({ user_id: nameQueryResponse.rows[0].user_id });
    } else {
        const query = "UPDATE users SET username = $1, updated_at = NOW() WHERE user_id = $2 RETURNING *";
        let response;

        try {
            response = await pool.query(query, [username, user_id]);
        } catch (error) {
            logger.error(`Error changing User ${user_id}'s name to ${username}. ${error}`);
            return next(new HttpError(`Error changing User ${user_id}'s name to ${username}.`, 500));
        }

        res.status(201).json(response.rows[0]);
    }
};

const updatePhoneNumber = async (req, res, next) => {
    const { user_id } = req.params;
    const { phoneNumber } = req.body;

    const nameQuery = "SELECT * FROM users WHERE phone_number = $1";
    let nameQueryResponse;

    try {
        nameQueryResponse = await pool.query(nameQuery, [phoneNumber]);
    } catch (error) {
        logger.error(`Error checking if phoneNumber is available: ${error}`);
        return next(new HttpError(`Error checking if phoneNumber is available: ${error}`, 500));
    }

    if (nameQueryResponse.rows.length > 0) {
        res.status(409).json({ user_id: nameQueryResponse.rows[0].user_id });
    } else {
        const query = "UPDATE users SET phone_number = $1, updated_at = NOW() WHERE user_id = $2 RETURNING *";
        let response;

        try {
            response = await pool.query(query, [phoneNumber, user_id]);
        } catch (error) {
            logger.error(`Error changing User ${user_id}'s phone to ${phoneNumber}. ${error}`);
            return next(new HttpError(`Error changing User ${user_id}'s phone to ${phoneNumber}.`, 500));
        }

        res.status(201).json(response.rows[0]);
    }
};

const changePhotoUrl = async (req, res, next) => {
    const { user_id } = req.params;
    const { photo_url } = req.body;

    const query = "UPDATE users SET photo_url = $1 WHERE user_id = $2 RETURNING *";
    let response;

    try {
        response = await pool.query(query, [photo_url, user_id]);
    } catch (error) {
        logger.error(`Error changing User ${user_id}'s photo_url to ${photo_url}. ${error}`);
        return next(new HttpError(`Error changing User ${user_id}'s photo_url to ${photo_url}.`, 500));
    }
    
    res.status(201).json(response.rows[0]);
};

const updatePaymentAccount = async (req, res, next) => {
    const { user_id } = req.params;
    const { payment_account } = req.body;

    const query = "UPDATE users SET payment_account = $1, tab_update_requested = TRUE, updated_at = NOW() WHERE user_id = $2 RETURNING *";

    let response;
    try {
        response = await pool.query(query, [payment_account, user_id]);
    } catch (error) {
        logger.error(`Error updating payment account for user #${user_id}`, error);
        return next(new HttpError(`Error updating payment account for user #${user_id}`, 500));
    }

    // Fetch the user's tab total to include in SMS notification
    const tabQuery = "SELECT tab_total FROM tab_totals WHERE user_id = $1";
    let tabResponse;
    let tabTotal = 0;

    try {
        tabResponse = await pool.query(tabQuery, [user_id]);
        if (tabResponse.rows.length > 0) {
            tabTotal = tabResponse.rows[0].tab_total;
        }
    } catch (error) {
        logger.warn(`Warning: Could not fetch tab total for user #${user_id}`, error);
    }

    // Send SMS notification to admin using Twilio controller
    const username = response.rows[0].username;
    const smsMessage = `🍹 TAB UPDATE REQUEST\nUser: ${username}\nPayment: ${payment_account}\nTab Total: $${tabTotal}`;
    const adminPhone = '6787361277';

    try {
        await twilioControllers.sendMessage(adminPhone, smsMessage);
        logger.info(`SMS notification sent for user #${user_id}`);
    } catch (error) {
        logger.warn(`Warning: Could not send SMS notification for user #${user_id}`, error);
        // Don't fail the request if SMS fails
    }

    res.status(201).json(response.rows[0]);
};

const getTab = async (req, res, next) => {
    const { user_id } = req.params;
    const text = `SELECT t.user_id, t.username, t.quantity, t.drink_cost_total, t.tips_total, t.tab_total, t.order_history, u.amount_paid + u.adjusted_donations as total_donated
                FROM tab_totals t
                LEFT JOIN user_totals u ON u.user_id = t.user_id
                WHERE t.user_id = $1`;
    let response;

    try {
        response = await pool.query(text, [user_id]);
    } catch (error) {
        logger.error(`Error getting user #${user_id}'s tab. ${error}`);
        return next(new HttpError(`Error getting user #${user_id}'s tab. ${error}`, 500));
    }

    let history = {};

    if (response !== null && response.rows > 0 && response.rows[0].order_history !== null) {
        let array = response.rows[0].order_history.split(", ");
        array.forEach(i => {
            let splitArray = i.split('—');
    
            console.log("split: " + splitArray);
    
            if (history[splitArray[0]]) {
                history[splitArray[0]] += parseInt(splitArray[1]);
            } else {
                history[splitArray[0]] = parseInt(splitArray[1]);
            }
        });
    }

    console.log("HISTORYYYYYYYYY: " + history);

    res.status(200).json({ tab: response.rows[0] ? response.rows[0] : {}, order_history: history });
};

const closeTab = async (req, res, next) => {
    const { user_id } = req.params;
    const text = "UPDATE orders SET is_paid = TRUE, updated_at = NOW() WHERE user_id = $1 RETURNING *";
    let response;

    try {
        response = await pool.query(text, [user_id]);
    } catch (error) {
        logger.error(`Error setting User #${user_id}'s orders to paid. ${error}`);
        return next(new HttpError(`Error setting User #${user_id}'s orders to paid. ${error}`, 500));
    }

    // Reset tab_update_requested flag after successfully marking orders as paid
    const updateUserQuery = "UPDATE users SET tab_update_requested = FALSE, updated_at = NOW() WHERE user_id = $1";
    try {
        await pool.query(updateUserQuery, [user_id]);
    } catch (error) {
        logger.error(`Error resetting tab_update_requested for user #${user_id}. ${error}`);
        return next(new HttpError(`Error resetting tab_update_requested for user #${user_id}. ${error}`, 500));
    }

    res.status(201).json({ 
        message: `Set User #${user_id}'s ${response.rowCount} orders to paid`, 
        response: response.rows 
    });
};

const getPendingUpdateCount = async (req, res, next) => {
    const query = "SELECT COUNT(*) as count FROM users WHERE tab_update_requested = TRUE";
    
    let response;
    try {
        response = await pool.query(query);
    } catch (error) {
        logger.error(`Error fetching pending update count. ${error}`);
        return next(new HttpError(`Error fetching pending update count. ${error}`, 500));
    }

    res.status(200).json({ count: parseInt(response.rows[0].count) });
};

const crypto = require('crypto');

// Send recovery SMS
const sendRecoverySms = async (req, res, next) => {
    const { phone_number } = req.body;

    // Find user by phone number
    const findUserQuery = "SELECT user_id FROM users WHERE phone_number = $1";

    let user;
    try {
        user = await pool.query(findUserQuery, [phone_number]);
    } catch (error) {
        logger.error(`Error finding user by phone ${phone_number}`, error);
        return next(new HttpError(`Error processing recovery request`, 500));
    }

    // Don't reveal if phone exists (security best practice)
    if (user.rows.length === 0) {
        return res.status(200).json({ message: "If a matching account exists, recovery SMS will be sent" });
    }

    const userId = user.rows[0].user_id;
    const recoveryToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store token in database
    const updateQuery = "UPDATE users SET recovery_token = $1, recovery_token_expiry = $2 WHERE user_id = $3";

    try {
        await pool.query(updateQuery, [recoveryToken, tokenExpiry, userId]);
    } catch (error) {
        logger.error(`Error storing recovery token for user #${userId}`, error);
        return next(new HttpError(`Error processing recovery request`, 500));
    }

    // Send SMS
    const frontendUrl = process.env.FRONTEND_URL || 'https://drink4thekids.com';
    const recoveryUrl = `${frontendUrl}/recover/${recoveryToken}`;
    const smsMessage = `🍹 Recover your Drink 4 the Kids account:\n${recoveryUrl}\n\nThis link expires in 24 hours.`;

    try {
        await twilioControllers.sendMessage(phone_number, smsMessage);
        logger.info(`Recovery SMS sent to ${phone_number}`);
    } catch (error) {
        logger.warn(`Warning: Could not send recovery SMS to ${phone_number}`, error);
        // Don't fail the request if SMS fails
    }

    res.status(200).json({ message: "If a matching account exists, recovery SMS will be sent" });
};

// Verify recovery token and return userId
const verifyRecoveryToken = async (req, res, next) => {
    const { token } = req.params;

    const query = "SELECT user_id FROM users WHERE recovery_token = $1 AND recovery_token_expiry > NOW()";

    try {
        const response = await pool.query(query, [token]);
        if (response.rows.length === 0) {
            return next(new HttpError(`Invalid or expired recovery token`, 400));
        }
        res.status(200).json({ user_id: response.rows[0].user_id });
    } catch (error) {
        logger.error(`Error verifying recovery token`, error);
        return next(new HttpError(`Error verifying recovery token`, 500));
    }
};

exports.createUser = createUser;
exports.createUserWithPhone = createUserWithPhone;
exports.getUserIdByUsername = getUserIdByUsername;
exports.getUserIdByPhoneNumber = getUserIdByPhoneNumber;
exports.getUserById = getUserById;
exports.adjustDonations = adjustDonations;
exports.getAllUsers = getAllUsers;
exports.updateUsername = updateUsername;
exports.updatePhoneNumber = updatePhoneNumber;
exports.changePhotoUrl = changePhotoUrl;
exports.updatePaymentAccount = updatePaymentAccount;
exports.getTab = getTab;
exports.closeTab = closeTab;
exports.getPendingUpdateCount = getPendingUpdateCount;
exports.sendRecoverySms = sendRecoverySms;
exports.verifyRecoveryToken = verifyRecoveryToken;