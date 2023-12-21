const HttpError = require("../models/http-error")
const pool = require("../db")
const logger = require('firebase-functions/logger')

const getDrinkData = async (req, res, next) => {
    let nameQuery = "SELECT * FROM order_totals"
    let response
    try {
        response = await pool.query(nameQuery)
    } catch (error) {
        logger.error(`${error}`)
        return next(new HttpError(`Error: ${error}`, 500))
    }

    res.status(201).json(response.rows)
}

const getIngredientData = async (req, res, next) => {
    let nameQuery = "SELECT * FROM ingredient_totals"
    let response
    try {
        response = await pool.query(nameQuery)
    } catch (error) {
        logger.error(`${error}`)
        return next(new HttpError(`Error: ${error}`, 500))
    }

    res.status(201).json(response.rows)
}

exports.getDrinkData = getDrinkData
exports.getIngredientData = getIngredientData
