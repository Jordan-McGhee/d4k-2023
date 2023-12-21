const express = require("express")
const analyticsControllers = require("../controllers/analytics-controllers")

const router = express.Router()

router.get("/getDrinkData", analyticsControllers.getDrinkData)
router.get("/getIngredientData", analyticsControllers.getIngredientData)

module.exports = router