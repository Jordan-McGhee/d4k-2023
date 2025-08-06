const express = require("express")
const { check } = require('express-validator')
const drinkControllers = require("../controllers/drink-controllers")

const router = express.Router()

router.get("/", drinkControllers.getDrinks)

router.get("/getAdmin", drinkControllers.getDrinksAdmin)

router.patch("/:drink_id/updateOutOfStock", drinkControllers.updateOutOfStock)

router.patch("/:drink_id/updateHidden", drinkControllers.updateDrinkIsHidden)

module.exports = router