const express = require("express")
const userControllers = require("../controllers/user-controllers")

const router = express.Router()

router.post("/", userControllers.createUser)

router.get("/verify/:username", userControllers.getUserIDByUsername)

router.patch("/:user_id/adjustDonations", userControllers.adjustDonations)

router.get("/all", userControllers.getAllUsers)

router.patch("/:user_id", userControllers.changeUsername)

router.get("/:user_id/getTab", userControllers.getTab)

router.post("/:user_id/closeTab", userControllers.closeTab)

module.exports = router