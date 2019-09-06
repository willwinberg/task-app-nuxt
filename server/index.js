const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const jwt = require('express-jwt')
const mongoose = require('mongoose')
const config = require('../nuxt.config.js')
const dbConfig = require('./config/index')

// Import and Set Nuxt.js options
config.dev = process.env.NODE_ENV !== 'production'

// connect to mongodb
mongoose
    .connect(dbConfig.connection, {
        useNewUrlParser: true
    })
    .then(() => console.log(`connection successful: ${dbConfig.connection}`))
    .catch((err) => console.error(err))

app.use(cookieParser())
app.use(bodyParser.json())

// configure CORS settings
const corsConfig = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    next()
}

app.use(corsConfig)

// JWT middleware TODO: can this be moved to authRoutes.js?
// app.use(
//     jwt({
//         secret: 'adumbsecret'
//     }).unless({
//         path: [
//             '/api/auth/login',
//             '/login',
//             '/'
//         ]
//     })
// )

const { router } = require('./router')
app.use('/api', router)

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    const { host, port } = nuxt.options.server

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)

    // Listen the server
    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}

start()
