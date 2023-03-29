const HttpError = require("../models/http-error")
const pool = require("../db")

const createDonation = async (req, res, next) => {
    
    const { username, amount, comments } = req.body

    let text = "INSERT INTO donations(username, amount, comments, is_paid, created_at, updated_at) VALUES ($1, $2, $3,  false, NOW(), NOW())"

    let newDonation

    try {
        newDonation = await pool.query(text, [ username, amount, comments ])
    } catch (error) {
        console.log(`Error creating donation: ${error}`)

        return next(
            new HttpError(
                "Error creating donation!", 500
            )
        )
    }

    console.log("Donation saved!")

    res.status(201).json({ message: "Donation saved!", donation: newDonation })
}

const getDonationsAdmin = async (req, res, next) => {
    let unpaidQuery = "SELECT * FROM donations WHERE is_paid = FALSE ORDER BY created_at ASC"

    let paidQuery = "SELECT * FROM donations WHERE is_paid = TRUE ORDER BY created_at ASC"

    let unpaidResponse, paidResponse

    // UNPAID TRY/CATCH
    try {
        unpaidResponse = await pool.query(unpaidQuery)
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                "Error getting unpaid donations", 500
            )
        )
    }

    // PAID TRY/CATCH
    try {
        paidResponse = await pool.query(paidQuery)
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                "Error getting paid donations", 500
            )
        )
    }

    res.status(200).json({ message: "Retrieved donations!", unpaid: unpaidResponse.rows, paid: paidResponse.rows})
}

const updateDonationPaid = async (req, res, next) => {
    const { isPaid } = req.body
    const { donation_id } = req.params

    const paidStatus = isPaid ? false : true

    let text = "UPDATE donations SET is_paid = $1, updated_at = NOW() WHERE donation_id = $2 RETURNING *"

    let response 

    try {
        response = await pool.query(text, [ paidStatus, donation_id ])
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                `Error updating donation #${donation_id}'s paidStatus to ${ paidStatus }`, 500
            )
        )
    }

    res.status(201).json({ message: `Updated paidStatus of donation #${donation_id} to ${paidStatus}`, response: response.rows})
}

const updatedDonationAmount = async (req, res, next) => {
    const { originalAmount, newAmount } = req.body
    const { donation_id } = req.params

    let text = "UPDATE donations SET amount = $1, updated_at = NOW() WHERE donation_id = $2 RETURNING *"

    let response

    try {
        response = await pool.query(text, [ newAmount, donation_id ])
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                `Error updating donation #${donation_id}'s amount from $${ originalAmount } to $${ newAmount }`, 500
            )
        )
    }

    res.status(201).json({ message: `Updating donation #${ donation_id }'s amount from $${ originalAmount } to $${ newAmount }`, response: response.rows})
}

const deleteDonation = async (req, res, next) => {
    const { donation_id } = req.params

    let text = "DELETE FROM donations WHERE donation_id = $1"

    let response

    try {
        response = await pool.query(text, [ donation_id ])
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                `Error deleting donation #${donation_id}`, 500
            )
        )
    }

    res.status(200).json({ message: `Deleted donation #${donation_id}`, response: response })
}

const closeDonations = async (req, res, next) => {
    const { username } = req.params

    let text = "UPDATE donations SET is_paid = TRUE, updated_at = NOW() WHERE UPPER(username) = UPPER($1) RETURNING *"
    
    let response
    try {
        response = await pool.query(text, [ username ])
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                `Error setting user ${username}'s donations to paid`, 500
            )
        )
    }

    res.status(201).json({ message: `Set ${ username }'s ${ response.rowCount } donations to paid`, response: response.rows })
} 

exports.createDonation = createDonation
exports.getDonationsAdmin = getDonationsAdmin
exports.updateDonationPaid = updateDonationPaid
exports.updatedDonationAmount = updatedDonationAmount
exports.deleteDonation = deleteDonation
exports.closeDonations = closeDonations