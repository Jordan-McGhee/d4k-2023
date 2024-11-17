const express = require("express")
const { check } = require('express-validator')
const orderControllers = require("../controllers/order-controllers")

const router = express.Router()

router.post("/", orderControllers.createOrder)

router.get("/", orderControllers.getOrders)

router.get("/:order_id", orderControllers.getOrder)

router.patch("/:order_id/updateTip", orderControllers.updateTip)

router.patch("/:order_id/updatePaid", orderControllers.updatePaid)

router.patch("/:order_id/updateCompleted", orderControllers.updateCompleted)

router.patch("/:order_id/updateBartender", orderControllers.updateBartender)

router.get("/admin/:limit", orderControllers.getOrdersAdmin)

router.get("/grouped", orderControllers.getOrdersGrouped)

router.get("/leaderboard", orderControllers.getOrdersLeaderboard)

router.delete("/:order_id", orderControllers.deleteOrder)

router.patch(`/:order_id/unvoid`, orderControllers.unvoidOrder)

module.exports = router