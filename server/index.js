const express = require('express')
const session = require('express-session')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const connection = process.env.MONGO_DB

// connect to mongodb
mongoose.connect(connection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
// .then(() => console.log(`connection successful: ${connection}`))
// .catch((err) => console.error(connection, err.message))

app.use(cookieParser())
app.use(bodyParser.json())

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 }
    })
)

app.use(
    cors({
        allowedHeaders: ['sessionId', 'Content-Type', 'master-token'],
        exposedHeaders: ['sessionId'],
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false
    })
)

app.use(morgan('tiny'))

const { router } = require('./routes')
app.use(router)

module.exports = {
    path: '/api',
    handler: app
}
