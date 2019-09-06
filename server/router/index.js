const router = require('express').Router()

require('./authRouter')(router)
require('./userRouter')(router)

module.exports.router = router
