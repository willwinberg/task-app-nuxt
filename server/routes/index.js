const router = require('express').Router()
const validateToken = require('../middleware/validate-token')

router.use('/auth', require('./auth').router)
router.use('/users', validateToken, require('./user').router)
router.use('/tasks', validateToken, require('./task').router)

module.exports.router = router
