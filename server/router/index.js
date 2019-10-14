const router = require('express').Router()

require('./authRoutes')('/auth', router)
require('./userRoutes')('/users', router)
require('./taskRoutes')('/tasks', router)

module.exports.router = router
