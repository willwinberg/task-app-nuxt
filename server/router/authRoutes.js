// const User = require('../models/User')
const jsonwebtoken = require('jsonwebtoken')

module.exports = function(path, router) {
    router
        .use(path, router)
        .post('/login', (req, res, next) => {
            const { email, password } = req.body
            const valid = email.length && password === '123'

            if (!valid) {
                console.log('AAAAAAA')
                throw new Error('Invalid credentials')
            }

            const token = jsonwebtoken.sign(
                {
                    email,
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
}
