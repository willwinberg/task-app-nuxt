const router = require('express').Router()

require('./authRoutes')('/auth', router)
require('./userRoutes')('/users', router)

module.exports.router = router
