const express = require("express")
const adminControllers = require("../controllers/admin-controllers")

const router = express.Router()

router.get("/login/:password", adminControllers.login)

module.exports = router