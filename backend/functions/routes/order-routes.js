const express = require("express");
const {check} = require("express-validator");
const orderControllers = require("../controllers/order-controllers");

const router = express.Router();

router.post("/",
    [
        check("username").notEmpty(),
    ],
    orderControllers.createOrder,
);

router.get("", orderControllers.getOrders);

router.patch("/:order_id/updatePaid", orderControllers.updatePaid);

router.patch("/:order_id/updateCompleted", orderControllers.updateCompleted);

router.get("/admin", orderControllers.getOrdersAdmin);

router.get("/grouped", orderControllers.getOrdersGrouped);

router.get("/leaderboard", orderControllers.getOrdersLeaderboard);

router.post("/:username/closeTab", orderControllers.closeTab);

router.delete("/:order_id", orderControllers.deleteOrder);

router.get("/:username/pullTab", orderControllers.pullUserTab);

module.exports = router;
