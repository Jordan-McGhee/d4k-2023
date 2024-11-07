const HttpError = require("../models/http-error")
const pool = require("../db")
const logger = require('firebase-functions/logger')

const getBartenders = async (req, res, next) => {
    let bartenderQuery = "SELECT id, name, initials FROM bartenders"
    let response
    try {
        response = await pool.query(bartenderQuery)
    } catch (error) {
        logger.error(`${error}`)
        return next(new HttpError(`Error: ${error}`, 500))
    }

    res.status(201).json(response.rows)
}

exports.getBartenders = getBartenders
