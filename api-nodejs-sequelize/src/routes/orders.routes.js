const express = require('express')

const router = express.Router()

// 
const OrderController = require('../controllers/orders-controllers')

// 
router.route("/").get(OrderController.all).post(OrderController.create)
router.route("/:id").get(OrderController.one).patch(OrderController.update).delete(OrderController.delete)

module.exports = router 