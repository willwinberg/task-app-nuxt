// const User = require('../models/User')
const router = require('express').Router()
const jsonwebtoken = require('jsonwebtoken')

router
    .use('/auth', router)
    .post('/login', (req, res, next) => {
        res.send(req.body)
        const { email, password } = req.body
        const token = jsonwebtoken.sign(
            {
                email,
                password,
                name: 'User ' + email,
                scope: ['test', 'user']
            },
            'adumbsecret'
        )
        console.log(token)
        res.json({ token })
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
