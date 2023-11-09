const HttpError = require("../models/http-error")
const localPool = require("../db")

const createUser = async (req, res, next) => {

    // pull data from body
    const { username } = req.body

    // query database to see if that username is already taken
    let nameQuery = "SELECT * FROM users WHERE UPPER(username) = UPPER($1)"
    let response

    try {
        response = await localPool.query(nameQuery, [username])
    } catch (error) {
        console.log(`Error checking if username is available: ${error}`)

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
            // const client = await localPool.connect()
            // newUser = await client.query(query, [ username ])
            // client.release()

            newUser = await localPool.query(query, [username])

        } catch (error) {
            console.log(`Error creating user: ${error}`)

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

        // const client = await localPool.connect()
        // response = await client.query(query, [ username ])
        // client.release()

        response = await localPool.query(query, [username])

    } catch (error) {
        console.log(`Error searching for users: ${error}`)

        return next(
            new HttpError(
                "Error searching for users.", 500
            )
        )
    }

    // check if rows returned a value or not
    // if so, return the ID
    if (response.rows.length > 0) {
        res.status(409).json({ message: "This username is taken!", id: response.rows[0].user_id })

        // if not, return null id and allow username to be saved
    } else {
        res.status(200).json({ message: "Username is available!", id: null })
    }
}

const getAllUsers = async (req, res, next) => {
    let query = "SELECT * from users"

    let response
    try {
        // const client = await pool.connect()
        // response = await client.query(query)
        // client.release()

        response = await localPool.query(query)

    } catch (error) {
        console.log(`Error retreiving users: ${error}`)

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
        // const client = await localPool.connect()
        // response = await client.query(query, [ username, user_id ])
        // client.release()

        response = await localPool.query(query, [username, user_id])

    } catch (error) {
        console.log(`Error changing User ${user_id}'s name to ${username}. ${error}`)

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