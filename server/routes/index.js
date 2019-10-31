const router = require('express').Router()

router.use('/auth', require('./auth').router)
router.use('/users', require('./user').router)
router.use('/tasks', require('./task').router)

module.exports.router = router
