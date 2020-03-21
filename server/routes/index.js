const router = require('express').Router()
// const validateToken = require('../middleware/validate-token')

router.use('/auth', require('./auth').router)
router.use('/users', require('./user').router)
router.use('/tasks', require('./task').router)

module.exports.router = router
