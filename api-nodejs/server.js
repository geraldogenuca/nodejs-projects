require('dotenv').config()

const http = require('http')
const app = require('./src/app')
const port = process.env.PORT_SERVER || 4000
const server = http.createServer(app)

server.listen(port, () => console.log(`Server is running in port: ${port}!!!`))