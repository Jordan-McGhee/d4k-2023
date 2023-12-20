const express = require("express")
const analyticsControllers = require("../controllers/analytics-controllers")

const router = express.Router()

router.get("/analytics/getDrinkData", analyticsControllers.getDrinkData)

module.exports = router