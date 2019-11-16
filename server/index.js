const express = require('express')
// const consola = require('consola')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('express-jwt')
// const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')
const dbConfig = require('./config/index')

// connect to mongodb
mongoose
    .connect(dbConfig.connection, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log(`connection successful: ${dbConfig.connection}`))
    .catch((err) => console.error(err))

app.use(cookieParser())
app.use(bodyParser.json())

// configure CORS settings
// const corsConfig = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
//     res.header('Access-Control-Allow-Credentials', true)
//     res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     )
//     next()
// }

// app.use(corsConfig)

// JWT middleware TODO: can this be moved to authRoutes.js?
// app.use(
//     jwt({
//         secret: 'adumbsecret'
//     }).unless({
//         path: ['/api/auth/login', '/login', '/']
//     })
// )

jwt({ secret: 'shhhhhhared-secret', audience: '/api/auth', issuer: '/' })

const { router } = require('./routes')
app.use(router)

module.exports = {
    path: '/api',
    handler: app
}
