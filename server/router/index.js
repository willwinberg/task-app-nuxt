const router = require('express').Router()

router.use('/auth', require('./authRoutes').router)
router.use('/users', require('./userRoutes').router)
router.use('/tasks', require('./taskRoutes').router)

module.exports.router = router
