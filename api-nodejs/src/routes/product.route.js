
const express = require('express')
const router = express.Router()

const mysql = require('../../mysql').pool

router.get('/', (req, res) => {
    res.status(201).send({
        message: 'Get method!'
    })
})

router.post('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO products (name, price) VALUES (?,?);',
            [req.body.name, req.body.price],
            (error, result, field) => {
                conn.release();
                if(error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }                
                res.status(201).send({
                    message: 'Inserted product successfully!',
                    id_product: result.insertId
                })
            }
        )
    })
})

router.get('/:id_product', (req, res) => {
    const id = req.params.id_product

    res.status(200).send({
        message: `One get method id: ${id}!`
    })
})

router.patch('/', (req, res) => {
    res.status(200).send({
        message: 'Path method!'
    })
})

router.delete('/', (req, res) => {
    res.status(200).send({
        message: 'Delete method!'
    })
})

module.exports = router