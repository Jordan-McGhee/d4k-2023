const HttpError = require("../models/http-error")
const pool = require("../db")
const logger = require('firebase-functions/logger')

const createUser = async (req, res, next) => {

    // pull data from body
    const { username } = req.body

    // query database to see if that username is already taken
    let nameQuery = "SELECT * FROM users WHERE UPPER(username) = UPPER($1)"
    let response

    try {
        response = await pool.query(nameQuery, [username])
    } catch (error) {
        logger.error(`Error checking if username is available: ${error}`)
        return next(new HttpError(`Error checking if username is available: ${error}`, 500))
    }

    if (response.rows.length > 0) {
        res.status(409).json({ message: "This username is taken!", user_id: response.rows[0].user_id })
    } else {
        // query for inserting into database
        let query = "INSERT INTO users(username, created_at, updated_at) VALUES ($1, NOW(), NOW()) RETURNING *"
        let response

        try {
            //const client = await pool.connect()
            response = await pool.query(query, [username])

        } catch (error) {
            logger.error(`Error creating user: ${error}`)
            return next(new HttpError("Error creating user.", 500))
        }

        res.status(201).json(response.rows[0])
    }
}

/** check if username is taken already */
const getUserIDByUsername = async (req, res, next) => {
    const { username } = req.params
    // check if any case variation of that username exists
    let query = "SELECT * FROM users WHERE UPPER(username) = UPPER($1)"
    let response

    try {
        response = await pool.query(query, [username])
    } catch (error) {
        logger.error(`Error searching for users: ${error}`)
        return next(new HttpError("Error searching for users.", 500))
    }
    res.status(200).json({ user_id: response?.rows[0]?.user_id })
}

/** Get a user by user_id */
const getUserById = async (req, res, next) => {
    const { user_id } = req.params
    // check if any case variation of that username exists
    let query = "SELECT * FROM users WHERE user_id = $1"
    let response

    try {
        response = await pool.query(query, [user_id])
    } catch (error) {
        logger.error(`Error searching for user_id ${user_id} ${error}`)
        return next(new HttpError(`Error searching for user_id ${user_id}.`, 500))
    }
    res.status(200).json(response.rows[0])
}

const adjustDonations = async (req, res, next) => {
    const { donation_amount } = req.body
    const { user_id } = req.params

    let query = "UPDATE users SET adjusted_donations = $1, updated_at = NOW() WHERE user_id = $2 RETURNING *"
    let response

    try {
        response = await pool.query(query, [donation_amount, user_id])

    } catch (error) {
        logger.error(`Error updating user #${user_id}'s donation amount`)
        return next(new HttpError(`Error updating user #${user_id}'s donation amount`, 500))
    }

    res.status(201).json(true)
}

const getAllUsers = async (req, res, next) => {
    let query = "SELECT * from users"
    let response

    try {
        //const client = await pool.connect()
        response = await pool.query(query)
    } catch (error) {
        logger.error(`Error retreiving users: ${error}`)
        return next(new HttpError("Error retreiving users.", 500))
    }

    res.status(200).json(response.rows)
}

const changeUsername = async (req, res, next) => {
    const { user_id } = req.params
    const { username } = req.body

    let nameQuery = "SELECT * FROM users WHERE UPPER(username) = UPPER($1)"
    let nameQueryResponse

    try {
        nameQueryResponse = await pool.query(nameQuery, [username])
    } catch (error) {
        logger.error(`Error checking if username is available: ${error}`)
        return next(new HttpError(`Error checking if username is available: ${error}`, 500)
        )
    }

    if (nameQueryResponse.rows.length > 0) {
        res.status(409).json({ user_id: nameQueryResponse.rows[0].user_id })
    } else {
        let query = "UPDATE users SET username = $1, updated_at = NOW() WHERE user_id = $2 RETURNING *"
        let response

        try {
            response = await pool.query(query, [username, user_id])
        } catch (error) {
            logger.error(`Error changing User ${user_id}'s name to ${username}. ${error}`)

            return next(new HttpError(`Error changing User ${user_id}'s name to ${username}.`, 500))
        }

        res.status(201).json(response.rows[0])
    }
}

const changePhotoUrl = async (req, res, next) => {
    const { user_id } = req.params
    const { photo_url } = req.body

    let query = "UPDATE users SET photo_url = $1 WHERE user_id = $2 RETURNING *"
    let response

    try {
        response = await pool.query(query, [photo_url, user_id])
    } catch (error) {
        logger.error(`Error changing User ${user_id}'s photo_url to ${photo_url}. ${error}`)

        return next(new HttpError(`Error changing User ${user_id}'s photo_url to ${photo_url}.`, 500))
    }
    res.status(201).json(response.rows[0])
}

const getTab = async (req, res, next) => {
    const { user_id } = req.params
    let text = `SELECT t.user_id, t.username, t.quantity, t.drink_cost_total, t.tips_total, t.tab_total, t.order_history, u.amount_paid + u.adjusted_donations as total_donated
                FROM tab_totals t
                LEFT JOIN user_totals u ON u.user_id = t.user_id
                WHERE t.user_id = $1`
    let response

    try {
        response = await pool.query(text, [user_id])
    } catch (error) {
        logger.error(`Error getting user #${user_id}'s tab. ${error}`, 500)
        return next(new HttpError(`Error getting user #${user_id}'s tab. ${error}`, 500))
    }

    let history = {}
    if(response.rows[0].order_history){
        let array = response.rows[0].order_history.split(", ")

        array.forEach(i => {
            let splitArray = i.split('—')
    
            console.log(splitArray)
    
            if (history[splitArray[0]]) {
                history[splitArray[0]] += parseInt(splitArray[1])
            } else {
                history[splitArray[0]] = parseInt(splitArray[1])
            }
        })
    }



    res.status(200).json({ tab: response.rows[0] ? response.rows[0] : {}, order_history: history })
}

const closeTab = async (req, res, next) => {
    // grab username from params and run query to close all upaid
    const { user_id } = req.params
    let text = "UPDATE orders SET is_paid = TRUE, updated_at = NOW() WHERE user_id = $1 RETURNING *"
    let response

    try {
        response = await pool.query(text, [user_id])
    } catch (error) {
        logger.error(`Error setting User #${user_id}'s orders to paid. ${error}`, 500)
        return next(new HttpError(`Error setting User #${user_id}'s orders to paid. ${error}`, 500))
    }

    res.status(201).json({ message: `Set User #${user_id}'s ${response.rowCount} orders to paid`, response: response.rows })
}

exports.createUser = createUser
exports.getUserIDByUsername = getUserIDByUsername
exports.getUserById = getUserById
exports.adjustDonations = adjustDonations
exports.getAllUsers = getAllUsers
exports.changeUsername = changeUsername
exports.changePhotoUrl = changePhotoUrl
exports.getTab = getTab
exports.closeTab = closeTab