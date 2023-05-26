
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(201).send({
        message: 'Get order method!'
    })
})

router.post('/', (req, res) => {
    res.status(201).send({
        message: 'Post order method!'
    })
})

router.get('/:id_order', (req, res) => {
    const id = req.params.id_product

    res.status(200).send({
        message: `One get order method id: ${id}!`
    })
})

router.patch('/', (req, res) => {
    res.status(200).send({
        message: 'Path order method!'
    })
})

router.delete('/', (req, res) => {
    res.status(200).send({
        message: 'Delete order method!'
    })
})

module.exports = router