
const express = require('express')
const morgan = require('morgan')

const app = express()

const ProductRoute = require('./routes/product.route')
const OrderRoute = require('./routes/order.route')

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(morgan('dev'))

// Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

// 
app.use('/products', ProductRoute)
app.use('/orders', OrderRoute)

// Error routes not found
app.use((req, res, next) => {
    const errorR = new Error('Not found!')
    errorR.status = 404
    next(errorR)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        errorR: {
            message: error.message
        }
    });
});

module.exports = app;