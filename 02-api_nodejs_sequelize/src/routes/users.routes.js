const express = require('express')

const router = express.Router()

// 
const UserController = require('../controllers/users-controllers')
// 
router.route("/").get(UserController.all).post(UserController.create)
router.route("/:id").get(UserController.one).patch(UserController.update).delete(UserController.delete)

module.exports = router 