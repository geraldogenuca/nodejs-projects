const express = require('express')

const router = express.Router()

const multer = require('multer')
const upload = multer({dest: 'uploads/'})

// 
// const storage = multer.diskStorage({
//     destination: function (req, res, callback) {
//         callback(null, './uploads/')
//     },
//     filename: function(req, file, callback) {
//         callback(null, file.originalname)
//     }
// })

// const upload = multer({storage: storage})

// 
const ProductController = require('../controllers/products-controllers')

// 
router.route("/", upload.single('product_img')).get(ProductController.all).post(ProductController.create)
router.route("/:id").get(ProductController.one).patch(ProductController.update).delete(ProductController.delete)

module.exports = router 