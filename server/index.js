const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const mongoose = require('mongoose')
const config = require('../nuxt.config.js')

// Import and Set Nuxt.js options
config.dev = process.env.NODE_ENV !== 'production'

// connect to mongodb
mongoose
    .connect('mongodb://localhost:27017/gogrellodb')
    .then(() => console.log('connection successful: gogrellodb'))
    .catch((err) => console.error(err))

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
