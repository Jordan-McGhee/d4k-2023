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
        const client = await pool.connect()
        response = await client.query(nameQuery, [username])
        client.release()
    } catch (error) {
        logger.error(`Error checking if username is available: ${error}`)

        return next(
            new HttpError(
                `Error checking if username is available: ${error}`, 500
            )
        )
    }

    if (response.rows.length > 0) {
        res.status(409).json({ message: "This username is taken!", id: response.rows[0].user_id })
    } else {
        // query for inserting into database
        let query = "INSERT INTO users(username, created_at, updated_at) VALUES ($1, NOW(), NOW()) RETURNING *"

        let newUser

        try {
            const client = await pool.connect()
            newUser = await client.query(query, [username])
            client.release()

        } catch (error) {
            logger.error(`Error creating user: ${error}`)

            return next(
                new HttpError(
                    "Error creating user.", 500
                )
            )
        }

        res.status(201).json({ message: "Created user!", user: newUser.rows })
    }
}

// check if username is taken already
const verifyUserID = async (req, res, next) => {

    // pull data from body
    const { username } = req.body

    // check if any capitalized variation of that username exists
    let query = "SELECT * FROM users WHERE UPPER(username) = UPPER($1)"

    let response

    try {

        const client = await pool.connect()
        response = await client.query(query, [username])
        client.release()

    } catch (error) {
        logger.error(`Error searching for users: ${error}`)

        return next(
            new HttpError(
                "Error searching for users.", 500
            )
        )
    }

    // check if rows returned a value or not
    if (response.rows.length > 0) {
        res.status(409).json({ message: "This username is taken!", available: false })
    } else {
        res.status(200).json({ message: "Username is available!", available: true })
    }
}

const getAllUsers = async (req, res, next) => {
    let query = "SELECT * from users"

    let response
    try {
        const client = await pool.connect()
        response = await client.query(query)
        client.release()

    } catch (error) {
        logger.error(`Error retreiving users: ${error}`)

        return next(
            new HttpError(
                "Error retreiving users.", 500
            )
        )
    }

    res.status(200).json({ users: response.rows.length > 0 ? response.rows : "No users" })
}

const changeUsername = async (req, res, next) => {

    // grab id from params and username from body
    const { user_id } = req.params
    const { username } = req.body

    let query = "UPDATE users SET username = $1, updated_at = NOW() WHERE user_id = $2 RETURNING *"

    let response

    try {
        const client = await pool.connect()
        response = await client.query(query, [username, user_id])
        client.release()

    } catch (error) {
        logger.error(`Error changing User ${user_id}'s name to ${username}. ${error}`)

        return next(
            new HttpError(
                `Error changing User ${user_id}'s name to ${username}.`, 500
            )
        )
    }

    res.status(201).json({ message: `Changed User ${user_id}'s name to ${username}`, newUsername: username, response: response.rows[0] })
}

exports.createUser = createUser
exports.verifyUserID = verifyUserID
exports.getAllUsers = getAllUsers
exports.changeUsername = changeUsername