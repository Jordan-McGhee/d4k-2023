const HttpError = require("../models/http-error")
const pool = require("../db")
const logger = require('firebase-functions/logger')

const getDrinkData = async (req, res, next) => {

    const { password } = req.params

    let nameQuery = "SELECT * FROM admin_password WHERE password = $1"
    let response
    logger.debug(password)
    try {
        response = await pool.query(nameQuery, [password])
    } catch (error) {
        logger.error(`Error checking password: ${error}`)
        return next(new HttpError(`Error checking password: ${error}`, 500))
    }

    res.status(201).json(response.rows.length > 0)
}

exports.getDrinkData = getDrinkData
