const HttpError = require("../models/http-error")
const pool = require("../db")

const createDonation = async (req, res, next) => {
    
    const { username, amount } = req.body

    let text = "INSERT INTO donations(username, amount, created_at, updated_at) VALUES ($1, $2, NOW(), NOW() RETURNING *)"

    let newDonation

    try {
        newDonation = await pool.query(text, [ username, amount ])
    } catch (error) {
        console.log(`Error creating donation: ${error}`)

        return next(
            new HttpError(
                "Error creating donation!", 500
            )
        )
    }

    console.log("Donation saved!")

    res.status(201).json({ message: "Donation saved!", donation: newDonation.rows })
}

const deleteDonation = async (req, res, next) => {
    const { donation_id } = req.params

    let text = "DELETE FROM donations WHERE donation_id = $1"

    let response

    try {
        response = pool.query(text, [ donation_id ])
    } catch (error) {
        console.log(error)

        return next(
            new HttpError(
                `Error deleting donation #${donation_id}`, 500
            )
        )
    }

    res.status(200).json({ message: `Deleted order #${donation_id}`, response: response })
}

exports.createDonation = createDonation
exports.deleteDonation = deleteDonation