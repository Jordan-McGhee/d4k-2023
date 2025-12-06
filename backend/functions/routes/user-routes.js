const express = require("express")
const userControllers = require("../controllers/user-controllers")

const router = express.Router()

router.post("/", userControllers.createUser)

router.post("/withPhone", userControllers.createUserWithPhone)

router.get("/verify/:username", userControllers.getUserIdByUsername)

router.get("/verifyphone/:phoneNumber", userControllers.getUserIdByPhoneNumber)

router.patch("/:user_id/adjustDonations", userControllers.adjustDonations)

router.patch("/:user_id/changePhotoUrl", userControllers.changePhotoUrl)

router.patch("/:user_id/updatePaymentAccount", userControllers.updatePaymentAccount)

router.get("/all", userControllers.getAllUsers)

router.get("/pending-updates-count", userControllers.getPendingUpdateCount)

router.post("/recovery/send-sms", userControllers.sendRecoverySms)

router.get("/recovery/verify/:token", userControllers.verifyRecoveryToken)

router.get("/:user_id", userControllers.getUserById)

router.patch("/:user_id", userControllers.updateUsername)

router.patch("/updatePhoneNumber/:user_id", userControllers.updatePhoneNumber)

router.get("/:user_id/getTab", userControllers.getTab)

router.post("/:user_id/closeTab", userControllers.closeTab)

module.exports = router