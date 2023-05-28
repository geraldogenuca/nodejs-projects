
const express = require('express')
const router = express.Router()

const mysql = require('../mysql').pool

router.get('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM orders;',
            (error, result, fields) => {
                conn.release()
                if(error) {return res.status(500).send({error: error})}
                const response = {
                    quantity_orders: result.length,
                    products: result.map(ord => {
                        return {
                            id_order: ord.id_order,
                            id_product: ord.id_product,
                            quantity: ord.quantity,
                            request: {
                                type: 'GET method.',
                                description: 'Return all orders!!!',
                                url: 'http://localhodt:4000/orders/' + ord.id_order,
                            }
                        }
                    })
                }
                return res.status(200).send({response})
            }
        )
    })
})

router.post('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO orders (id_product, quantity) VALUES (?,?);',
            [req.body.id_product, req.body.quantity],
            (error, result, field) => {
                conn.release()
                if(error) {return res.status(500).send({error: error})}
                const response = {
                    message: 'Order inserted successfully!!',
                    orderCreated: {
                        id_order: result.insertId,
                        id_product: req.body.id_product,
                        quantity: req.body.quantity,
                        request: {
                            type: 'POST method.',
                            description: 'Inserting order!!!',
                            url: 'http://localhodt:4000/orders/' + result.insertId,
                        }
                    }
                }
                return res.status(201).send({response})
            }
        )
    })
})

router.get('/:id_order', (req, res) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM orders WHERE id_order = ?;',
            [req.params.id_product],
            (error, result, field)  => {
                conn.release()
                if(error) {return res.status(500).send({error: error})}
                const response = {
                    message: `Details from order id: ${req.body.id_order}`,
                    id_order: req.body.id_order,
                    id_product: req.body.id_product,
                    quantity: req.body.quantity,
                    request: {
                        type: 'GET method.',
                        description: 'Returns order with specific id!!!',
                        url: 'http://localhost:4000/orders/' + req.body.id_order,
                    }
                }
                return res.status(200).send({response})
            }
        )
    })
})

router.patch('/:id_order', (req, res) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `
                UPDATE  orders
                SET     id_product    =   ?,
                        quantity   =   ?
                WHERE   id_order  =   ?;
            `,
            [req.body.id_product, req.body.quantity, req.params.id_order],
            (error, result, field) => {
                conn.release()
                if(error) {res.status(500).send({error: error})}
                const response = {
                    message: 'Order update successfully!!!',
                    orderUpdated: {
                        id_order: req.params.id_order,
                        id_product: req.body.id_product,
                        quantity: req.body.quantity,
                        request: {
                            type: 'PATCH method.',
                            description: 'Update product with selected id!!!',
                            url: 'http://localhost:4000/orders/' + req.params.id_order,
                        }
                    }
                }
                return res.status(202).send({response})
            }
        )
    })
})

router.delete('/:id_orders', (req, res) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(404).send({error})}
        conn.query(
            'DELETE FROM orders WHERE id_order = ?;',
            [req.body.id_order],
            (error, result, field) => {
                conn.release()
                if(error) {return res.status(500).send({error: error})}
                const response = {
                    message: `Order ${req.body.id_order} deleted successfully!!!`,
                    orderDeleted: {
                        id_order: req.body.id_order,
                        id_user: req.body.id_user,
                    },
                    request: {
                        type: "DELETE method.",
                        description: "Deleted product selection!!!",
                        url: "Deleted: " + "'http://localhost:4000/order/" + req.body.id_order + "'",
                    },
                } 
                return res.status(202).send({response})
            }
        )
    })
})


module.exports = router