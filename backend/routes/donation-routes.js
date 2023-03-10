const express = require("express")
const donationControllers = require("../controllers/donation-controllers")

const router = express.Router()

router.post("/", donationControllers.createDonation)

router.delete("/:donation_id", donationControllers.deleteDonation)

module.exports = router