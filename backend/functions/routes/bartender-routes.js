const express = require("express")
const adminControllers = require("../controllers/bartender-controllers")

const router = express.Router()

router.get("/getBartenders/", adminControllers.getBartenders)

module.exports = router