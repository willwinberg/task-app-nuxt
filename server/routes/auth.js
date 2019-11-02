// const User = require('../models/User')
const router = require('express').Router()
const jsonwebtoken = require('jsonwebtoken')

router
    .use('/auth', router)

    .post('/login', (req, res, next) => {
        const { email, password } = req.body

        if (password !== 'tester' && email !== 'will@bill.org') {
            throw new Error('Invalid username or password')
        }
        // res.status(401).json({ message: 'Bad credentials' })
        const accessToken = jsonwebtoken.sign(
            {
                email,
                name: 'Will',
                scope: ['test', 'user']
            },
            'adumbsecret'
        )

        res.json({
            token: {
                accessToken
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
        console.error(err)
        res.status(401).send(err + '')
    })

module.exports.router = router
