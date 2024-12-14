const HttpError = require("../models/http-error")
const pool = require("../db")
const logger = require('firebase-functions/logger')

const getDrinks = async (req, res, next) => {

    let query =
        `   SELECT * FROM drinks
        WHERE out_of_stock = FALSE AND is_hidden = FALSE
        ORDER BY
        type = 'cocktail' desc,
        type = 'batched' desc,
        type = 'shot' desc,
        type = 'mocktail' desc,
        menu_order`
    let response
    try {
        response = await pool.query(query)
    } catch (error) {
        logger.error(`Error getting drinks: ${error}`)
        return next(new HttpError(`Error  getting drinks: ${error}`, 500))
    }

    res.status(201).json(response.rows)
}

const getDrinksAdmin = async (req, res, next) => {

    let query =
        `   SELECT * FROM drinks
        ORDER BY
        type = 'cocktail' desc,
        type = 'batched' desc,
        type = 'shot' desc,
        type = 'mocktail' desc,
        menu_order`
    let response
    try {
        response = await pool.query(query)
    } catch (error) {
        logger.error(`Error getting admin drinks: ${error}`)
        return next(new HttpError(`Error getting admin drinks: ${error}`, 500))
    }

    res.status(201).json(response.rows)
}

const updateOutOfStock = async (req, res, next) => {
    const { drink_id } = req.params
    const { isOutOfStock } = req.body

    const stockStatus = isOutOfStock ? false : true
    let text = "UPDATE drinks SET out_of_stock = $1 WHERE drink_id = $2 RETURNING *"

    let response

    try {
        response = await pool.query(text, [stockStatus, drink_id]);
    } catch (error) {
        logger.error(`Error updating drink #${drink_id}'s stock status. ${error}`, 500)
        return next(new HttpError(`Error updating drink #${drink_id}'s stock status. ${error}`, 500))
    }

    res.status(201).json({ message: `Updated drink ${drink_id} out of stock to ${stockStatus}`, newValue: stockStatus, response: response.rows[0] })
}

const updateDrinkIsHidden = async (req, res, next) => {
    const { drink_id } = req.params
    const { isHidden } = req.body

    let query = "UPDATE drinks SET is_hidden = $1 WHERE drink_id = $2 RETURNING *"

    let response

    try {
        response = await pool.query(query, [!isHidden, drink_id])
    } catch (error) {
        logger.error(`Error updating drink #${drink_id}'s hidden status. ${error}`, 500)
        return next(new HttpError(`Error updating drink #${drink_id}'s hidden status. ${error}`, 500))
    }

    res.status(201).json({ message: `Updated drink ${drink_id}'s hidden status to ${!isHidden}`, newValue: !isHidden, response: response.rows[0] })
}

exports.getDrinks = getDrinks
exports.getDrinksAdmin = getDrinksAdmin
exports.updateOutOfStock = updateOutOfStock
exports.updateDrinkIsHidden = updateDrinkIsHidden