const express = require('express')

const router = express.Router()

// 
const ProductController = require('../controllers/products-controllers')

// 
router.route("/").get(ProductController.all).post(ProductController.create)
router.route("/:id").get(ProductController.one).patch(ProductController.update).delete(ProductController.delete)

module.exports = router 