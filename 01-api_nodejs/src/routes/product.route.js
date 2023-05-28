
const express = require('express')
const router = express.Router()

const mysql = require('../mysql').pool

router.get('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM products;',
            (error, result, fields) => {
                conn.release()
                if(error) {return res.status(500).send({error: error})}
                const response = {
                    quantity_products: result.length,
                    products: result.map(prod => {
                        return {
                            id_product: prod.id_product,
                            name_product: prod.name,
                            price: prod.price,
                            image: prod.image,
                            request: {
                                type: 'GET method.',
                                description: 'Return all products!!!',
                                url: 'http://localhodt:4000/products/' + prod.id_product,
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
            'INSERT INTO products (name, price, image) VALUES (?,?,?);',
            [req.body.name, req.body.price, req.body.image],
            (error, result, field) => {
                conn.release()
                if(error) {return res.status(500).send({error: error})}
                const response = {
                    message: 'Product inserted successfully!!',
                    productCreated: {
                        id_product: result.insertId,
                        name_product: req.body.name,
                        price: req.body.price,
                        image: req.body.image,
                        request: {
                            type: 'POST method.',
                            description: 'Inserting product!!!',
                            url: 'http://localhodt:4000/products/' + result.insertId,
                        }
                    }
                }
                return res.status(201).send({response})
            }
        )
    })
})

router.get('/:id_product', (req, res) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM products WHERE id_product = ?;',
            [req.params.id_product],
            (error, result, field)  => {
                conn.release()
                if(error) {return res.status(500).send({error: error})}
                const response = {
                    message: `Details from product id: ${req.params.id_product}`,
                    id_product: req.body.id_product,
                    name_product: req.body.name,
                    price: req.body.price,
                    image: req.body.image,
                    request: {
                        type: 'GET method.',
                        description: 'Returns product with specific id!!!',
                        url: 'http://localhost:4000/products/' + req.params.id_product
                    }
                }
                return res.status(200).send({response})
            }
        )
    })
})

router.patch('/:id_product', (req, res) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `
                UPDATE  products
                SET     name    =   ?,
                        price   =   ?,
                        image   = ?
                WHERE   id_product  =   ?;
            `,
            [req.body.name, req.body.price, req.body.image, req.params.id_product],
            (error, result, field) => {
                conn.release()
                if(error) {res.status(500).send({error: error})}
                const response = {
                    message: 'Product update successfully!!!',
                    productUpdated: {
                        id_product: req.params.id_product,
                        name: req.body.name,
                        price: req.body.price,
                        image: req.body,
                        request: {
                            type: 'PATCH method.',
                            description: 'Update product with selected id!!!',
                            url: 'http://localhost:4000/products/' + req.params.id_product,
                        }
                    }
                }
                return res.status(202).send({response})
            }
        )
    })
})

router.delete('/:id_product', (req, res) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(404).send({error})}
        conn.query(
            'DELETE FROM products WHERE id_product = ?;',
            [req.body.id_product],
            (error, result, field) => {
                conn.release()
                if(error) {return res.status(500).send({error: error})}
                const response = {
                    message: `Product deleted successfully!!!`,
                    productDeleted: {
                        id_product: req.params.id_product,
                        id_user: req.body.id_user,
                    },
                    request: {
                        type: "DELETE method.",
                        description: "Deleted product selection!!!",
                        url: "Deleted: " + "http://localhost:4000/api/products/" + req.params.id_product,
                    },
                } 
                return res.status(202).send({response})
            }
        )
    })
})


module.exports = router