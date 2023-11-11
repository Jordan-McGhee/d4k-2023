const HttpError = require("../models/http-error")
const pool = require("../db")
const logger = require('firebase-functions/logger')

const createDonation = async (req, res, next) => {
    
    const { user_id, amount, comments } = req.body

    let text = "INSERT INTO donations(user_id, amount, comments, is_paid, created_at, updated_at) VALUES ($1, $2, $3,  false, NOW(), NOW())"

    let newDonation

    try {
        const client = await pool.connect()
        newDonation = await client.query(text, [user_id, amount, comments])
        client.release()
    } catch (error) {
        logger.error(`Error creating donation. ${error}`, 500)

        return next(
            new HttpError(`Error creating donation. ${error}`, 500)
        )
    }

    res.status(201).json({ message: "Donation saved!", donation: newDonation })
}

const getDonationsAdmin = async (req, res, next) => {
    let unpaidQuery = "SELECT * FROM donations WHERE is_paid = FALSE ORDER BY created_at ASC"

    let paidQuery = "SELECT * FROM donations WHERE is_paid = TRUE ORDER BY created_at ASC"

    let unpaidResponse, paidResponse

    try {
        const client = await pool.connect()
        unpaidResponse = await client.query(unpaidQuery)
        client.release()
    } catch (error) {
        logger.error(`Error getting unpaid donations. ${error}`, 500)

        return next(
            new HttpError(`Error getting unpaid donations. ${error}`, 500)
        )
    }

    try {
        const client = await pool.connect()
        paidResponse = await client.query(paidQuery)
        client.release()
    } catch (error) {
        logger.error(`Error getting paid donations. ${error}`, 500)

        return next(
            new HttpError(`Error getting paid donations. ${error}`, 500)
        )
    }

    res.status(200).json({ message: "Retrieved donations!", unpaid: unpaidResponse.rows, paid: paidResponse.rows })
}

const updateDonationPaid = async (req, res, next) => {
    const { isPaid } = req.body
    const { donation_id } = req.params

    const paidStatus = isPaid ? false : true

    let text = "UPDATE donations SET is_paid = $1, updated_at = NOW() WHERE donation_id = $2 RETURNING *"

    let response

    try {
        const client = await pool.connect()
        response = await client.query(text, [paidStatus, donation_id])
        client.release()
    } catch (error) {
        logger.error(`Error updating donation #${donation_id}'s paidStatus to ${paidStatus}. ${error}`, 500)

        return next(
            new HttpError(`Error updating donation #${donation_id}'s paidStatus to ${paidStatus}. ${error}`, 500)
        )
    }

    res.status(201).json({ message: `Updated paidStatus of donation #${donation_id} to ${paidStatus}`, newValue: paidStatus, response: response.rows })
}

const updatedDonationAmount = async (req, res, next) => {
    const { originalAmount, newAmount } = req.body
    const { donation_id } = req.params

    let text = "UPDATE donations SET amount = $1, updated_at = NOW() WHERE donation_id = $2 RETURNING *"

    let response

    try {
        const client = await pool.connect()
        response = await client.query(text, [newAmount, donation_id])
        client.release()
    } catch (error) {
        logger.error(`Error updating donation #${donation_id}'s amount from $${originalAmount} to $${newAmount}`, 500)

        return next(
            new HttpError(`Error updating donation #${donation_id}'s amount from $${originalAmount} to $${newAmount}`, 500)
        )
    }

    res.status(201).json({ message: `Updating donation #${donation_id}'s amount from $${originalAmount} to $${newAmount}`, response: response.rows })
}

const deleteDonation = async (req, res, next) => {
    const { donation_id } = req.params

    let text = "DELETE FROM donations WHERE donation_id = $1"

    let response

    try {
        const client = await pool.connect()
        response = await client.query(text, [donation_id])
        client.release()
    } catch (error) {
        logger.error(`Error deleting donation #${donation_id}`, 500)

        return next(
            new HttpError(`Error deleting donation #${donation_id}`, 500)
        )
    }

    res.status(200).json({ message: `Deleted donation #${donation_id}`, response: response })
}

const closeDonations = async (req, res, next) => {
    const { user_id } = req.params

    let text = "UPDATE donations SET is_paid = TRUE, updated_at = NOW() WHERE user_id = $1 RETURNING *"

    let response

    try {
        const client = await pool.connect()
        response = await client.query(text, [user_id])
        client.release()
    } catch (error) {
        logger.error(`Error setting user #${user_id}'s donations to paid`, 500)

        return next(
            new HttpError(`Error setting user #${user_id}'s donations to paid`, 500)
        )
    }

    res.status(201).json({ message: `Set User #${user_id}'s ${response.rowCount} donations to paid`, response: response.rows })
} 

exports.createDonation = createDonation
exports.getDonationsAdmin = getDonationsAdmin
exports.updateDonationPaid = updateDonationPaid
exports.updatedDonationAmount = updatedDonationAmount
exports.deleteDonation = deleteDonation
exports.closeDonations = closeDonations