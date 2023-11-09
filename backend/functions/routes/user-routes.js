const express = require("express")
const userControllers = require("../controllers/user-controllers")

const router = express.Router()

router.post("/", userControllers.createUser)

router.get("/", userControllers.verifyUserID)

router.get("/all", userControllers.getAllUsers)

router.patch("/:user_id", userControllers.changeUsername)

module.exports = router