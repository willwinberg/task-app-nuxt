const express = require('express')
const session = require('express-session')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const jwt = require('express-jwt')
// const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')
const cors = require('cors')
const dbConfig = require('./config/index')

// connect to mongodb
mongoose.connect(dbConfig.connection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
// .then(() => console.log(`connection successful: ${dbConfig.connection}`))
// .catch((err) => console.error(dbConfig.connection, err.message))

app.use(cookieParser())
app.use(bodyParser.json())

app.use(
    session({
        secret: 'aprettydumbsecret',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 }
    })
)

// configure CORS settings
// const corsConfig = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Credentials', true)
//     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     )
//     next()
// }

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

// app.use(corsConfig)

// JWT middleware TODO: can this be moved to authRoutes.js?
// app.use(
//     jwt({
//         secret: 'aprettydumbsecret'
//     }).unless({
//         path: ['*']
//     })
// )

// const token = jwt({
//     secret: 'aprettydumbsecret',
//     audience: '/api/auth',
//     issuer: '/'
// })

const { router } = require('./routes')
app.use(router)

module.exports = {
    path: '/api',
    handler: app
}
