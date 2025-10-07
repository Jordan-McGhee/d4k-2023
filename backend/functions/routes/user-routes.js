const express = require("express")
const userControllers = require("../controllers/user-controllers")

const router = express.Router()

router.post("/", userControllers.createUser)

router.post("/withPhone", userControllers.createUserWithPhone)

router.get("/verify/:username", userControllers.getUserIdByUsername)

router.get("/verifyphone/:phoneNumber", userControllers.getUserIdByPhoneNumber)

router.patch("/:user_id/adjustDonations", userControllers.adjustDonations)

router.patch("/:user_id/changePhotoUrl", userControllers.changePhotoUrl)

router.get("/all", userControllers.getAllUsers)

router.get("/:user_id", userControllers.getUserById)

router.patch("/:user_id", userControllers.updateUsername)

router.patch("/updatePhoneNumber/:user_id", userControllers.updatePhoneNumber)

router.get("/:user_id/getTab", userControllers.getTab)

router.post("/:user_id/closeTab", userControllers.closeTab)

module.exports = router