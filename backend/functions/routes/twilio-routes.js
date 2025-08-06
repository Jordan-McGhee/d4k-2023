const express = require("express")
const twilioControllers = require("../controllers/twilio-controllers")

const router = express.Router()

router.post("/:phone_number", twilioControllers.sendMessage)

module.exports = router