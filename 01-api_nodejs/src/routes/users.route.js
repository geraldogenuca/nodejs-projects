
const express = require('express')
const router = express.Router()

const mysql = require('../mysql').pool

router.get('/', (req, res) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM users;',
            (error, result, fields) => {
                conn.release()
                if(error) {return res.status(500).send({error: error})}
                const response = {
                    quantity_users: result.length,
                    users: result.map(usr => {
                        return {
                            id_user: usr.id_user,
                            name: usr.name,
                            email: usr.email,
                            password: usr.password,
                            request: {
                                type: 'GET method.',
                                description: 'Return all users!!!',
                                url: 'http://localhodt:4000/users/' + usr.id_user,
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
            'INSERT INTO users (name, email, password) VALUES (?,?,?);',
            [req.body.name, req.body.email, req.body.password],
            (error, result, field) => {
                conn.release()
                if(error) {return res.status(500).send({error: error})}
                const response = {
                    message: 'User inserted successfully!!',
                    userCreated: {
                        id_user: result.insertId,
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        request: {
                            type: 'POST method.',
                            description: 'Inserting user!!!',
                            url: 'http://localhodt:4000/users/' + result.insertId,
                        }
                    }
                }
                return res.status(201).send({response})
            }
        )
    })
})

router.get('/:id_user', (req, res) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM users WHERE id_user = ?;',
            [req.params.id_user],
            (error, result, field)  => {
                conn.release()
                if(error) {return res.status(500).send({error: error})}
                const response = {
                    message: `Details from user id: ${req.params.id_user}`,
                    id_user: req.body.id_user,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    request: {
                        type: 'GET method.',
                        description: 'Returns user with specific id!!!',
                        url: 'http://localhost:4000/products/' + req.params.id_user
                    }
                }
                return res.status(200).send({response})
            }
        )
    })
})

router.patch('/:id_user', (req, res) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `
                UPDATE  users
                SET     name    =   ?,
                        email   =   ?,
                        password=   ?
                WHERE   id_user  =   ?;
            `,
            [req.body.name, req.body.email, req.body.password, req.params.id_user],
            (error, result, field) => {
                conn.release()
                if(error) {res.status(500).send({error: error})}
                const response = {
                    message: 'User update successfully!!!',
                    userUpdated: {
                        id_user: req.params.id_user,
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        request: {
                            type: 'PATCH method.',
                            description: 'Update user with selected id!!!',
                            url: 'http://localhost:4000/users/' + req.params.id_order,
                        }
                    }
                }
                return res.status(202).send({response})
            }
        )
    })
})

router.delete('/:id_users', (req, res) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(404).send({error})}
        conn.query(
            'DELETE FROM users WHERE id_user = ?;',
            [req.body.id_user],
            (error, result, field) => {
                conn.release()
                if(error) {return res.status(500).send({error: error})}
                const response = {
                    message: `Order ${req.body.id_user} deleted successfully!!!`,
                    userDeleted: {
                        id_user: req.body.id_user,
                        // id_user: req.body.id_user,
                    },
                    request: {
                        type: "DELETE method.",
                        description: "Deleted user selection!!!",
                        url: "Deleted: " + "'http://localhost:4000/user/" + req.body.id_user + "'",
                    },
                } 
                return res.status(202).send({response})
            }
        )
    })
})


module.exports = router