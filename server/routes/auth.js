const router = require('express').Router()
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/User')

router
    .use('/auth', router)

    .post('/login', (req, res, next) => {
        const { email, password } = req.body
        const user = User.where({ email, password })

        user.findOne(function(err, user) {
            if (err) return next(err)
            if (user) {
                if (
                    !bcrypt.compare(password, user.password) ||
                    user.email !== email
                ) {
                    // throw new Error('Invalid username or password')
                    res.status(406).json({ message: 'Bad credentials' })
                } else {
                    const token = jsonwebtoken.sign(
                        {
                            email: user.email,
                            name: user.name
                        },
                        'prettydumbsecret',
                        { expiresIn: '1440m' }
                    )
                    res.status(200).json({
                        token
                    })
                }
            }
        })
    })

    .get('/user', (req, res, next) => {
        res.json({ user: req.user })
    })

    .post('/logout', (req, res, next) => {
        res.json({ status: 'OK' })
    })

    .use((err, req, res, next) => {
        res.status(401).send(err + '')
    })

module.exports.router = router
