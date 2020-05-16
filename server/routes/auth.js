const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
// const validateToken = require('../middleware/validate-token')

router
    .use('/auth', router)

    .post('/login', (req, res, next) => {
        const { email, password } = req.body
        const user = User.find({ email })

        if (!user) {
            return res.status(401).json({ message: 'That user does not exist' })
        }

        user.findOne(function(err, user) {
            if (err) {
                res.status(400).json({ message: err })
            }
            if (user) {
                if (
                    !bcrypt.compare(password, user.password) ||
                    user.email !== email
                ) {
                    res.status(406).json({ message: 'Bad credentials' })
                } else {
                    req.session.authUser = user
                    return res.json(user)
                }
            }
        })
        return res
    })

    .get('/user', (req, res, next) => {
        res.json({ user: req.user })
    })

    .post('/logout', (req, res, next) => {
        delete req.session.authUser
        res.json({
            status: 'OK',
            message: 'You have been logged out'
        })
    })

    .use((err, req, res, next) => {
        res.status(401).send(err + '')
    })

module.exports.router = router
