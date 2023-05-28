require('dotenv').config()

const port_server = process.env.PORT_SERVER || 4000

const express = require('express')
const morgan = require('morgan')
const connection_db = require('./database/index')

const app = express()

// 
const ProductRoute = require('./routes/products.routes')
const UserRoute = require('./routes/users.routes')
const OrderRoute = require('./routes/orders.routes')

// 
connection_db.sync().then(() => console.log('Data Base connected successfully!!!'))

// 
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('dev'))

// 
app.use('/api/products', ProductRoute);
app.use('/api/users', UserRoute)
app.use('/api/orders', OrderRoute)


app.listen(port_server, () => console.log(`App is running in port: ${port_server}!!!`))