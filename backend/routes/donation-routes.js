const express = require("express")
const donationControllers = require("../controllers/donation-controllers")

const router = express.Router()

router.post("/", donationControllers.createDonation)

router.get("/", donationControllers.getDonationsAdmin)

router.patch("/:donation_id/updatePaid", donationControllers.updateDonationPaid)

router.patch("/:donation_id/amount", donationControllers.updatedDonationAmount)

router.delete("/:donation_id", donationControllers.deleteDonation)

router.post("/:user_id/closeDonations", donationControllers.closeDonations)

module.exports = router